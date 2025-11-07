import { HeaderData } from "../../types";
import Link from "next/link";
import Image from "next/image";
import React, { ReactElement } from "react";

type LogoProps = {
  data: HeaderData["logoData"];
};

const Logo = ({ data }: LogoProps): ReactElement => {
  const { url, alt, width, height } = data;

  return (
    <Link
      href="/"
      className="flex items-center text-xl font-bold hover:opacity-80 transition-opacity"
    >
      <Image
        src={url}
        alt={alt}
        width={width}
        height={height}
        className="max-h-9 w-auto"
      />
    </Link>
  );
};

export default Logo;
