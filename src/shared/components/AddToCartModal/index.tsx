"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ShoppingCart } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@shared/shadcn/ui/dialog";
import { Button } from "@shared/shadcn/ui/button";
import { Separator } from "@shared/shadcn/ui/separator";
import { useAddToCartModalStore } from "@shared/store/addToCartModalStore";
import { useCartStore } from "@shared/store/cartStore";

const AddToCartModal = () => {
  const router = useRouter();
  const { isOpen, product, quantity, closeModal } = useAddToCartModalStore();
  const { quantity: totalCartQuantity } = useCartStore();

  const handleContinueShopping = () => {
    closeModal();
  };

  const handleGoToCart = () => {
    closeModal();
    router.push("/koszyk");
  };

  if (!product) {
    return <></>;
  }

  const productPrice = parseFloat(product.price);
  const totalPrice = (productPrice * quantity).toFixed(2);

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">
            Produkt został dodany do koszyka
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Product info */}
          <div className="flex gap-4 items-start">
            <div className="w-20 h-20 bg-muted rounded-md overflow-hidden flex-shrink-0">
              {product.images && product.images[0] ? (
                <Image
                  src={product.images[0].src}
                  alt={product.images[0].alt}
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">
                  Brak zdjęcia
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-sm line-clamp-2 mb-1">
                {product.name}
              </h4>

              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  Ilość:{" "}
                  <span className="font-medium text-foreground">
                    {quantity}
                  </span>
                </span>

                <span className="font-bold">{totalPrice} zł</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Cart summary */}
          <div className="flex items-center gap-2 text-sm">
            <ShoppingCart className="h-5 w-5 text-muted-foreground" />

            <span className="text-muted-foreground">
              W koszyku:{" "}
              <span className="font-semibold text-foreground">
                {totalCartQuantity}{" "}
                {totalCartQuantity === 1 ? "produkt" : "produktów"}
              </span>
            </span>
          </div>

          <Separator />

          {/* Buttons */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1"
              onClick={handleContinueShopping}
            >
              Wróć do zakupów
            </Button>

            <Button className="flex-1" onClick={handleGoToCart}>
              Przejdź do koszyka
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddToCartModal;
