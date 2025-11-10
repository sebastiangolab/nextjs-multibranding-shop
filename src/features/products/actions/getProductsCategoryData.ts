import { axiosWCApi } from "@shared/lib/axios";
import { normalizeProductsCategoryData } from "../helpers/normalizeProductsCategoryData";
import {
  ProductsCategoryFullData,
  ProductsCategoryResponseData,
} from "@shared/types";

export const getProductsCategoryData = async (
  categorySlug: string
): Promise<ProductsCategoryFullData | null> => {
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
