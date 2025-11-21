"use client";

import { CartTableProduct } from "@/features/checkout";
import Image from "next/image";
import Link from "next/link";

interface OrderProductsListProps {
  products: CartTableProduct[];
}

export const SummaryOrderProductsList = ({
  products,
}: OrderProductsListProps) => {
  return (
    <div className="space-y-3">
      {products.map((product) => (
        <div
          key={product.id}
          className="flex gap-3 pb-3 border-b last:border-b-0 last:pb-0"
        >
          {/* Thumbnail */}
          {product.images && product.images.length > 0 ? (
            <Link
              href={`/p/${product.slug}`}
              className="relative w-16 h-16 flex-shrink-0 bg-muted rounded-md overflow-hidden hover:opacity-80 transition-opacity"
            >
              <Image
                src={product.images[0].src}
                alt={product.images[0].alt || product.name}
                fill
                className="object-contain p-1"
              />
            </Link>
          ) : (
            <div className="w-16 h-16 flex-shrink-0 bg-muted rounded-md" />
          )}

          {/* Product information */}
          <div className="flex-1 min-w-0">
            <Link
              href={`/p/${product.slug}`}
              className="hover:text-primary transition-colors"
            >
              <h4 className="text-sm font-medium text-gray-900 line-clamp-2 mb-1">
                {product.name}
              </h4>
            </Link>

            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">
                {product.quantity} x {product.price} zł
              </span>

              <span className="font-medium text-gray-900">
                {(parseFloat(product.price) * product.quantity).toFixed(2)} zł
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
