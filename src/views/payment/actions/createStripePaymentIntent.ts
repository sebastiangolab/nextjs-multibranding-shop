import { axiosStripeApi } from "@shared/lib/axios";
import { MetadataParam } from "@stripe/stripe-js";
import { StripePaymentIntentData } from "../type";

export const createStripePaymentIntent = async (
  total: number,
  metadata: MetadataParam
): Promise<StripePaymentIntentData | null> => {
  try {
    const { data } = await axiosStripeApi.post<StripePaymentIntentData>(
      "/create-payment-intent",
      {
        amount: total,
        metadata,
      }
    );

    return {
      clientSecret: data.clientSecret,
      paymentIntentId: data.paymentIntentId,
    };
  } catch (error) {
    console.error("❌ Error create payment intent: ", error);
    return null;
  }
};
