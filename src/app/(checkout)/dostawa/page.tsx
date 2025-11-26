import type { Metadata } from "next";
import { getBrandConfig } from "@/config/brands/getBrandConfig";
import { CheckoutStep } from "@/features/checkout";
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
      <DeliveryView />
    </>
  );
};

export default DeliveryPage;
