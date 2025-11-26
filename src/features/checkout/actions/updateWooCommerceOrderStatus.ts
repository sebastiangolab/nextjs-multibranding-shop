"use server";

import { axiosWCApi } from "@/shared/lib/axios";

export async function updateWooCommerceOrderStatus(
  orderId: number,
  status: "pending" | "processing" | "on-hold" | "completed" | "failed",
): Promise<{ success: boolean; error?: string }> {
  try {
    await axiosWCApi.put(`/orders/${orderId}`, {
      status,
    });

    return { success: true };
  } catch (error: any) {
    console.error("Error updating WooCommerce order status:", error);

    return {
      success: false,
      error: error.message || "Failed to update order status",
    };
  }
}
