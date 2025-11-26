import {
  ProductsCategoryFullData,
  ProductsCategoryResponseData,
} from "@shared/types";

export const normalizeProductsCategoryData = (
  category: ProductsCategoryResponseData,
  allCategories: ProductsCategoryResponseData[],
): ProductsCategoryFullData => {
  const subcategories = allCategories.filter((subCategory) => {
    return subCategory.parent.toString() === category?.id.toString();
  });

  const normalizedSubcategories: ProductsCategoryFullData[] = subcategories.map(
    (subCategory) => {
      return {
        ...subCategory,
        subcategories: [],
      };
    },
  );

  return {
    ...category,
    subcategories: normalizedSubcategories,
  };
};
