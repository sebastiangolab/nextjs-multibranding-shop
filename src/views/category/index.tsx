import React from "react";
import { notFound } from "next/navigation";
import { getCategoriesBreadcrumbItems } from "@/features/breadcrumb";
import {
  getFilteredProductsData,
  getProductsCategoryData,
} from "@features/products";
import BasicContainer from "@shared/components/BasicContainer";
import CategoryViewClient from "./components/CategoryViewClient";

interface CategoryPageProps {
  params: Promise<{ categorySlug?: string[] }>;
}

const CategoryView = async ({ params }: CategoryPageProps) => {
  const { categorySlug } = await params;

  console.log("Category slug:", categorySlug);

  if (!categorySlug || categorySlug.length === 0) {
    notFound();
  }

  const categoryData = await getProductsCategoryData(categorySlug);

  console.log("Category data:", categoryData);

  if (!categoryData) {
    notFound();
  }

  // Execute independent queries in parallel
  const [productsResponse, breadcrumbCategoryItems] = await Promise.all([
    getFilteredProductsData({
      categoryId: categoryData.id,
    }),
    getCategoriesBreadcrumbItems(categoryData),
  ]);

  if (!productsResponse) {
    notFound();
  }

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
