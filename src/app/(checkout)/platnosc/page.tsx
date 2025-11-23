import type { Metadata } from "next";
import { PaymentView } from "@/views/payment";
import { CheckoutHeader } from "@/features/header";
import { CheckoutStep } from "@/features/checkout";
import { getBrandConfig } from "@/config/brands/getBrandConfig";

export async function generateMetadata(): Promise<Metadata> {
  const brand = getBrandConfig();

  return {
    title: `Płatność | ${brand.shopName}`,
    description: `Wybierz metodę płatności dla zamówienia`,
  };
}

export default function PaymentPage() {
  return (
    <>
      <CheckoutHeader currentStep={CheckoutStep.PAYMENT} />
      <PaymentView />
    </>
  );
}
