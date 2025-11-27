import { ReactNode } from "react";
import {
  Comic_Neue,
  Fira_Code,
  Lora,
  Playfair_Display,
} from "next/font/google";
import { getBrandConfig } from "@/config/brands/getBrandConfig";
import { Footer } from "@features/footer";
import AddToCartModal from "@shared/components/AddToCartModal";
import { Toaster } from "@shared/shadcn/ui/sonner";
import { Providers } from "./providers";
import "@shared/styles/globals.css";

const lora = Lora({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-lora",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
  display: "swap",
});

const firaCode = Fira_Code({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  variable: "--font-fira-code",
  display: "swap",
});

const comicNeue = Comic_Neue({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-comic-neue",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const { themeCss } = getBrandConfig();

  return (
    <html
      lang="pl"
      suppressHydrationWarning
      className={`${lora.variable} ${playfair.variable} ${firaCode.variable} ${comicNeue.variable}`}
    >
      <head>
        <link rel="dns-prefetch" href="https://tweakcn.com" />

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
