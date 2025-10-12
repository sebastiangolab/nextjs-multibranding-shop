import Image from "next/image";
import Link from "next/link";
import { User } from "lucide-react";
import { getHeaderData } from "../../actions/getHeaderData";
import CartButton from "../CartButton";
import Menu from "../Menu";

const Header = async () => {
  const data = await getHeaderData();

  if (!data) {
    return null;
  }

  const { logoData, menuData } = data;

  return (
    <header className="border-b flex py-4 items-center justify-between">
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

        <CartButton />
      </div>
    </header>
  );
};

export default Header;
