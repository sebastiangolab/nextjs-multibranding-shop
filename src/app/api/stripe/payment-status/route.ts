import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const paymentIntentId = searchParams.get("payment_intent_id");

    if (!paymentIntentId) {
      return NextResponse.json(
        { error: "payment_intent_id is required" },
        { status: 400 },
      );
    }

    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    return NextResponse.json({
      success: true,
      paymentStatus: paymentIntent.status,
      orderId: paymentIntent.metadata.woo_order_id || undefined,
      orderProcessed: paymentIntent.metadata.order_processed === "true",
    });
  } catch (error) {
    console.error("Error fetching payment status:", error);
    return NextResponse.json(
      {
        success: false,
        error: error || "Failed to fetch payment status",
      },
      { status: 500 },
    );
  }
}
