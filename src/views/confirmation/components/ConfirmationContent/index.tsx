"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useCartStore } from "@/shared/store/cartStore";
import { getPaymentStatus } from "@/features/checkout/actions/getPaymentStatus";
import { useCheckoutStore } from "@/features/checkout";
import { PaymentSuccess } from "../PaymentSuccess";
import { PaymentFailure } from "../PaymentFailure";
import { PaymentProcessing } from "../PaymentProcessing";
import { addPrices } from "@/features/prices";

const ConfirmationContent = () => {
  const searchParams = useSearchParams();

  const { clearCart } = useCartStore();
  const {
    deliveryFormData,
    deliveryMethodData,
    summaryProductsPrice,
    resetCheckout,
  } = useCheckoutStore();

  const [orderData, setOrderData] = useState<{
    orderId: string;
    email: string;
    total: number;
  } | null>(null);

  const [isChecking, setIsChecking] = useState(false);
  const [checkAttempts, setCheckAttempts] = useState(0);
  const hasCleared = useRef(false);

  const paymentIntentId = searchParams.get("payment_intent");
  const redirectStatus = searchParams.get("redirect_status");

  // Clear cart and checkout immediately for succeeded and processing (ONCE)
  useEffect(() => {
    if (
      !hasCleared.current &&
      paymentIntentId &&
      (redirectStatus === "succeeded" || redirectStatus === "processing")
    ) {
      hasCleared.current = true;
      clearCart();
      resetCheckout();
    }
  }, [paymentIntentId, redirectStatus]);

  useEffect(() => {
    // For success or processing payments, poll for order status from Stripe
    if (
      paymentIntentId &&
      (redirectStatus === "succeeded" || redirectStatus === "processing") &&
      !orderData &&
      !isChecking &&
      checkAttempts < 10
    ) {
      setIsChecking(true);

      const checkOrderStatus = async () => {
        try {
          const statusResult = await getPaymentStatus(paymentIntentId);
          if (
            statusResult.success &&
            statusResult.orderProcessed &&
            statusResult.orderId
          ) {
            // Webhook successfully processed the order
            const deliveryCost = deliveryMethodData?.price || 0;
            const total = addPrices(summaryProductsPrice, deliveryCost);

            setOrderData({
              orderId: statusResult.orderId,
              email: deliveryFormData?.email || "",
              total,
            });

            return;
          }

          if (checkAttempts < 9) {
            // Order not yet processed, try again in 1 second
            setCheckAttempts((prev) => prev + 1);

            setTimeout(() => {
              setIsChecking(false);
            }, 1000);
          } else {
            // Max attempts reached, show fallback
            console.warn("⚠️ Max attempts (10) reached, showing fallback");

            const deliveryCost = deliveryMethodData?.price || 0;
            const total = addPrices(summaryProductsPrice, deliveryCost);

            setOrderData({
              orderId: paymentIntentId, // Fallback to payment intent ID
              email: deliveryFormData?.email || "",
              total,
            });
          }
        } catch (error) {
          console.error("❌ Error checking order status:", error);

          // Fallback
          const deliveryCost = deliveryMethodData?.price || 0;
          const total = addPrices(summaryProductsPrice, deliveryCost);

          setOrderData({
            orderId: paymentIntentId,
            email: deliveryFormData?.email || "",
            total,
          });
        }
      };

      checkOrderStatus();
      return;
    }

    // For failed payments, show immediately (DO NOT clear cart)
    if (redirectStatus === "failed" && !orderData) {
      const deliveryCost = deliveryMethodData?.price || 0;
      const total = addPrices(summaryProductsPrice, deliveryCost);

      setOrderData({
        orderId: paymentIntentId || "unknown",
        email: deliveryFormData?.email || "",
        total,
      });
    }
  }, [
    redirectStatus,
    paymentIntentId,
    orderData,
    isChecking,
    checkAttempts,
    deliveryFormData,
    deliveryMethodData,
    summaryProductsPrice,
  ]);

  // If no parameters - show message
  if (!paymentIntentId || !redirectStatus) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-card rounded-lg border p-8 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">
            Nie znaleziono informacji o płatności
          </h1>

          <p className="text-muted-foreground mb-6">
            Wygląda na to, że trafiłeś tutaj bezpośrednio. Ta strona jest
            przeznaczona do obsługi przekierowań z systemu płatności.
          </p>

          <Link
            href="/koszyk"
            className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            Przejdź do koszyka
          </Link>
        </div>
      </div>
    );
  }

  // Render component based on status
  switch (redirectStatus) {
    case "succeeded":
      if (!orderData) {
        return (
          <div className="max-w-2xl mx-auto">
            <div className="bg-card rounded-lg border p-8 text-center">
              <p className="text-muted-foreground">
                Przetwarzanie zamówienia...
              </p>
            </div>
          </div>
        );
      }

      return (
        <PaymentSuccess
          orderId={orderData.orderId}
          email={orderData.email}
          total={orderData.total}
        />
      );

    case "failed":
      return <PaymentFailure />;

    case "processing":
      if (!orderData) {
        return (
          <div className="max-w-2xl mx-auto">
            <div className="bg-card rounded-lg border p-8 text-center">
              <p className="text-muted-foreground">Ładowanie...</p>
            </div>
          </div>
        );
      }

      return (
        <PaymentProcessing
          orderId={orderData.orderId}
          email={orderData.email}
        />
      );

    default:
      return (
        <div className="max-w-2xl mx-auto">
          <div className="bg-card rounded-lg border p-8 text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">
              Nieznany status płatności
            </h1>

            <p className="text-muted-foreground mb-6">
              Status: {redirectStatus}
            </p>

            <Link
              href="/koszyk"
              className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
            >
              Wróć do koszyka
            </Link>
          </div>
        </div>
      );
  }
};

export default ConfirmationContent;
