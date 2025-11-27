import React from "react";
import type { Metadata } from "next";
import { Footer } from "@/features/footer";
import { Header } from "@/features/header";
import {
  generateCategoryMetadata,
  generateNotFoundPageMetadata,
} from "@/features/seo";
import { getProductsCategoryData } from "@features/products";
import CategoryView from "@views/category";

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
  return (
    <>
      <Header />
      <CategoryView params={params} />
      <Footer />
    </>
  );
};

export default CategoryPage;
