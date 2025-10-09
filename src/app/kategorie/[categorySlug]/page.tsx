import React from "react";
import { notFound } from "next/navigation";
import { getCategoryData } from "@features/products/actions/getCategoryData";
import { getProductsData } from "@features/products/actions/getProductsData";

interface CategoryPageProps {
  params: Promise<{ categorySlug?: string }>;
}

const CategoryPage = async ({ params }: CategoryPageProps) => {
  const { categorySlug } = await params;

  if (!categorySlug) {
    notFound();
  }

  const categoryData = await getCategoryData(categorySlug);

  console.log("kategoria", categoryData);

  if (!categoryData) {
    notFound();
  }

  const productsData = await getProductsData({
    categoryId: categoryData.id,
  });

  return <div>CategoryPage</div>;
};

export default CategoryPage;
