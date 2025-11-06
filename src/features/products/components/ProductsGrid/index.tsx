import React from "react";
import ProductCard from "../ProductCard";
import { ProductData } from "@features/products";

interface ProductsGridProps {
  products?: ProductData[] | null;
}

const ProductsGrid = ({ products }: ProductsGridProps) => {
  if (!products || products.length === 0) {
    return <p>Brak produktów</p>;
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={`product-${product.id}`} data={product} />
      ))}
    </div>
  );
};

export default ProductsGrid;
