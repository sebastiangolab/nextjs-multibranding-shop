import { ReactNode } from "react";
import { Header } from "@/features/header";

interface LayoutProps {
  children: ReactNode;
}

export default function ShopLayout({ children }: LayoutProps) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
