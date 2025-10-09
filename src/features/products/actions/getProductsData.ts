import { axiosWCApi } from "@shared/lib/axios";
import { ProductData } from "../types";

interface ProductsRequestParams {
  ids?: number[];
  categoryId?: number;
};

export const getProductsData = async (
  params: ProductsRequestParams
): Promise<ProductData[] | null> => {
  try {
    const { data } = await axiosWCApi<ProductData[]>(`/products`, {
      params: {
        include: params.ids?.join(","),
        category: params.categoryId,
      },
    });

    return data ?? [];
  } catch (error) {
    console.error("❌ Error fetching products data: ", error);
    return null;
  }
};
