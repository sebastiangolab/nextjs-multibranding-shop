import { ReactNode } from "react";
import { Roboto } from "next/font/google";
import { getBrandConfig } from "@/config/brands/getBrandConfig";
import { Footer } from "@features/footer";
import AddToCartModal from "@shared/components/AddToCartModal";
import { Toaster } from "@shared/shadcn/ui/sonner";
import { Providers } from "./providers";
import "@shared/styles/globals.css";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const { themeCss } = getBrandConfig();

  return (
    <html lang="pl" suppressHydrationWarning>
      <head>
        {/* Script that gives access to read the page in tweakcn.com editor */}
        <script src="https://tweakcn.com/live-preview.min.js" async></script>

        <style
          dangerouslySetInnerHTML={{ __html: themeCss }}
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
