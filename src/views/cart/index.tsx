"use client";

import { useEffect } from "react";
import { useCartStore } from "@/shared/store/cartStore";
import BasicContainer from "@/shared/components/BasicContainer";
import { CartTable } from "./components/CartTable";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  CheckoutStep,
  CheckoutSummary,
  useCartProducts,
  useCheckoutStore,
} from "@/features/checkout";

const CartView = () => {
  const router = useRouter();
  const { quantity: cartItemsQuantity } = useCartStore();
  const { updateSummaryProductsPrice } = useCheckoutStore();
  const {
    productsWithQuantity,
    productsTotalPrice,
    isProductsLoading,
    isProductsFetching,
    isProductsSuccess,
  } = useCartProducts();

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
          {isProductsFetching && !isProductsLoading && (
            <div className="absolute inset-0 bg-background/50 z-10 flex items-center justify-center rounded-lg">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          )}

          {isProductsSuccess ? (
            <CartTable products={productsWithQuantity} />
          ) : null}
        </div>

        {isProductsSuccess ? (
          <div>
            <CheckoutSummary
              step={CheckoutStep.CART}
              isLoading={isProductsLoading || isProductsFetching}
              buttonOnClick={handleProceedToDelivery}
              isDisabled={cartItemsQuantity === 0}
            />
          </div>
        ) : null}
      </div>
    </BasicContainer>
  );
};

export default CartView;
