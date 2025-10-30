import { ProductsCategoryData, ProductsCategoryResponseData } from "../types";

export const normalizeProductsCategoryData = (
  category: ProductsCategoryResponseData,
  allCategories: ProductsCategoryResponseData[]
): ProductsCategoryData => {
  const subcategories = allCategories.filter((subCategory) => {
    return subCategory.parent.toString() === category.id.toString();
  });

  const normalizedSubcategories: ProductsCategoryData[] = subcategories.map(
    (subCategory) => {
      return {
        ...subCategory,
        subcategories: [],
      };
    }
  );

  return {
    ...category,
    subcategories: normalizedSubcategories,
  };
};
