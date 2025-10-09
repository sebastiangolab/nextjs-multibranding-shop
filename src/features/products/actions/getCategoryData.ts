import { axiosWCApi } from "@shared/lib/axios";
import { ProductsCategoryData } from "../types";

export const getCategoryData = async (
  categorySlug: string
): Promise<ProductsCategoryData | null> => {
  try {
    const { data } = await axiosWCApi<ProductsCategoryData[]>(
      `/products/categories?slug=${categorySlug}`
    );

    if (!Array.isArray(data) || !data[0]) {
      return null;
    }

    return data[0];
  } catch (error) {
    console.error("❌ Error fetching category data: ", error);
    return null;
  }
};
