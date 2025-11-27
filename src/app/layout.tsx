import { ReactNode } from "react";
import { getBrandConfig } from "@/config/brands/getBrandConfig";
import { Footer } from "@features/footer";
import AddToCartModal from "@shared/components/AddToCartModal";
import { Toaster } from "@shared/shadcn/ui/sonner";
import { Providers } from "./providers";
import "@shared/styles/globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const { themeCss } = getBrandConfig();

  return (
    <html lang="pl" suppressHydrationWarning>
      <head>
        <link rel="dns-prefetch" href="https://tweakcn.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Lora:wght@400;500;600;700&family=Playfair+Display:wght@400;500;600;700&family=Fira+Code:wght@400;500;600&display=swap"
          rel="stylesheet"
        />

        {/* Script that gives access to read the page in tweakcn.com editor */}
        <script
          src="https://tweakcn.com/live-preview.min.js"
          async
          defer
        ></script>

        <style
          dangerouslySetInnerHTML={{ __html: themeCss }}
          suppressHydrationWarning
        />
      </head>
      <body>
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
