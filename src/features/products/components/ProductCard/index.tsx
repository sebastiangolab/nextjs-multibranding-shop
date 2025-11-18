"use client";

import React, { ReactElement } from "react";
import Image from "next/image";
import { Heart, ShoppingCart } from "lucide-react";
import { Button } from "@shared/shadcn/ui/button";
import { Card, CardContent } from "@shared/shadcn/ui/card";
import { useCartStore } from "@shared/store/cartStore";
import { useAddToCartModalStore } from "@shared/store/addToCartModalStore";
import { ProductData } from "../../types";

interface ProductCardProps {
  data: ProductData;
}

const ProductCard = ({ data }: ProductCardProps): ReactElement => {
  const { images, name, price, id } = data;

  const { addItemToCart } = useCartStore();
  const { openModal } = useAddToCartModalStore();

  const handleAddToCart = () => {
    addItemToCart(id);
    openModal(data);
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow p-0">
      <div className="aspect-1/1 bg-muted relative overflow-hidden">
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

        <Button
          size="icon"
          variant="outline"
          className="absolute top-2 right-2 h-8 w-8 bg-white/80 hover:bg-white"
        >
          <Heart className="h-4 w-4" />
        </Button>
      </div>

      <CardContent className="px-4 pb-6 pt-0">
        <div className="space-y-2">
          <h3 className="font-semibold text-foreground line-clamp-2 mb-2">
            {name}
          </h3>

          <div className="flex items-center justify-between">
            <p className="text-xl font-bold text-foreground">{price} zł</p>

            <Button onClick={handleAddToCart} size="icon">
              <ShoppingCart className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
