import { axiosWCApi } from "@shared/lib/axios";
import { ProductData } from "../types";

export const getSearchedProductsData = async (
  phrase: string,
  quantity?: number
): Promise<ProductData[] | null> => {
  try {
    const requestParams = {
      search: phrase,
      per_page: quantity,
    };

    const response = await axiosWCApi<ProductData[]>("/products", {
      params: requestParams,
    });

    return response.data ?? [];
  } catch (error) {
    console.error("❌ Error fetching searched products data: ", error);
    return null;
  }
};
