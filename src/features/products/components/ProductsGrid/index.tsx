import React from "react";
import { ProductData } from "../../types";
import ProductCard from "../ProductCard";

interface ProductsGridProps {
  products?: ProductData[] | null;
  isSectionVariant?: boolean;
}

const ProductsGrid = ({ products, isSectionVariant }: ProductsGridProps) => {
  if (!products || products.length === 0) {
    return <p>Brak produktów</p>;
  }

  let gridClasses = "grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";

  if (isSectionVariant) {
    gridClasses = `grid-cols-2 lg:grid-cols-4 xl:grid-cols-5`;
  }

  return (
    <div className={`grid gap-6 ${gridClasses}`}>
      {products.map((product) => (
        <ProductCard key={`product-${product.id}`} data={product} />
      ))}
    </div>
  );
};

export default ProductsGrid;
