import { ProductData } from "@features/products";
import { axiosWCApi } from "@shared/lib/axios";

export const getSingleProductData = async (
  productSlug: string
): Promise<ProductData | null> => {
  try {
    const { data } = await axiosWCApi<ProductData[]>(`/products`, {
      params: {
        slug: productSlug,
      },
    });

    if (!data || data.length === 0) {
      return null;
    }

    return data[0];
  } catch (error) {
    console.error("❌ Error fetching single product data: ", error);
    return null;
  }
};
