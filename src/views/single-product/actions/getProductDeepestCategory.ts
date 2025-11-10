import {
  normalizeProductsCategoryData,
  ProductCategoryData,
} from "@features/products";
import { axiosWCApi } from "@shared/lib/axios";
import {
  ProductsCategoryFullData,
  ProductsCategoryResponseData,
} from "@shared/types";

export const getProductDeepestCategory = async (
  productCategories: ProductCategoryData[]
): Promise<ProductsCategoryFullData | null> => {
  try {
    if (!productCategories?.length) {
      return null;
    }

    // Fetch all categories
    const { data: allCategories } =
      await axiosWCApi<ProductsCategoryResponseData[]>(`/products/categories`);

    // Get full product categories data
    const categoriesDetails: ProductsCategoryResponseData[] = productCategories
      .map((productCategory) => {
        return allCategories.find(
          (category) => category.id === productCategory.id
        );
      })
      .filter((category) => !!category);

    // Function to calculate category depth
    const getDepth = (category: ProductsCategoryResponseData): number => {
      let depth = 0;
      let current = category;

      while (current.parent) {
        const parent = allCategories.find(
          (category) => category.id === parseInt(current.parent)
        );

        if (!parent) {
          break;
        }

        depth++;
        current = parent;
      }

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
      { data: categoriesDetails[0], depth: -1 }
    );

    return normalizeProductsCategoryData(deepestCategory.data, allCategories);
  } catch (error) {
    console.error("❌ Error fetching product deepest category data: ", error);
    return null;
  }
};
