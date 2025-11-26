import { useMemo } from "react";
import { addPrices, multiplyPrice } from "@/features/prices";
import { getProductsData, ProductData } from "@/features/products";
import { useCartStore } from "@/shared/store/cartStore";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { CartTableProduct } from "../types";

interface CartProductsHookResults {
  productsWithQuantity: CartTableProduct[];
  productsTotalPrice: number;
  isProductsLoading: boolean;
  isProductsFetching: boolean;
  isProductsSuccess: boolean;
}

export const useCartProducts = (): CartProductsHookResults => {
  const { items: cartItems } = useCartStore();

  const productIds = cartItems.map((item) => item.productId);

  // Fetch products data based on cart item IDs
  const { data, isLoading, isFetching, isSuccess } = useQuery({
    queryKey: ["cart-products", productIds],
    queryFn: async () =>
      await getProductsData({
        includeIds: productIds.length > 0 ? productIds : [0],
      }),
    placeholderData: keepPreviousData,
  });

  const productsData = data?.products || [];

  // Combine products data with their quantities from the cart
  const productsWithQuantity: CartTableProduct[] = useMemo(
    () =>
      productsData.map((product: ProductData) => {
        const cartItem = cartItems.find(
          (item) => item.productId === product.id,
        );

        return {
          ...product,
          quantity: cartItem?.quantity || 1,
        };
      }),
    [productsData, cartItems],
  );

  // Calculate total price of products in the cart
  const productsTotalPrice = useMemo(
    () =>
      productsWithQuantity.reduce(
        (sumPrices, product) =>
          addPrices(sumPrices, multiplyPrice(product.price, product.quantity)),
        0,
      ),
    [productsWithQuantity],
  );

  return {
    productsWithQuantity,
    productsTotalPrice,
    isProductsLoading: isLoading,
    isProductsFetching: isFetching,
    isProductsSuccess: isSuccess,
  };
};
