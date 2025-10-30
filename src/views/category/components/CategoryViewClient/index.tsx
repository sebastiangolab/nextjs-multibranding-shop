"use client";

import { ProductData, ProductsCategoryData } from "@features/products";
import CategoryHeader from "../CategoryHeader";

type CategoryViewClientProps = {
  categoryData: ProductsCategoryData;
  productsData: ProductData[];
};

const CategoryViewClient = ({
  categoryData,
  productsData,
}: CategoryViewClientProps) => {
  return (
    <>
      <CategoryHeader title={categoryData?.name} />

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[30%_70%] gap-8">
          {/* Left Sidebar */}
          <aside className="lg:sticky lg:top-8 lg:self-start">
            {/* <CategorySidebar /> */}
          </aside>

          {/* Right Content */}
          <main>{/* <CategoryContent /> */}</main>
        </div>
      </div>
    </>
  );
};

export default CategoryViewClient;
