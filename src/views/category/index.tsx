import React from "react";
import { notFound } from "next/navigation";
import { getProductsCategoryData, getProductsData } from "@features/products";
import CategoryViewClient from "./components/CategoryViewClient";

interface CategoryPageProps {
  params: Promise<{ categorySlug?: string }>;
}

const CategoryView = async ({ params }: CategoryPageProps) => {
  const { categorySlug } = await params;

  if (!categorySlug) {
    notFound();
  }

  const categoryData = await getProductsCategoryData(categorySlug);

  if (!categoryData) {
    notFound();
  }

  const productsData = await getProductsData({
    categoryId: categoryData.id,
  });

  return (
    <CategoryViewClient
      categoryData={categoryData}
      productsData={productsData ?? []}
    />
  );
};

export default CategoryView;
