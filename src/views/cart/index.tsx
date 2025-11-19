"use client";

import { useMemo } from "react";
import { useCartStore } from "@/shared/store/cartStore";
import BasicContainer from "@/shared/components/BasicContainer";
import { CartTable } from "./components/CartTable";
import { CartSummary } from "./components/CartSummary";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getSearchedProductsData, ProductData } from "@/features/products";
import { CartTableProduct } from "./types";
import { Loader2 } from "lucide-react";

const CartView = () => {
  const { items: cartItems } = useCartStore();

  const productIds = cartItems.map((item) => item.productId);

  const { data, isLoading, isFetching, isSuccess } = useQuery({
    queryKey: ["cart-products", productIds],
    queryFn: async () =>
      await getSearchedProductsData({
        includeIds: productIds.length > 0 ? productIds : [0],
      }),
    placeholderData: keepPreviousData,
  });

  const productsData = data?.products || [];

  const productsWithQuantity: CartTableProduct[] = useMemo(
    () =>
      productsData.map((product: ProductData) => {
        const cartItem = cartItems.find(
          (item) => item.productId === product.id
        );

        return {
          ...product,
          quantity: cartItem?.quantity || 1,
        };
      }),
    [productsData, cartItems]
  );

  const subtotal = useMemo(
    () =>
      productsWithQuantity.reduce(
        (sum, product) => sum + parseFloat(product.price) * product.quantity,
        0
      ),
    [productsWithQuantity]
  );

  const totalItemsCount = useMemo(
    () =>
      productsWithQuantity.reduce((sum, product) => sum + product.quantity, 0),
    [productsWithQuantity]
  );

  return (
    <BasicContainer className="py-8">
      <h1 className="text-3xl font-bold mb-8">Koszyk</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 relative">
          {isFetching && !isLoading && (
            <div className="absolute inset-0 bg-background/50 z-10 flex items-center justify-center rounded-lg">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          )}

          {isSuccess ? <CartTable products={productsWithQuantity} /> : null}
        </div>

        {isSuccess ? (
          <div>
            <CartSummary
              subtotal={subtotal}
              itemsCount={totalItemsCount}
              isLoading={isLoading || isFetching}
            />
          </div>
        ) : null}
      </div>
    </BasicContainer>
  );
};

export default CartView;
