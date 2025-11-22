"use client";

import React, { useEffect, useRef, useState } from "react";
import MainBar from "../MainBar";
import { NavigationMenu } from "../NavigationMenu";
import { HeaderData } from "../../types";

interface HeaderProps {
  data: HeaderData;
}

const HeaderClient = ({ data }: HeaderProps) => {
  const [isSticky, setIsSticky] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  const { logoData, logoDarkModeData, menuData } = data;

  useEffect(() => {
    const handleScroll = () => {
      const headerHeight = headerRef.current?.offsetHeight || 0;

      setIsSticky(window.scrollY > headerHeight);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      ref={headerRef}
      className="shadow-sm bg-background md:sticky md:top-0 md:z-50"
    >
      <div className="container mx-auto">
        <MainBar
          isSticky={isSticky}
          logoData={logoData}
          logoDarkData={logoDarkModeData}
          menuDataItems={menuData.items}
        />

        {/* Navigation Row - Hidden on mobile or when isSticky */}
        <div className={`${isSticky ? "hidden" : "hidden md:block"} pb-1 px-4`}>
          <div className="-ml-3">
            <NavigationMenu menuDataItems={menuData.items} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderClient;
