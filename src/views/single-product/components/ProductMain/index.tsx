"use client";

import React, { ReactElement, useState } from "react";
import ProductGallery from "../ProductGallery";
import { ProductData } from "@features/products";
import { Badge } from "@shared/shadcn/ui/badge";
import { Button } from "@shared/shadcn/ui/button";
import { Heart, Mail, ShoppingCart } from "lucide-react";
import { QuantitySelector } from "../ProductQuantitySelector";
import { useCartStore } from "@shared/store/cartStore";
import { useFavoritesStore } from "@shared/store/favoritesStore";
import { useAddToCartModalStore } from "@shared/store/addToCartModalStore";
import { Price } from "@/features/prices";
import { getBrandConfig } from "@/config/brands/getBrandConfig";

interface ProductMainProps {
  productData: ProductData;
}

const ProductMain = ({ productData }: ProductMainProps): ReactElement => {
  const { contact } = getBrandConfig();

  const [quantity, setQuantity] = useState(1);

  const { addItemToCart } = useCartStore();
  const { openModal } = useAddToCartModalStore();
  const { productsIds, toggleFavoriteProduct } = useFavoritesStore();

  const { id, images, name, brands, sku, shortDescription, price } =
    productData;

  const isProductInFavorites = !!productsIds.find(
    (productInFavoriteId) => productInFavoriteId === id
  );

  const handleAddToCart = () => {
    addItemToCart(id, quantity, () => {
      openModal(productData, quantity);
    });

    setQuantity(1);
  };

  const brandsNames = brands.map((brand) => brand.name);

  const commonAdditionalInfoIconWrapperClasses =
    "flex items-center font-medium mb-2";
  const commonAdditionalInfoIconClasses = "mr-1 size-5 text-primary";

  return (
    <>
      {/* Title - mobile */}
      <h1 className="text-2xl mb-4 lg:hidden">{name}</h1>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[45%_55%] lg:gap-12">
        <ProductGallery productName={name} images={images} />

        <div className="flex flex-col gap-5">
          {/* Title - desktop */}
          <h1 className="text-3xl hidden lg:block">{name}</h1>

          {/* Category + SKU */}
          {brandsNames.length > 0 || sku ? (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              {brandsNames.map((brand) => (
                <Badge key={brand} variant="secondary">
                  {brand}
                </Badge>
              ))}

              {sku ? (
                <>
                  <span>•</span>
                  <span>SKU: {sku}</span>
                </>
              ) : null}
            </div>
          ) : null}

          {/* Short Description */}
          {shortDescription && (
            <p className="text-muted-foreground line-clamp-3">
              {shortDescription}
            </p>
          )}

          {/* Price */}
          <div className="text-3xl font-bold lg:text-4xl">
            <Price price={price} />
          </div>

          {/* Quantity Selector */}
          <QuantitySelector quantity={quantity} setQuantity={setQuantity} />

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button
              size={null}
              className="px-15 py-3.5 text-md"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="mr-2 size-6" />
              Dodaj do koszyka
            </Button>

            <Button
              size={null}
              variant={isProductInFavorites ? "default" : "outline"}
              onClick={() => toggleFavoriteProduct(id)}
              className="px-4"
            >
              <Heart
                className={`size-6 ${isProductInFavorites ? "fill-current" : ""}`}
              />
            </Button>
          </div>

          {/* Additional info */}
          <div className="flex flex-col gap-6 text-sm border-t mt-3 pt-6 max-lg:pb-6 max-lg:border-b">
            {/* <div>
              <div className={commonAdditionalInfoIconWrapperClasses}>
                <Truck className={commonAdditionalInfoIconClasses} /> Darmowa
                dostawa
              </div>

              <p>
                Darmowa dostawa przy zamówieniach{" "}
                <strong>powyżej 200 zł</strong>. Wysyłka kurierem lub do
                paczkomatu.
              </p>
            </div>

            <div>
              <div className={commonAdditionalInfoIconWrapperClasses}>
                <RotateCcw className={commonAdditionalInfoIconClasses} /> Czas
                dostawy
              </div>

              <p>
                Standardowy czas dostawy to <strong>2-3 dni robocze</strong>.
                Produkty dostępne natychmiast wysyłamy tego samego dnia przy
                zamówieniu do godz. 14:00.
              </p>
            </div> */}

            <div>
              <div className={commonAdditionalInfoIconWrapperClasses}>
                <Mail className={commonAdditionalInfoIconClasses} /> Kontakt
              </div>

              <p>
                Masz pytania? Skontaktuj się z nami:{" "}
                <strong>
                  <a href={`mailto:${contact.email}`}>{contact.email}</a>
                </strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductMain;
