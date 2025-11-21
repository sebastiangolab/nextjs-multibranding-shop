import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.BRAND1_STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  try {
    const { amount, metadata } = await req.json();

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Amout should be in cents
      currency: "pln",
      automatic_payment_methods: {
        enabled: true,
      },
      metadata,
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (error: any) {
    console.error("Payment Intent error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
