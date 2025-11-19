import { CheckoutHeader } from "@/features/header";
import CartView from "@/views/cart";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Koszyk`,
    description:
      "Przejrzyj produkty dodane do koszyka i przejdź do procesu zamówienia.",
  };
}

export default function CartPage() {
  return (
    <>
      <CheckoutHeader currentStep={1} />
      <CartView />
    </>
  );
}
