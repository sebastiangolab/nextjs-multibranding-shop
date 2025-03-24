import { ReactNode } from "react";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import LayoutWrapper from "@/components/LayoutWrapper.tsx";
import "@/styles/globals.css";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Next.js boilerplate",
  description: "page description",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
