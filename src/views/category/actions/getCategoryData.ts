import { axiosWCApi } from "@shared/lib/axios";
import { ProductsCategoryData } from "../../../features/products/types";
import { normalizeProductsCategoryData } from "../helpers/normalizeProductsCategoryData";
import { ProductsCategoryResponseData } from "../types";

export const getCategoryData = async (
  categorySlug: string
): Promise<ProductsCategoryData | null> => {
  try {
    const { data: allCategories } =
      await axiosWCApi<ProductsCategoryResponseData[]>(`/products/categories`);

    if (!Array.isArray(allCategories) || allCategories.length === 0) {
      return null;
    }

    const category = allCategories.find((cat) => cat.slug === categorySlug);

    if (!category) {
      return null;
    }

    return normalizeProductsCategoryData(category, allCategories);
  } catch (error) {
    console.error("❌ Error fetching category data: ", error);
    return null;
  }
};
