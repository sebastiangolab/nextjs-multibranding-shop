"use server";

import { getProductsData, ProductData } from "@/features/products";

interface FavoriteProductsResult {
  products: ProductData[];
}

export const getFavoriteProducts = async (
  productIds: number[],
): Promise<FavoriteProductsResult | null> => {
  if (!productIds || productIds.length === 0) {
    return { products: [] };
  }

  const result = await getProductsData({
    includeIds: productIds,
  });

  if (!result) {
    return null;
  }

  return {
    products: result.products,
  };
};
