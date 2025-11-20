"use client";

import { useMemo, useEffect } from "react";
import { useCartStore } from "@/shared/store/cartStore";
import BasicContainer from "@/shared/components/BasicContainer";
import { CartTable } from "./components/CartTable";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getSearchedProductsData, ProductData } from "@/features/products";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  CartTableProduct,
  CheckoutStep,
  CheckoutSummary,
  useCheckoutStore,
} from "@/features/checkout";

const CartView = () => {
  const router = useRouter();
  const { items: cartItems } = useCartStore();
  const { updateSummaryProductsPrice } = useCheckoutStore();

  const productIds = cartItems.map((item) => item.productId);

  // Fetch products data based on cart item IDs
  const { data, isLoading, isFetching, isSuccess } = useQuery({
    queryKey: ["cart-products", productIds],
    queryFn: async () =>
      await getSearchedProductsData({
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
          (item) => item.productId === product.id
        );

        return {
          ...product,
          quantity: cartItem?.quantity || 1,
        };
      }),
    [productsData, cartItems]
  );

  // Calculate total price of products in the cart
  const productsTotalPrice = useMemo(
    () =>
      productsWithQuantity.reduce(
        (sum, product) => sum + parseFloat(product.price) * product.quantity,
        0
      ),
    [productsWithQuantity]
  );

  // Calculate total number of items in the cart
  const totalItemsCount = useMemo(
    () =>
      productsWithQuantity.reduce((sum, product) => sum + product.quantity, 0),
    [productsWithQuantity]
  );

  const handleProceedToDelivery = () => {
    router.push("/dostawa");
  };

  // Synchronize cart total products price in checkout store
  useEffect(() => {
    updateSummaryProductsPrice(productsTotalPrice);
  }, [productsTotalPrice, updateSummaryProductsPrice]);

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
            <CheckoutSummary
              step={CheckoutStep.CART}
              isLoading={isLoading || isFetching}
              buttonOnClick={handleProceedToDelivery}
              isDisabled={totalItemsCount === 0}
            />
          </div>
        ) : null}
      </div>
    </BasicContainer>
  );
};

export default CartView;
