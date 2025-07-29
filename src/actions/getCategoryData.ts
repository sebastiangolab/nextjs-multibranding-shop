import { axiosWCApi } from "@/lib/axios";
import { CategoryData } from "@/types/products";

export const getCategoryData = async (
  categorySlug: string
): Promise<CategoryData | null> => {
  try {
    const { data } = await axiosWCApi<CategoryData[]>(
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
