import { axiosWCApi } from "@shared/lib/axios";
import {
  ProductsCategoryFullData,
  ProductsCategoryResponseData,
} from "@shared/types";
import { normalizeProductsCategoryData } from "../helpers/normalizeProductsCategoryData";

export const getProductsCategoryData = async (
  categorySlug: string[],
): Promise<ProductsCategoryFullData | null> => {
  try {
    const { data: allCategories } = await axiosWCApi<
      ProductsCategoryResponseData[]
    >(`/products/categories`, {
      params: {
        per_page: 100,
      },
    });

    if (!Array.isArray(allCategories) || allCategories.length === 0) {
      return null;
    }

    // Validate category hierarchy path
    let currentParentId = 0;

    for (let i = 0; i < categorySlug.length; i++) {
      const slug = categorySlug[i];

      const category = allCategories.find(
        (cat) => cat.slug === slug && cat.parent === currentParentId,
      );

      if (!category) {
        // Category not found or parent mismatch
        return null;
      }

      // If this is the last segment, return the normalized category
      if (i === categorySlug.length - 1) {
        return normalizeProductsCategoryData(category, allCategories);
      }

      // Update parent ID for next iteration
      currentParentId = category.id;
    }

    return null;
  } catch (error) {
    console.error("❌ Error fetching category data: ", error);
    return null;
  }
};
