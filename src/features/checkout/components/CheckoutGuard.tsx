"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useCartStore } from "@/shared/store/cartStore";
import { useCheckoutStore } from "../store/useCheckoutStore";

interface CheckoutGuardProps {
  children: ReactNode;
  requireCart?: boolean;
  requireDeliveryData?: boolean;
  requirePaymentData?: boolean;
}

export const CheckoutGuard = ({
  children,
  requireCart = false,
  requireDeliveryData = false,
  requirePaymentData = false,
}: CheckoutGuardProps) => {
  const router = useRouter();
  const [isHydrated, setIsHydrated] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const { items } = useCartStore();
  const { deliveryFormData, deliveryMethodData, termsAccepted } =
    useCheckoutStore();

  // Wait for Zustand hydration
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;

    // Validate requirements
    const hasCart = !requireCart || items.length > 0;

    const hasDelivery =
      !requireDeliveryData || (!!deliveryFormData && !!deliveryMethodData);

    const hasPayment =
      !requirePaymentData ||
      (!!deliveryFormData &&
        !!deliveryMethodData &&
        termsAccepted.storeRegulation &&
        termsAccepted.privacyPolicy);

    const isValid = hasCart && hasDelivery && hasPayment;

    if (!isValid) {
      router.replace("/koszyk");
      return;
    }

    setIsReady(true);
  }, [
    isHydrated,
    items.length,
    deliveryFormData,
    deliveryMethodData,
    termsAccepted.storeRegulation,
    termsAccepted.privacyPolicy,
    requireCart,
    requireDeliveryData,
    requirePaymentData,
    router,
  ]);

  // Always show loader until hydrated and validated
  if (!isReady) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return <>{children}</>;
};
