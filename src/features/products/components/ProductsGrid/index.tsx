import React from "react";
import { getProductsData } from "../../actions/getProductsData";
import ProductCard from "../ProductCard";

interface ProductsGridProps {
  productsIds: number[];
}

const ProductsGrid = async ({ productsIds }: ProductsGridProps) => {
  const productsData = await getProductsData({
    ids: productsIds,
  });

  if (productsData === null) {
    return <p>Brak produktów</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {productsData.map((product) => (
        <ProductCard key={`product-${product.id}`} data={product} />
      ))}
    </div>
  );
};

export default ProductsGrid;
