"use client";

import { ReactElement } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, User } from "lucide-react";
import Menu from "@header/components/Menu";
import { HeaderData } from "@header/types";

type HeaderClientProps = {
  data: HeaderData;
};

export default function HeaderClient({
  data,
}: HeaderClientProps): ReactElement<HeaderClientProps> {
  const { logoData, menuData } = data;

  return (
    <header className="border-b">
      <div className="container flex py-4 items-center justify-between">
        <Link href="/" className="font-bold text-xl">
          <Image
            src={logoData.url}
            alt={logoData.alt}
            width={logoData.width}
            height={logoData.height}
          />
        </Link>

        <div className="md:flex">
          <Menu data={menuData} />
        </div>

        <div className="md:flex items-center gap-4">
          <Link href="/konto" className="flex items-center gap-1">
            <User className="h-5 w-5" />
            <span>Zaloguj się</span>
          </Link>

          <Link href="/koszyk" className="flex items-center gap-1">
            <ShoppingCart className="h-5 w-5" />
            <span>Koszyk</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
