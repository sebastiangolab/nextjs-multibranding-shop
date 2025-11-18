import { axiosWCApi } from "@shared/lib/axios";
import { ProductData } from "../types";

interface SearchedProductsRequestParams {
  phrase: string;
  page?: number;
  perPage?: number;
}

interface SearchProductsDataActionResult {
  products: ProductData[];
  totalPages: number;
  totalProducts: number;
}

const DEFAULT_PRODUCTS_COUNT_PER_PAGE = 1;

export const getSearchedProductsData = async (
  params: SearchedProductsRequestParams
): Promise<SearchProductsDataActionResult | null> => {
  try {
    const response = await axiosWCApi<ProductData[]>("/products", {
      params: {
        search: params.phrase,
        page: params.page,
        per_page: params.page
          ? DEFAULT_PRODUCTS_COUNT_PER_PAGE
          : params.perPage,
      },
    });

    const totalProducts = parseInt(response.headers["x-wp-total"] || "0");
    const totalPages = parseInt(response.headers["x-wp-totalpages"] || "1");

    return {
      products: response.data ?? [],
      totalPages: totalPages,
      totalProducts: totalProducts,
    };
  } catch (error) {
    console.error("❌ Error fetching searched products data: ", error);
    return null;
  }
};
