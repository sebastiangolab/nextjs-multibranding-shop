import { axiosStripeApi } from "@/shared/lib/axios";

interface PaymentStatusResult {
  success: boolean;
  paymentStatus?: string;
  orderId?: string;
  orderProcessed: boolean;
  error?: string;
}

/**
 * Get payment and order status from Stripe PaymentIntent
 * This is used by confirmation page to check if webhook already created the order
 */
export async function getPaymentStatus(
  paymentIntentId: string,
): Promise<PaymentStatusResult> {
  try {
    const { data } = await axiosStripeApi.get<PaymentStatusResult>(
      `/payment-status?payment_intent_id=${paymentIntentId}`,
    );

    return data;
  } catch (error: any) {
    console.error("Error fetching payment status:", error);

    return {
      success: false,
      orderProcessed: false,
      error: error.message || "Failed to fetch payment status",
    };
  }
}
