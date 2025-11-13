import React from "react";
import { notFound } from "next/navigation";
import { getProductsCategoryData, getProductsData } from "@features/products";
import CategoryViewClient from "./components/CategoryViewClient";
import BasicContainer from "@shared/components/BasicContainer";

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

  const productsResponse = await getProductsData({
    categoryId: categoryData.id,
  });

  if (!productsResponse) {
    notFound();
  }

  return (
    <BasicContainer>
      <CategoryViewClient
        categoryData={categoryData}
        allProductsData={productsResponse.products}
      />
    </BasicContainer>
  );
};

export default CategoryView;
