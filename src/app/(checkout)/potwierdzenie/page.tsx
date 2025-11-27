import type { Metadata } from "next";
import { getBrandConfig } from "@/config/brands/getBrandConfig";
import { CheckoutGuard } from "@/features/checkout";
import { Header } from "@/features/header";
import { ConfirmationView } from "@/views/confirmation";

export async function generateMetadata(): Promise<Metadata> {
  const brand = getBrandConfig();

  return {
    title: `Potwierdzenie zamówienia | ${brand.shopName}`,
    description: `Potwierdzenie złożenia zamówienia`,
  };
}

export default function ConfirmationPage() {
  return (
    <>
      <Header />

      <CheckoutGuard
        requireCart={true}
        requireDeliveryData={true}
        requirePaymentData={true}
      >
        <ConfirmationView />
      </CheckoutGuard>
    </>
  );
}
