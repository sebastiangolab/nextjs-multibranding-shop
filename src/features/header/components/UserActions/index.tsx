"use client";

import { useCartStore } from "@shared/store/cartStore";
import { useFavoritesStore } from "@shared/store/favoritesStore";
import { Heart, ShoppingCart } from "lucide-react";
import UserActionButton from "../UserActionButton";
import ThemeToggle from "../ThemeToggle";
import { getBrandConfig } from "@/config/brands/getBrandConfig";

const UserActions = () => {
  const { quantity } = useCartStore();
  const { productsIds } = useFavoritesStore();

  const { availableThemeToggle } = getBrandConfig();

  return (
    <div className="flex items-center gap-2 justify-end">
      {/* Favorites Button */}
      <UserActionButton
        label="Ulubione"
        href="/ulubione"
        icon={<Heart className="size-5" />}
        quantity={productsIds.length}
      />

      {/* Cart Button */}
      <UserActionButton
        label="Koszyk"
        href="/koszyk"
        icon={<ShoppingCart className="size-5" />}
        quantity={quantity}
      />

      {/* Theme Toggle */}
      {availableThemeToggle ? (
        <div className="pl-2 border-l-2">
          <ThemeToggle />
        </div>
      ) : null}
    </div>
  );
};

export default UserActions;
