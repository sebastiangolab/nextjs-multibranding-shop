"use client";

import { useCartStore } from "@shared/store/cartStore";
import { useFavoritesStore } from "@shared/store/favoritesStore";
import { Heart, ShoppingCart } from "lucide-react";
import UserActionButton from "../UserActionButton";

const UserActions = () => {
  const { quantity } = useCartStore();
  const { productsIds } = useFavoritesStore();

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
    </div>
  );
};

export default UserActions;
