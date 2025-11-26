import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createWooCommerceOrder } from "@/features/checkout/actions/createWooCommerceOrder";
import { updateWooCommerceOrderStatus } from "@/features/checkout/actions/updateWooCommerceOrderStatus";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

/**
 * Helper: Create WooCommerce order from PaymentIntent metadata
 */
async function createOrderFromMetadata(
  paymentIntent: Stripe.PaymentIntent,
  orderStatus: "processing" | "pending" | "on-hold" | "failed" | "completed",
  setPaid: boolean,
) {
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

  // Build full address
  const fullAddress = `${metadata.street} ${metadata.house_number}${
    metadata.apartment_number ? `/${metadata.apartment_number}` : ""
  }`;

  const fullBillingAdress = `${metadata.billing_street} ${metadata.billing_house_number}${
    metadata.billing_apartment_number
      ? `/${metadata.billing_apartment_number}`
      : ""
  }`;

  // Create order in WooCommerce
  const orderResult = await createWooCommerceOrder({
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
  });

  if (orderResult.success && orderResult.orderId) {
    // Update PaymentIntent metadata with order ID (for idempotency)
    try {
      await stripe.paymentIntents.update(paymentIntent.id, {
        metadata: {
          ...metadata,
          woo_order_id: orderResult.orderId.toString(),
          order_processed: "true",
        },
      });
    } catch (error) {
      console.error("Failed to update PaymentIntent metadata:", error);
    }
  }

  return orderResult;
}

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature")!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err: any) {
    console.error("❌ Webhook signature verification failed:", err.message);

    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  switch (event.type) {
    case "payment_intent.succeeded": {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;

      try {
        const result = await createOrderFromMetadata(
          paymentIntent,
          "processing", // Successful payment = processing order
          true, // Payment is confirmed
        );

        if (result.success) {
          console.log(
            `✅ Order ${result.orderId} created successfully for payment ${paymentIntent.id}`,
          );
        } else {
          console.error(
            `❌ Failed to create order for payment ${paymentIntent.id}:`,
            result.error,
          );
        }
      } catch (error) {
        console.error("Error processing succeeded payment:", error);
      }

      break;
    }

    case "payment_intent.payment_failed": {
      const failedPayment = event.data.object as Stripe.PaymentIntent;
      console.error("❌ Payment failed:", failedPayment.id);

      try {
        const result = await createOrderFromMetadata(
          failedPayment,
          "failed", // Failed payment = failed order
          false, // Payment not confirmed
        );

        if (result.success) {
          console.log(
            `❌ Failed order ${result.orderId} created for payment ${failedPayment.id}`,
          );
        }
      } catch (error) {
        console.error("Error processing failed payment:", error);
      }

      break;
    }

    case "payment_intent.processing": {
      const processingPayment = event.data.object as Stripe.PaymentIntent;
      console.log("⏳ Payment processing:", processingPayment.id);

      try {
        const result = await createOrderFromMetadata(
          processingPayment,
          "on-hold", // Processing payment = on-hold order
          false, // Payment not yet confirmed
        );

        if (result.success) {
          console.log(
            `⏳ Order ${result.orderId} created (on-hold) for payment ${processingPayment.id}`,
          );
        }
      } catch (error) {
        console.error("Error processing payment in progress:", error);
      }
      break;
    }

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
