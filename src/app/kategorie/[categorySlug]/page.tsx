import React, { ReactElement } from "react";
import { notFound } from "next/navigation";
import { getCategoryData } from "@shared/actions/getCategoryData";
import { getProductsData } from "@shared/actions/getProductsData";

type CategoryPageProps = {
  params: Promise<{ categorySlug?: string }>;
};

const CategoryPage = async ({
  params,
}: CategoryPageProps): Promise<ReactElement<CategoryPageProps>> => {
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

  console.log("produkty", productsData);

  return <div>CategoryPage</div>;
};

export default CategoryPage;
