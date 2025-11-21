import { CheckoutStep } from "@/features/checkout";
import { CheckoutHeader } from "@/features/header";
import DeliveryView from "@/views/delivery";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Dostawa`,
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
