import { getRandomProducts } from "../../actions/getRandomProducts";
import { ProductsCarousel } from "@features/products";
import React from "react";

interface RelatedProductsProps {
  currentProductId: number;
  categoryId: number;
}

const RelatedProducts = async ({
  currentProductId,
  categoryId,
}: RelatedProductsProps) => {
  const relatedProductsData = await getRandomProducts(
    currentProductId,
    categoryId
  );

  if (!relatedProductsData || relatedProductsData.length === 0) {
    return null;
  }

  return (
    <div>
      <h2 className="text-2xl mb-5">Podobne produkty z tej kategorii</h2>

      <ProductsCarousel products={relatedProductsData} />
    </div>
  );
};

export default RelatedProducts;
