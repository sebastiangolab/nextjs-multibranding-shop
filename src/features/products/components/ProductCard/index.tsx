"use client";

import React, { ReactElement } from "react";
import Image from "next/image";
import { Button } from "@shared/shadcn/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@shared/shadcn/ui/card";
import { useCartStore } from "@shared/store/cartStore";
import { ProductData } from "../../types";

interface ProductCardProps {
  data: ProductData;
}

const ProductCard = ({ data }: ProductCardProps): ReactElement => {
  const { images, name, price, id } = data;

  const { addItem } = useCartStore();

  return (
    <Card className="flex flex-col pt-0">
      <CardHeader className="p-0">
        <div className="relative w-full h-56 bg-muted rounded-t-md overflow-hidden">
          {images && images[0] ? (
            <Image
              src={images[0].src}
              alt={images[0].alt}
              width={500}
              height={300}
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
        <CardTitle className="text-2xl font-semibold pb-2.5">{name}</CardTitle>

        <div className="text-lg font-semibold pb-2.5">Cena: {price} zł</div>

        <Button size="lg" onClick={() => addItem(id)}>
          Do koszyka
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
