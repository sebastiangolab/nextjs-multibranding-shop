import React from "react";
import { notFound } from "next/navigation";
import { getCategoriesBreadcrumbItems } from "@shared/actions/getCategoriesBreadcrumbItems";
import BasicContainer from "@shared/components/BasicContainer";
import { getProductDeepestCategory } from "./actions/getProductDeepestCategory";
import { getSingleProductData } from "./actions/getSingleProductData";
import ProductDescription from "./components/ProductDescription";
import ProductMain from "./components/ProductMain";
import RelatedProducts from "./components/RelatedProducts";
import TopRow from "./components/TopRow";

interface SingleProductViewProps {
  params: Promise<{ productSlug?: string }>;
}

export const SingleProductView = async (params: SingleProductViewProps) => {
  const { productSlug } = await params.params;

  if (!productSlug) {
    notFound();
  }

  const productData = await getSingleProductData(productSlug);

  if (!productData) {
    notFound();
  }

  const productCategory = await getProductDeepestCategory(
    productData.categories,
  );

  if (!productCategory) {
    notFound();
  }

  const breadcrumbCategoryItems =
    await getCategoriesBreadcrumbItems(productCategory);

  return (
    <BasicContainer>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col gap-10 lg:gap-16">
          <div>
            <TopRow
              productId={productData.id}
              productName={productData.name}
              breadcrumbCategoryItems={breadcrumbCategoryItems}
            />

            <ProductMain productData={productData} />
          </div>

          {productData.description ? (
            <ProductDescription description={productData.description} />
          ) : null}

          <RelatedProducts
            currentProductId={productData.id}
            categoryId={productCategory.id}
          />
        </div>
      </div>
    </BasicContainer>
  );
};
