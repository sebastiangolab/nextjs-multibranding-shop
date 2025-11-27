"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import {
  CheckoutStep,
  CheckoutSummary,
  useCartProducts,
  useCheckoutStore,
} from "@/features/checkout";
import BasicContainer from "@/shared/components/BasicContainer";
import { useCartStore } from "@/shared/store/cartStore";
import { CartTable } from "./components/CartTable";

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

  const showLoader =
    isProductsLoading || (!isProductsSuccess && isProductsFetching);
  const showContent = isProductsSuccess && !showLoader;

  return (
    <BasicContainer className="py-8">
      <h1 className="text-3xl font-bold mb-8">Koszyk</h1>

      {showLoader ? (
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
      ) : null}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 relative">
          {isProductsFetching && showContent ? (
            <div className="absolute inset-0 bg-background/50 z-10 flex items-center justify-center rounded-lg">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : null}

          {showContent ? <CartTable products={productsWithQuantity} /> : null}
        </div>

        <div>
          {showContent ? (
            <CheckoutSummary
              step={CheckoutStep.CART}
              isLoading={isProductsLoading || isProductsFetching}
              buttonOnClick={handleProceedToDelivery}
              isDisabled={cartItemsQuantity === 0}
            />
          ) : null}
        </div>
      </div>
    </BasicContainer>
  );
};

export default CartView;
