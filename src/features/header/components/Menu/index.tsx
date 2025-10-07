import React, { ReactElement } from "react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@shared/lib/shadcn/navigation-menu";
import { MenuData } from "../../types";

type MenuProps = {
  data: MenuData[];
};

const Menu = ({ data }: MenuProps): ReactElement<MenuProps> => {
  return (
    <NavigationMenu viewport={false}>
      <NavigationMenuList>
        {data.map((menuItem) => {
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
    </NavigationMenu>
  );
};

export default Menu;
