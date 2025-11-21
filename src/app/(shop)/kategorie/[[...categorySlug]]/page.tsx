import React from "react";
import CategoryView from "@views/category";

interface CategoryPageProps {
  params: Promise<{ categorySlug?: string[] }>;
}

const CategoryPage = async ({ params }: CategoryPageProps) => {
  return <CategoryView params={params} />;
};

export default CategoryPage;
