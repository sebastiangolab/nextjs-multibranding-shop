import React, { ReactElement } from "react";
import Image from "next/image";
import { Button } from "@shared/lib/shadcn/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@shared/lib/shadcn/card";
import { ProductData } from "@shared/types/products";

type ProductsListProps = {
  products: ProductData[] | null;
};

const ProductsList = ({
  products,
}: ProductsListProps): ReactElement<ProductsListProps> => {
  if (products === null) {
    return <p>Brak produktów</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <Card key={`product-${product.id}`} className="flex flex-col">
          <CardHeader className="p-0">
            <div className="relative w-full h-44 bg-muted rounded-t-md overflow-hidden">
              {product.images && product.images[0] ? (
                <Image
                  src={product.images[0].src}
                  alt={product.images[0].alt}
                  width={500}
                  height={200}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-sm text-muted-foreground">
                  Brak zdjęcia
                </div>
              )}
            </div>
          </CardHeader>

          <CardContent className="flex-1 flex flex-col justify-between">
            <div className="flex items-start justify-between gap-2">
              <CardTitle className="text-base line-clamp-2">
                {product.name}
              </CardTitle>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div>
                <div className="text-lg font-semibold">{product.price}</div>
              </div>
              <Button size="sm">Do koszyka</Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ProductsList;
