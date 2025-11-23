"use client";

import { useEffect, useRef, useState } from "react";
import { loadStripe, Stripe, StripeElements } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useCartStore } from "@/shared/store/cartStore";
import { useCheckoutStore } from "@/features/checkout";
import { StripePaymentForm } from "../StripePaymentForm";
import { createStripePaymentIntent } from "../../actions/createStripePaymentIntent";
import { addPrices } from "@/features/prices";

interface StripePaymentElementProps {
  onStripeReady: (stripe: Stripe, elements: StripeElements) => void;
  onError: (errorMessage: string) => void;
}

// Initialize Stripe once outside component
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const StripePaymentElement = ({
  onStripeReady,
  onError,
}: StripePaymentElementProps) => {
  const { summaryProductsPrice, deliveryMethodData, deliveryFormData } =
    useCheckoutStore();
  const { items: cartItems } = useCartStore();

  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const hasInitialized = useRef(false);

  // Create payment intent on mount (ONLY ONCE)
  useEffect(() => {
    // Prevent multiple initializations
    if (hasInitialized.current || clientSecret) {
      return;
    }

    const deliveryCost = deliveryMethodData?.price || 0;
    const total = addPrices(summaryProductsPrice, deliveryCost);

    const handleCreateStripePaymentIntent = async () => {
      // Validate required data
      if (
        total === 0 ||
        !deliveryFormData ||
        !deliveryMethodData ||
        cartItems.length === 0
      ) {
        console.error("Missing required data for payment intent");
        return;
      }

      hasInitialized.current = true;

      const data = await createStripePaymentIntent(
        total,
        cartItems,
        deliveryFormData,
        deliveryMethodData
      );

      if (!data || !data.clientSecret) {
        console.error("Failed to create payment intent");
        return;
      }

      setClientSecret(data.clientSecret);
    };

    handleCreateStripePaymentIntent();
  }, []);

  // Render loading state if clientSecret is not ready
  if (!clientSecret || !stripePromise) {
    return (
      <div className="bg-white rounded-lg border p-6">
        <p className="text-center text-gray-500">
          Ładowanie formularza płatności...
        </p>
      </div>
    );
  }

  return (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret,
        appearance: {
          theme: "stripe",
          variables: {
            colorPrimary: "#000",
          },
        },
      }}
    >
      <StripePaymentForm
        onReady={(stripe, elements) => onStripeReady(stripe, elements)}
      />
    </Elements>
  );
};

export default StripePaymentElement;
