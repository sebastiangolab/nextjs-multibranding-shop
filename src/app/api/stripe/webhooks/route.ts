import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createWoocommerceOrderByMetadata } from "@/features/checkout";

// Validate environment variables
if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is not defined");
}

if (!process.env.STRIPE_WEBHOOK_SECRET) {
  throw new Error("STRIPE_WEBHOOK_SECRET is not defined");
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

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
        const result = await createWoocommerceOrderByMetadata(
          stripe,
          paymentIntent,
          "processing", // Successful payment = processing order
          true, // Payment is confirmed
        );

        if (!result.success) {
          console.error(
            `❌ Failed to create order for payment ${paymentIntent.id}:`,
            result.error,
          );

          return NextResponse.json(
            { error: "Failed to create order", details: result.error },
            { status: 500 },
          );
        }

        console.log(
          `✅ Order ${result.orderId} created successfully for payment ${paymentIntent.id}`,
        );
        break;
      } catch (error) {
        console.error("Error processing succeeded payment:", error);

        return NextResponse.json(
          { error: "Internal server error" },
          { status: 500 },
        );
      }
    }

    case "payment_intent.payment_failed": {
      const failedPayment = event.data.object as Stripe.PaymentIntent;
      console.error("❌ Payment failed:", failedPayment.id);

      try {
        const result = await createWoocommerceOrderByMetadata(
          stripe,
          failedPayment,
          "failed", // Failed payment = failed order
          false, // Payment not confirmed
        );

        if (!result.success) {
          console.error(
            `❌ Failed to create failed order for payment ${failedPayment.id}:`,
            result.error,
          );

          return NextResponse.json(
            { error: "Failed to create order", details: result.error },
            { status: 500 },
          );
        }

        console.log(
          `❌ Failed order ${result.orderId} created for payment ${failedPayment.id}`,
        );
      } catch (error) {
        console.error("Error processing failed payment:", error);

        return NextResponse.json(
          { error: "Internal server error" },
          { status: 500 },
        );
      }

      break;
    }

    case "payment_intent.processing": {
      const processingPayment = event.data.object as Stripe.PaymentIntent;
      console.log("⏳ Payment processing:", processingPayment.id);

      try {
        const result = await createWoocommerceOrderByMetadata(
          stripe,
          processingPayment,
          "on-hold", // Processing payment = on-hold order
          false, // Payment not yet confirmed
        );

        if (!result.success) {
          console.error(
            `❌ Failed to create on-hold order for payment ${processingPayment.id}:`,
            result.error,
          );

          return NextResponse.json(
            { error: "Failed to create order", details: result.error },
            { status: 500 },
          );
        }

        console.log(
          `⏳ Order ${result.orderId} created (on-hold) for payment ${processingPayment.id}`,
        );
      } catch (error) {
        console.error("Error processing payment in progress:", error);

        return NextResponse.json(
          { error: "Internal server error" },
          { status: 500 },
        );
      }
      break;
    }

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
