import { ReactNode } from "react";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "@shared/styles/globals.css";
import { Providers } from "./providers";
import { Footer } from "@features/footer";
import AddToCartModal from "@shared/components/AddToCartModal";
import { Toaster } from "@shared/shadcn/ui/sonner";
import { generateThemeCSS } from "@/config/brands";

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
  const themeCSS = generateThemeCSS();

  return (
    <html lang="pl">
      <head>
        {/* Script that gives access to read the page in tweakcn.com editor */}
        <script src="https://tweakcn.com/live-preview.min.js"></script>

        <style
          dangerouslySetInnerHTML={{ __html: themeCSS }}
          suppressHydrationWarning
        />
      </head>
      <body className={roboto.className}>
        <Providers>
          <div>{children}</div>

          <Footer />

          <AddToCartModal />
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
