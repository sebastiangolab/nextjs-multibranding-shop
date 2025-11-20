import { Header } from "@/features/header";
import { ReactNode } from "react";

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
