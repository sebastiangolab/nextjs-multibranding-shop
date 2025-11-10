"use client";

import { Button } from "@shared/shadcn/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@shared/shadcn/ui/sheet";
import { Menu } from "lucide-react";
import { SidebarNavigationMenu } from "../SidebarNavigationMenu";
import { MenuItem } from "../../types";

interface SidebarNavigationButtonProps {
  menuDataItems: MenuItem[];
}

const SidebarNavigationButton = ({
  menuDataItems,
}: SidebarNavigationButtonProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Open menu">
          <Menu className="size-6" />
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="w-[300px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>

        <div className="mt-2">
          <SidebarNavigationMenu menuDataItems={menuDataItems} />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SidebarNavigationButton;
