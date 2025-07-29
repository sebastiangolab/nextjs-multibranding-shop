import { axiosWCApi } from "@/lib/axios";
import { ProductData } from "@/types/products";

type ProductsRequestParams = {
  categoryId?: number;
};

export const getProductsData = async (
  params: ProductsRequestParams
): Promise<ProductData[] | null> => {
  try {
    const { data } = await axiosWCApi<ProductData[]>(`/products`, {
      params: {
        category: params.categoryId,
      },
    });

    return data ?? [];
  } catch (error) {
    console.error("❌ Error fetching products data: ", error);
    return null;
  }
};
