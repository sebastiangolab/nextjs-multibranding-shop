import { axiosWCApi } from "@shared/lib/axios";
import { ProductData } from "../types";

interface ProductsRequestParams {
  ids?: number[];
  categoryId?: number;
  page?: number;
}

const DEFAULT_PRODUCTS_COUNT_PER_PAGE = 24;

export const getProductsData = async (
  params: ProductsRequestParams
): Promise<ProductData[] | null> => {
  try {
    const requestParams = {
      include: params.ids?.join(","),
      category: params.categoryId,
      page: params.page,
      per_page: params.page ? DEFAULT_PRODUCTS_COUNT_PER_PAGE : undefined,
    };

    const { data } = await axiosWCApi<ProductData[]>(`/products`, {
      params: requestParams,
    });

    return data ?? [];
  } catch (error) {
    console.error("❌ Error fetching products data: ", error);
    return null;
  }
};
