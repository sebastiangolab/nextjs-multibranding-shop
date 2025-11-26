"use server";

import { axiosWcCustomApi } from "@shared/lib/axios";
import { ProductData } from "../types";

interface ProductsRequestParams {
  ids?: number[];
  categoryId?: number;
  page?: number;
  min_price?: number | null;
  max_price?: number | null;
  attributes?: Record<string, string>;
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
    const requestParams = {
      include: params.ids?.join(","),
      category: params.categoryId,
      page: params.page,
      per_page: params.page ? DEFAULT_PRODUCTS_COUNT_PER_PAGE : undefined,
      min_price: params.min_price ?? undefined,
      max_price: params.max_price ?? undefined,
      ...params.attributes,
    };

    const response = await axiosWcCustomApi<ProductData[]>("/products", {
      params: requestParams,
    });

    const totalProducts = parseInt(response.headers["x-wp-total"] || "0");
    const totalPages = parseInt(response.headers["x-wp-totalpages"] || "1");

    return {
      products: response.data ?? [],
      totalPages: totalPages,
      totalProducts: totalProducts,
    };
  } catch (error) {
    console.error("❌ Error fetching products data: ", error);
    return null;
  }
};
