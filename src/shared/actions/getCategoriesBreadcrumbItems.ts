"use server";
import { BreadcrumbItem } from "@shared/hooks/useBreadcrumb";
import { axiosWCApi } from "@shared/lib/axios";
import {
  ProductsCategoryFullData,
  ProductsCategoryResponseData,
} from "@shared/types";

export const getCategoriesBreadcrumbItems = async (
  activeCategory: ProductsCategoryFullData,
): Promise<BreadcrumbItem[]> => {
  const { data: allCategories } =
    await axiosWCApi<ProductsCategoryResponseData[]>(`/products/categories`);

  // Find the full category chain from root to activeCategory
  const categoryChain: ProductsCategoryResponseData[] = [];

  let current = allCategories.find(
    (category) => category.id === activeCategory.id,
  );

  while (current) {
    categoryChain.unshift(current);

    if (!current.parent) {
      break;
    }

    current = allCategories.find((category) => category.id === current!.parent);
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
