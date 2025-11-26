"use server";

import {
  normalizeProductsCategoryData,
  ProductCategoryData,
} from "@features/products";
import { getAllProductsCategories } from "@shared/actions/getAllProductsCategories";
import {
  ProductsCategoryFullData,
  ProductsCategoryResponseData,
} from "@shared/types";

export const getProductDeepestCategory = async (
  productCategories: ProductCategoryData[],
): Promise<ProductsCategoryFullData | null> => {
  try {
    if (!productCategories?.length) {
      return null;
    }

    // Fetch all categories
    const allCategories = await getAllProductsCategories();

    // Create category Map for quick lookup
    const categoryMap = new Map(
      allCategories.map((category) => [category.id, category]),
    );

    // Get full product categories data using Map
    const categoriesDetails: ProductsCategoryResponseData[] = productCategories
      .map((productCategory) => categoryMap.get(productCategory.id))
      .filter(
        (category): category is ProductsCategoryResponseData => !!category,
      );

    // Memoize depth calculations
    const depthCache = new Map<number, number>();

    // Function to calculate category depth with memoization
    const getDepth = (category: ProductsCategoryResponseData): number => {
      if (depthCache.has(category.id)) {
        return depthCache.get(category.id)!;
      }

      let depth = 0;
      let current = category;

      while (current.parent) {
        const parent = categoryMap.get(current.parent);

        if (!parent) {
          break;
        }

        depth++;
        current = parent;
      }

      depthCache.set(category.id, depth);
      return depth;
    };

    // Find category with the greatest depth
    const deepestCategory = categoriesDetails.reduce<{
      data: ProductsCategoryResponseData;
      depth: number;
    }>(
      (deepestCategoryObject, currentCategory) => {
        const depth = getDepth(currentCategory);

        return depth > deepestCategoryObject.depth
          ? { data: currentCategory, depth }
          : deepestCategoryObject;
      },
      { data: categoriesDetails[0], depth: -1 },
    );

    return normalizeProductsCategoryData(deepestCategory.data, allCategories);
  } catch (error) {
    console.error("❌ Error fetching product deepest category data: ", error);
    return null;
  }
};
