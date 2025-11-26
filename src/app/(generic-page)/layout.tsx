import { ReactNode } from "react";
import { Header } from "@/features/header";

interface LayoutProps {
  children: ReactNode;
}

export default function GenericPageLayout({ children }: LayoutProps) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
