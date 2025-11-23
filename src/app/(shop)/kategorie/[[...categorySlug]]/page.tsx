import React from "react";
import CategoryView from "@views/category";
import { getProductsCategoryData } from "@features/products";
import type { Metadata } from "next";
import {
  generateCategoryMetadata,
  generateNotFoundPageMetadata,
} from "@/features/seo";

interface CategoryPageProps {
  params: Promise<{ categorySlug?: string[] }>;
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { categorySlug } = await params;

  if (!categorySlug || categorySlug.length === 0) {
    return generateNotFoundPageMetadata();
  }

  const categoryData = await getProductsCategoryData(categorySlug);

  if (!categoryData) {
    return generateNotFoundPageMetadata();
  }

  return generateCategoryMetadata(categoryData.name);
}

const CategoryPage = async ({ params }: CategoryPageProps) => {
  return <CategoryView params={params} />;
};

export default CategoryPage;
