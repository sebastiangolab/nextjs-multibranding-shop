import { HeaderData } from "../../types";
import Link from "next/link";
import Image from "next/image";
import React, { ReactElement } from "react";
import { useThemeMode } from "@/shared/hooks/useThemeMode";

type LogoProps = {
  logoData: HeaderData["logoData"];
  logoDarkData?: HeaderData["logoDarkModeData"];
};

const Logo = ({ logoData, logoDarkData }: LogoProps): ReactElement => {
  const { isDark, mounted } = useThemeMode();

  const isDarkTheme = logoDarkData && isDark && mounted;

  const { url, alt, width, height } = isDarkTheme ? logoDarkData : logoData;

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
        className="max-h-11 w-auto"
      />
    </Link>
  );
};

export default Logo;
