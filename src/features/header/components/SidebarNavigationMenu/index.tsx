"use client";

import { HeaderData } from "../../types";
import { LinkButton } from "@shared/components/LinkButton";
import { Accordion } from "@shared/shadcn/ui/accordion";
import SidebarMenuDropdownItem from "../SidebarMenuDropdownItem";

interface SidebarNavigationMenuProps {
  menuData: HeaderData["menuData"];
}

export const SidebarNavigationMenu = ({
  menuData,
}: SidebarNavigationMenuProps) => {
  return (
    <nav className="flex flex-col gap-2" aria-label="Mobile navigation">
      <Accordion type="single" collapsible className="w-full">
        {menuData.map((menuItem) =>
          menuItem.childrens && menuItem.childrens.length > 0 ? (
            // Item with accordion
            <SidebarMenuDropdownItem key={menuItem.id} menuItem={menuItem} />
          ) : (
            // Simple menu item
            <div key={menuItem.id.toString()}>
              <LinkButton
                variant="ghost"
                href={menuItem.url}
                className="w-full justify-start text-sm"
              >
                {menuItem.title}
              </LinkButton>
            </div>
          )
        )}
      </Accordion>
    </nav>
  );
};
