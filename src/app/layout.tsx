import { ReactNode } from "react";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { Header } from "@features/header";
import "@shared/styles/globals.css";
import { Providers } from "./providers";

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
    <html lang="pl">
      <body className={roboto.className}>
        <div className="flex justify-center">
          <div className="container mx-auto px-4">
            <Providers>
              <Header />

              {children}
            </Providers>
          </div>
        </div>
      </body>
    </html>
  );
}
