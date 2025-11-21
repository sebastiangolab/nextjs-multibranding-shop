"use client";

import { useState } from "react";
import BasicContainer from "@/shared/components/BasicContainer";
import { useCheckoutStore } from "@/features/checkout";
import { CheckoutStep, CheckoutSummary } from "@/features/checkout";
import { OrderSummary } from "./components/OrderSummary";
import StripePaymentElement from "./components/StripePaymentElement";
import { LegalConsents } from "./components/LegalConsents";
import type { Stripe, StripeElements } from "@stripe/stripe-js";

export const PaymentView = () => {
  const { termsAccepted, deliveryFormData } = useCheckoutStore();

  const [stripeInstance, setStripeInstance] = useState<{
    stripe: Stripe;
    elements: StripeElements;
  } | null>(null);

  const [buttonError, setButtonError] = useState<string>("");
  const [isPaymentProcessing, setIsPaymentProcessing] =
    useState<boolean>(false);

  const handleProceedToPayment = async () => {
    // Validate terms acceptance
    if (!termsAccepted.privacyPolicy || !termsAccepted.storeRegulation) {
      setButtonError("Musisz zaakceptować regulamin i politykę prywatności");
      return;
    }

    // Validate Stripe instance
    if (!stripeInstance?.stripe || !stripeInstance?.elements) {
      setButtonError("Formularz płatności nie jest jeszcze gotowy");
      return;
    }

    // Set processing state, and clear previous error
    setIsPaymentProcessing(true);
    setButtonError("");

    // Confirm payment with Stripe
    try {
      const { error } = await stripeInstance.stripe.confirmPayment({
        elements: stripeInstance.elements,
        confirmParams: {
          return_url: `${window.location.origin}/potwierdzenie`,
          receipt_email: deliveryFormData?.email,
        },
      });

      if (error) {
        console.error("Błąd płatności:", error);
        setButtonError(error.message || "Wystąpił błąd podczas płatności");
      }

      // If successful - Stripe will automatically redirect
    } catch (error) {
      console.error("Payment error:", error);
      setButtonError("Wystąpił nieoczekiwany błąd podczas płatności");
    } finally {
      setIsPaymentProcessing(false);
    }
  };

  return (
    <BasicContainer className="py-8">
      <h1 className="text-3xl font-bold mb-8">Płatność</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <OrderSummary />

          <StripePaymentElement
            onStripeReady={(stripe, elements) =>
              setStripeInstance({ stripe, elements })
            }
            onError={(errorMessage) => setButtonError(errorMessage)}
          />

          <LegalConsents />
        </div>

        <div className="space-y-4 sticky top-24 self-start">
          <CheckoutSummary
            step={CheckoutStep.PAYMENT}
            buttonOnClick={handleProceedToPayment}
            errorMessage={buttonError}
            isLoading={isPaymentProcessing}
          />
        </div>
      </div>
    </BasicContainer>
  );
};
