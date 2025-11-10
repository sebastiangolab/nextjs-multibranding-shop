"use client";

import { LinkButton } from "@shared/components/LinkButton";
import { Accordion } from "@shared/shadcn/ui/accordion";
import SidebarMenuDropdownItem from "../SidebarMenuDropdownItem";
import { MenuItem } from "@shared/types";

interface SidebarNavigationMenuProps {
  menuDataItems: MenuItem[];
}

export const SidebarNavigationMenu = ({
  menuDataItems,
}: SidebarNavigationMenuProps) => {
  return (
    <nav className="flex flex-col gap-2" aria-label="Mobile navigation">
      <Accordion type="single" collapsible className="w-full">
        {menuDataItems.map((menuItem) =>
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
