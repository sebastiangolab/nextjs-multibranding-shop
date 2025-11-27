"use server";

import { axiosWCApi } from "@/shared/lib/axios";
import { ProductData } from "../types";

interface ProductsRequestParams {
  includeIds?: number[];
  phrase?: string;
  page?: number;
  perPage?: number;
}

interface ProductsDataActionResult {
  products: ProductData[];
  totalPages: number;
  totalProducts: number;
}

const DEFAULT_PRODUCTS_COUNT_PER_PAGE = 24;

export const getProductsData = async (
  params: ProductsRequestParams,
): Promise<ProductsDataActionResult | null> => {
  try {
    const response = await axiosWCApi<ProductData[]>("/products", {
      params: {
        include: params.includeIds?.join(","),
        search: params.phrase,
        page: params.page,
        per_page: params.page
          ? DEFAULT_PRODUCTS_COUNT_PER_PAGE
          : params.perPage,
      },
    });

    const totalProducts = parseInt(response.headers["x-wp-total"] || "0");
    const totalPages = parseInt(response.headers["x-wp-totalpages"] || "1");

    let products = response.data ?? [];

    // Sort products by includeIds order if provided
    if (params.includeIds && params.includeIds.length > 0) {
      const idIndexMap = new Map(
        params.includeIds.map((id, index) => [id, index]),
      );

      products = products.sort((a, b) => {
        const indexA = idIndexMap.get(a.id) ?? Infinity;
        const indexB = idIndexMap.get(b.id) ?? Infinity;
        return indexA - indexB;
      });
    }

    return {
      products,
      totalPages: totalPages,
      totalProducts: totalProducts,
    };
  } catch (error) {
    console.error("❌ Error fetching searched products data: ", error);
    return null;
  }
};
