"use server";

import { DeliveryFormData, DeliveryMethodData } from "@/features/checkout";
import { CartProductItem } from "@/shared/types";
import { axiosStripeApi } from "@shared/lib/axios";
import { StripePaymentIntentData } from "../type";

export const createStripePaymentIntent = async (
  total: number,
  cartItems: CartProductItem[],
  deliveryFormData: DeliveryFormData,
  deliveryMethod: DeliveryMethodData,
): Promise<StripePaymentIntentData | null> => {
  try {
    const { data } = await axiosStripeApi.post<StripePaymentIntentData>(
      "/create-payment-intent",
      {
        amount: total,
        cartItems,
        deliveryFormData,
        deliveryMethod,
      },
    );

    return {
      clientSecret: data.clientSecret,
      paymentIntentId: data.paymentIntentId,
    };
  } catch (error) {
    console.error("❌ Error create payment intent:", error);
    return null;
  }
};
