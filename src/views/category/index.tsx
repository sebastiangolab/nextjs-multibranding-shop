import React from "react";
import { notFound } from "next/navigation";
import { getCategoriesBreadcrumbItems } from "@/shared/actions/getCategoriesBreadcrumbItems";
import { getProductsCategoryData, getProductsData } from "@features/products";
import BasicContainer from "@shared/components/BasicContainer";
import CategoryViewClient from "./components/CategoryViewClient";

interface CategoryPageProps {
  params: Promise<{ categorySlug?: string[] }>;
}

const CategoryView = async ({ params }: CategoryPageProps) => {
  const { categorySlug } = await params;

  if (!categorySlug || categorySlug.length === 0) {
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

  const breadcrumbCategoryItems =
    await getCategoriesBreadcrumbItems(categoryData);

  return (
    <BasicContainer>
      <CategoryViewClient
        categoryData={categoryData}
        allProductsData={productsResponse.products}
        breadcrumbCategoryItems={breadcrumbCategoryItems}
      />
    </BasicContainer>
  );
};

export default CategoryView;
