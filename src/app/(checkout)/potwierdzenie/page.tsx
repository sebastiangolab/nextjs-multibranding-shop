import type { Metadata } from "next";
import { ConfirmationView } from "@/views/confirmation";
import { Header } from "@/features/header";
import { getBrandConfig } from "@/config/brands/getBrandConfig";

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
      <ConfirmationView />
    </>
  );
}
