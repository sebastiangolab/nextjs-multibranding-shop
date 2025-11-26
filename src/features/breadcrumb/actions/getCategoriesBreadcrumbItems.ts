"use server";
import {
  ProductsCategoryFullData,
  ProductsCategoryResponseData,
} from "@/shared/types";
import { getAllProductsCategories } from "../../../shared/actions/getAllProductsCategories";
import { BreadcrumbItem } from "../types";

export const getCategoriesBreadcrumbItems = async (
  activeCategory: ProductsCategoryFullData,
): Promise<BreadcrumbItem[]> => {
  const allCategories = await getAllProductsCategories();

  const categoryMap = new Map(
    allCategories.map((category) => [category.id, category]),
  );

  // Find the full category chain from root to activeCategory
  const categoryChain: ProductsCategoryResponseData[] = [];

  let current = categoryMap.get(activeCategory.id);

  while (current) {
    categoryChain.unshift(current);

    if (!current.parent) {
      break;
    }

    current = categoryMap.get(current.parent);
  }

  // Now build breadcrumbs with the accumulating path
  const breadcrumbItems: BreadcrumbItem[] = categoryChain.map(
    (category, index) => {
      const slugPath = categoryChain
        .slice(0, index + 1)
        .map((category) => category.slug)
        .join("/");

      return {
        label: category.name,
        href: `/kategorie/${slugPath}`,
      };
    },
  );

  return breadcrumbItems;
};
