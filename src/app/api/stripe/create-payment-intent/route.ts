import { DeliveryFormData, DeliveryMethodData } from "@/features/checkout";
import { CartProductItem } from "@/shared/types";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

interface CreatePaymentIntentRequest {
  amount: number;
  cartItems: CartProductItem[];
  deliveryFormData: DeliveryFormData;
  deliveryMethod: DeliveryMethodData;
}

const stripe = new Stripe(process.env.BRAND1_STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  try {
    const {
      amount,
      cartItems,
      deliveryFormData,
      deliveryMethod,
    }: CreatePaymentIntentRequest = await req.json();

    // Compress cart items to fit in 500 char limit
    // Format: "productId:quantity,productId:quantity"
    const compressedCartProducts = cartItems
      .map((item: any) => `${item.productId}:${item.quantity}`)
      .join(",");

    // Store ALL order data in metadata for webhook processing
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Amount should be in cents
      currency: "pln",
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        // Order processing flags
        woo_order_id: "",
        order_processed: "false",

        // Cart data (compressed format: "id:qty,id:qty")
        cart_items: compressedCartProducts,

        // Delivery form data
        first_name: deliveryFormData.firstName,
        last_name: deliveryFormData.lastName,
        email: deliveryFormData.email,
        phone: deliveryFormData.phone,

        street: deliveryFormData.street,
        house_number: deliveryFormData.houseNumber,
        apartment_number: deliveryFormData.apartmentNumber,
        postal_code: deliveryFormData.postalCode,
        city: deliveryFormData.city,
        voivodeship: deliveryFormData.voivodeship,

        is_different_billing_address: deliveryFormData.isDifferentBillingAddress
          ? 1
          : 0,
        billing_street: deliveryFormData.billingStreet,
        billing_house_number: deliveryFormData.billingHouseNumber,
        billing_apartment_number: deliveryFormData.billingApartmentNumber,
        billing_postal_code: deliveryFormData.billingPostalCode,
        billing_city: deliveryFormData.billingCity,
        billing_voivodeship: deliveryFormData.billingVoivodeship,

        notes: deliveryFormData.notes,

        // Delivery method
        delivery_method_id: deliveryMethod.id,
        delivery_method_name: deliveryMethod.title,
        delivery_method_price: deliveryMethod.price.toString(),
      },
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
