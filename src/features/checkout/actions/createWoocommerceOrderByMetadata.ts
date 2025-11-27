"use server";

import Stripe from "stripe";
import { axiosWCApi } from "@/shared/lib/axios";
import { updateWooCommerceOrderStatus } from "./updateWooCommerceOrderStatus";

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

interface CreateOrderResult {
  success: boolean;
  orderId?: number;
  error?: string;
}

// Create WooCommerce order from PaymentIntent metadata
export async function createWoocommerceOrderByMetadata(
  stripe: Stripe,
  paymentIntent: Stripe.PaymentIntent,
  orderStatus: "processing" | "pending" | "on-hold" | "failed" | "completed",
  setPaid: boolean,
): Promise<CreateOrderResult> {
  const metadata = paymentIntent.metadata;

  // Check if already processed - update status instead of creating new order
  if (metadata.order_processed === "true" && metadata.woo_order_id) {
    console.log(
      `⚠️ Order already exists: ${metadata.woo_order_id}, updating status to ${orderStatus}`,
    );

    // Update existing order status
    const updateResult = await updateWooCommerceOrderStatus(
      parseInt(metadata.woo_order_id),
      orderStatus,
    );

    if (updateResult.success) {
      console.log(
        `✅ Order ${metadata.woo_order_id} status updated to ${orderStatus}`,
      );
    } else {
      console.error(
        `❌ Failed to update order ${metadata.woo_order_id}:`,
        updateResult.error,
      );
    }

    return { success: true, orderId: parseInt(metadata.woo_order_id) };
  }

  // Decompress cart items from format "id:qty,id:qty" to [{productId, quantity}]
  const cartItems = metadata.cart_items.split(",").map((item) => {
    const [productId, quantity] = item.split(":");

    return {
      productId: parseInt(productId),
      quantity: parseInt(quantity),
    };
  });

  // Build full addresses strings
  const fullAddress = `${metadata.street} ${metadata.house_number}${
    metadata.apartment_number ? `/${metadata.apartment_number}` : ""
  }`;

  const fullBillingAdress = `${metadata.billing_street} ${metadata.billing_house_number}${
    metadata.billing_apartment_number
      ? `/${metadata.billing_apartment_number}`
      : ""
  }`;

  const orderData: OrderData = {
    payment_method: "stripe",
    payment_method_title: "System Stripe",
    transaction_id: paymentIntent.id,
    currency: "PLN",
    set_paid: setPaid,
    status: orderStatus,
    billing: {
      first_name: metadata.first_name,
      last_name: metadata.last_name,
      address_1: metadata.is_different_billing_address
        ? fullBillingAdress
        : fullAddress,
      city: metadata.billing_city || metadata.city,
      postcode: metadata.billing_postal_code || metadata.postal_code,
      country: "PL",
      email: metadata.email,
      phone: metadata.phone,
    },
    shipping: {
      first_name: metadata.first_name,
      last_name: metadata.last_name,
      address_1: fullAddress,
      city: metadata.city,
      postcode: metadata.postal_code,
      country: "PL",
    },
    line_items: cartItems.map((item: any) => ({
      product_id: item.productId,
      quantity: item.quantity,
    })),
    shipping_lines: [
      {
        method_id: metadata.delivery_method_id,
        method_title: metadata.delivery_method_name,
        total: metadata.delivery_method_price,
      },
    ],
    meta_data: [
      {
        key: "_stripe_payment_intent_id",
        value: paymentIntent.id,
      },
      {
        key: "_stripe_payment_status",
        value: paymentIntent.status,
      },
    ],
    note: metadata.notes || "",
  };

  // Create order in WooCommerce
  try {
    console.log("📤 Creating WooCommerce order with data:", {
      payment_method: orderData.payment_method,
      transaction_id: orderData.transaction_id,
      status: orderData.status,
      set_paid: orderData.set_paid,
      customer_email: orderData.billing.email,
      total_items: orderData.line_items.length,
      shipping_method: orderData.shipping_lines[0]?.method_title,
    });

    const { data } = await axiosWCApi.post<WooCommerceOrderResponse>(
      "/orders",
      orderData,
    );

    console.log("✅ WooCommerce API Response:", {
      hasData: !!data,
      orderId: data?.id,
      status: data?.status,
      total: data?.total,
    });

    if (data && data.id) {
      // Update PaymentIntent metadata with order ID (for idempotency)
      try {
        await stripe.paymentIntents.update(paymentIntent.id, {
          metadata: {
            ...metadata,
            woo_order_id: data.id.toString(),
            order_processed: "true",
          },
        });
      } catch (error) {
        console.error("Failed to update PaymentIntent metadata:", error);
      }

      return { success: true, orderId: data.id };
    }

    // If no data.id returned
    console.error("❌ WooCommerce returned no order ID:", data);
    return {
      success: false,
      error: "WooCommerce did not return an order ID",
    };
  } catch (error) {
    console.error("❌ Failed to create WooCommerce order:", error);

    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}
