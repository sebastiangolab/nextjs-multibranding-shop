"use client";

import Link from "next/link";
import {
  NavigationMenu as NavigationMenuShadcn,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@shared/shadcn/ui/navigation-menu";
import { MenuItem } from "@shared/types";

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
                          <Link href={item.url} prefetch={false}>
                            {item.title}
                          </Link>
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
                className={navigationMenuTriggerStyle()}
                asChild
              >
                <Link href={menuItem.url} prefetch={false}>{menuItem.title}</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenuShadcn>
  );
};
