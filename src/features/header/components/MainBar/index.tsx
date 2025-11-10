import React from "react";
import Logo from "../Logo";
import UserActions from "../UserActions";
import SearchBar from "../SearchBar";
import { HeaderData } from "../../types";
import SidebarNavigationButton from "../SidebarNavigationButton";
import { MenuItem } from "@shared/types";

interface MainBarProps {
  isSticky: boolean;
  logoData: HeaderData["logoData"];
  menuDataItems: MenuItem[];
}

const MainBar = ({ isSticky, logoData, menuDataItems }: MainBarProps) => {
  return (
    <div className={`transition-all ${isSticky ? "py-1" : "py-4"} px-4`}>
      {/* Mobile Layout */}
      <div className="md:hidden space-y-3">
        <div className="flex items-center justify-between">
          <Logo data={logoData} />

          <UserActions />
        </div>

        <div className="flex items-center gap-2">
          <SidebarNavigationButton menuDataItems={menuDataItems} />

          <SearchBar />
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:grid md:grid-cols-3 gap-4 items-center">
        <div className="flex justify-start items-center gap-2">
          {isSticky && (
            <SidebarNavigationButton menuDataItems={menuDataItems} />
          )}

          <Logo data={logoData} />
        </div>

        <div className="flex justify-center">
          <SearchBar />
        </div>

        <div className="flex justify-end">
          <UserActions />
        </div>
      </div>
    </div>
  );
};

export default MainBar;
