"use client";

import { useEffect } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import type { Stripe, StripeElements } from "@stripe/stripe-js";
import { CreditCard } from "lucide-react";

interface StripePaymentFormProps {
  onReady?: (stripe: Stripe, elements: StripeElements) => void;
}

export const StripePaymentForm = ({ onReady }: StripePaymentFormProps) => {
  const stripe = useStripe();
  const elements = useElements();

  // Notify parents when Stripe is ready
  useEffect(() => {
    if (stripe && elements && onReady) {
      onReady(stripe, elements);
    }
  }, [stripe, elements, onReady]);

  return (
    <div className="bg-white rounded-lg border p-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <CreditCard className="w-5 h-5" />
        Płatność
      </h3>

      <PaymentElement
        options={{
          layout: "tabs",
        }}
      />
    </div>
  );
};
