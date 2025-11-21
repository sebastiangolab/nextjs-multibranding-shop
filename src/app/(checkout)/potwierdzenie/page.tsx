import type { Metadata } from "next";
import { ConfirmationView } from "@/views/confirmation";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Potwierdzenie zamówienia`,
    description: `Potwierdzenie złożenia zamówienia w sklepie`,
  };
}

export default function ConfirmationPage() {
  return <ConfirmationView />;
}
