import type { Metadata } from "next";
import { PaymentView } from "@/views/payment";
import { CheckoutHeader } from "@/features/header";
import { CheckoutStep } from "@/features/checkout";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Płatność`,
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
