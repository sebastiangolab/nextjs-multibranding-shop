import { axiosNextWcApi } from "@/shared/lib/axios";
import { ProductData } from "../types";

interface SearchedProductsRequestParams {
  includeIds?: number[];
  phrase?: string;
  page?: number;
  perPage?: number;
}

interface SearchProductsDataActionResult {
  products: ProductData[];
  totalPages: number;
  totalProducts: number;
}

const DEFAULT_PRODUCTS_COUNT_PER_PAGE = 24;

export const getSearchedProductsData = async (
  params: SearchedProductsRequestParams,
): Promise<SearchProductsDataActionResult | null> => {
  try {
    const response = await axiosNextWcApi<ProductData[]>(`/products/search`, {
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
      products = products.sort((a, b) => {
        const indexA = params.includeIds!.indexOf(a.id);
        const indexB = params.includeIds!.indexOf(b.id);
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
