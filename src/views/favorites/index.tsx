"use client";

import React, { useEffect, useState } from "react";
import {
  getProductsData,
  ProductData,
  ProductsGrid,
  ProductsGridSkeleton,
} from "@features/products";
import BasicContainer from "@shared/components/BasicContainer";
import { Button } from "@shared/shadcn/ui/button";
import { useFavoritesStore } from "@shared/store/favoritesStore";

const FavoritesView = () => {
  const { clearFavorites, productsIds } = useFavoritesStore();
  const [displayedProducts, setDisplayedProducts] = useState<ProductData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [initialLoad, setInitialLoad] = useState(false);

  // Get products once when productsIds is loaded from localStorage
  useEffect(() => {
    // Skip if already loaded or if we're waiting for rehydration
    if (initialLoad) return;

    const fetchProducts = async () => {
      if (productsIds.length === 0) {
        setIsLoading(false);
        setInitialLoad(true);
        return;
      }

      const productsData = await getProductsData({
        ids: productsIds,
      });

      setDisplayedProducts(productsData?.products || []);
      setIsLoading(false);
      setInitialLoad(true);
    };

    // Wait a bit for zustand to rehydrate from localStorage
    const timer = setTimeout(() => {
      fetchProducts();
    }, 0);

    return () => clearTimeout(timer);
  }, [productsIds, initialLoad]);

  // When favorites change (after initial load), update displayed products locally
  useEffect(() => {
    if (!initialLoad || displayedProducts.length === 0) return;

    // Filter products that are still in favorites
    setDisplayedProducts((prev) =>
      prev.filter((product) => productsIds.includes(product.id)),
    );
  }, [productsIds, initialLoad, displayedProducts.length]);

  return (
    <BasicContainer>
      <h1 className="text-3xl font-bold mb-6">Ulubione</h1>

      {isLoading ? <ProductsGridSkeleton count={productsIds.length} /> : null}

      {!isLoading && displayedProducts.length === 0 ? (
        <p className="text-center py-12 text-muted-foreground text-lg">
          Nie masz jeszcze żadnych ulubionych produktów
        </p>
      ) : null}

      {!isLoading && displayedProducts.length > 0 ? (
        <>
          <ProductsGrid products={displayedProducts} isSectionVariant />

          <Button size="lg" className="mt-6" onClick={clearFavorites}>
            Usuń wszystkie z ulubionych
          </Button>
        </>
      ) : null}
    </BasicContainer>
  );
};

export default FavoritesView;
