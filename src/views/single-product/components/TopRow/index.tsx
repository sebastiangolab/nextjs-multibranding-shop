"use client";

import React from "react";
import { Heart } from "lucide-react";
import BreadcrumbWithData from "@shared/components/BreadcrumbWithData";
import { BreadcrumbItem } from "@shared/hooks/useBreadcrumb";
import { Button } from "@shared/shadcn/ui/button";
import { useFavoritesStore } from "@shared/store/favoritesStore";

interface TopRowProps {
  productId: number;
  productName: string;
  breadcrumbCategoryItems: BreadcrumbItem[];
}

const TopRow = ({
  productId,
  productName,
  breadcrumbCategoryItems,
}: TopRowProps) => {
  const { productsIds, toggleFavoriteProduct } = useFavoritesStore();

  const isProductInFavorites = productsIds.includes(productId);

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-4">
      <BreadcrumbWithData
        currentPageLabel={productName}
        categoryItems={breadcrumbCategoryItems}
      />

      {/* Favorite Action */}
      <Button
        variant="ghost"
        onClick={() => {
          toggleFavoriteProduct(productId);
        }}
        className="gap-2 hidden lg:inline-flex"
      >
        <Heart className="size-4" />

        <span className="hidden sm:inline">
          {isProductInFavorites ? "Usuń z ulubionych" : "Dodaj do ulubionych"}
        </span>
      </Button>
    </div>
  );
};

export default TopRow;
