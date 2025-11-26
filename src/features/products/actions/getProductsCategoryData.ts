"use server";

import { ProductsCategoryFullData } from "@/shared/types";
import { getAllProductsCategories } from "@shared/actions/getAllProductsCategories";
import { normalizeProductsCategoryData } from "../helpers/normalizeProductsCategoryData";

export const getProductsCategoryData = async (
  categorySlug: string[],
): Promise<ProductsCategoryFullData | null> => {
  try {
    const allCategories = await getAllProductsCategories();

    if (!Array.isArray(allCategories) || allCategories.length === 0) {
      return null;
    }

    const categoriesBySlugAndParent = new Map<
      string,
      (typeof allCategories)[0]
    >();

    allCategories.forEach((cat) => {
      const key = `${cat.slug}-${cat.parent}`;
      categoriesBySlugAndParent.set(key, cat);
    });

    // Validate category hierarchy path
    let currentParentId = 0;

    for (let i = 0; i < categorySlug.length; i++) {
      const slug = categorySlug[i];
      const key = `${slug}-${currentParentId}`;
      const category = categoriesBySlugAndParent.get(key);

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
