import type { Metadata } from "next";
import { getBrandConfig } from "@/config/brands/getBrandConfig";
import { CheckoutStep } from "@/features/checkout";
import { CheckoutHeader } from "@/features/header";
import CartView from "@/views/cart";

export async function generateMetadata(): Promise<Metadata> {
  const brand = getBrandConfig();

  return {
    title: `Koszyk | ${brand.shopName}`,
    description: `Przejrzyj produkty dodane do koszyka i przejdź do procesu zamówienia`,
  };
}

const CartPage = () => {
  return (
    <>
      <CheckoutHeader currentStep={CheckoutStep.CART} />

      <CartView />
    </>
  );
};

export default CartPage;
