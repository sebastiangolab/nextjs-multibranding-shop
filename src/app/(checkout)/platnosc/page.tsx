import type { Metadata } from "next";
import { getBrandConfig } from "@/config/brands/getBrandConfig";
import { CheckoutGuard, CheckoutStep } from "@/features/checkout";
import { CheckoutHeader } from "@/features/header";
import { PaymentView } from "@/views/payment";

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

      <CheckoutGuard requireCart={true} requireDeliveryData={true}>
        <PaymentView />
      </CheckoutGuard>
    </>
  );
}
