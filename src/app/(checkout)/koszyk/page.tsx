import { CheckoutStep } from "@/features/checkout";
import { CheckoutHeader } from "@/features/header";
import CheckoutLayout from "@/shared/layouts/CheckoutLayout";
import CartView from "@/views/cart";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Koszyk`,
    description:
      "Przejrzyj produkty dodane do koszyka i przejdź do procesu zamówienia.",
  };
}

const CartPage = () => {
  return (
    <CheckoutLayout>
      <CheckoutHeader currentStep={CheckoutStep.CART} />

      <CartView />
    </CheckoutLayout>
  );
};

export default CartPage;
