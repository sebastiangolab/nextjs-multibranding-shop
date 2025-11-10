"use client";

import { MenuItem } from "../../types";
import {
  NavigationMenu as NavigationMenuShadcn,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@shared/shadcn/ui/navigation-menu";
import Link from "next/link";

interface NavigationMenuProps {
  menuDataItems: MenuItem[];
}

export const NavigationMenu = ({ menuDataItems }: NavigationMenuProps) => {
  return (
    <NavigationMenuShadcn viewport={false}>
      <NavigationMenuList>
        {menuDataItems.map((menuItem) => {
          if (
            Array.isArray(menuItem.childrens) &&
            menuItem.childrens.length > 0
          ) {
            return (
              <NavigationMenuItem key={menuItem.id}>
                <NavigationMenuTrigger>{menuItem.title}</NavigationMenuTrigger>

                <NavigationMenuContent>
                  <ul className="grid w-[200px] gap-4">
                    <li>
                      {menuItem.childrens.map((item) => (
                        <NavigationMenuLink key={item.id} asChild>
                          <Link href={item.url}>{item.title}</Link>
                        </NavigationMenuLink>
                      ))}
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            );
          }

          return (
            <NavigationMenuItem key={menuItem.id}>
              <NavigationMenuLink
                href={menuItem.url}
                className={navigationMenuTriggerStyle()}
              >
                {menuItem.title}
              </NavigationMenuLink>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenuShadcn>
  );
};
