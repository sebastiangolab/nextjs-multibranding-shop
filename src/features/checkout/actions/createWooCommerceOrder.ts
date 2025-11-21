"use server";

import { axiosWCApi } from "@/shared/lib/axios";

interface OrderLineItem {
  product_id: number;
  quantity: number;
}

interface OrderData {
  payment_method: string;
  payment_method_title: string;
  transaction_id: string;
  currency: string;
  set_paid: boolean;
  status?: "processing" | "pending" | "on-hold" | "failed" | "completed";
  billing: {
    first_name: string;
    last_name: string;
    address_1: string;
    address_2?: string;
    city: string;
    state?: string;
    postcode: string;
    country: string;
    email: string;
    phone: string;
  };
  shipping: {
    first_name: string;
    last_name: string;
    address_1: string;
    address_2?: string;
    city: string;
    state?: string;
    postcode: string;
    country: string;
  };
  line_items: OrderLineItem[];
  shipping_lines: Array<{
    method_id: string;
    method_title: string;
    total: string;
  }>;
  meta_data: Array<{
    key: string;
    value: string;
  }>;
  note: string;
}

interface WooCommerceOrderResponse {
  id: number;
  order_key: string;
  status: string;
  total: string;
}

export async function createWooCommerceOrder(
  orderData: OrderData
): Promise<{ success: boolean; orderId?: number; error?: string }> {
  try {
    const { data } = await axiosWCApi.post<WooCommerceOrderResponse>(
      "/orders",
      orderData
    );

    return {
      success: true,
      orderId: data.id,
    };
  } catch (error: any) {
    console.error("Error creating WooCommerce order:", error);

    return {
      success: false,
      error: error.message || "Failed to create order",
    };
  }
}
