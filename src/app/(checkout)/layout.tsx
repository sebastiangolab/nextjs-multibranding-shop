import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export const metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default async function CheckoutLayout({ children }: LayoutProps) {
  return <div className="min-h-[80vh] bg-muted/50">{children}</div>;
}
