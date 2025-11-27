import type { Metadata } from "next";
import { getBrandConfig } from "@/config/brands/getBrandConfig";
import { CheckoutGuard, CheckoutStep } from "@/features/checkout";
import { Footer } from "@/features/footer";
import { CheckoutHeader } from "@/features/header";
import DeliveryView from "@/views/delivery";

export async function generateMetadata(): Promise<Metadata> {
  const brand = getBrandConfig();

  return {
    title: `Dostawa | ${brand.shopName}`,
    description: `Wybierz sposób dostawy zamówienia`,
  };
}

const DeliveryPage = () => {
  return (
    <>
      <CheckoutHeader currentStep={CheckoutStep.DELIVERY} />

      <CheckoutGuard requireCart={true}>
        <DeliveryView />
      </CheckoutGuard>

      <Footer />
    </>
  );
};

export default DeliveryPage;
