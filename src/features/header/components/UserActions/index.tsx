"use client";

import { LinkButton } from "@shared/components/LinkButton";
import { Badge } from "@shared/shadcn/ui/badge";
import { useCartStore } from "@shared/store/cartStore";
import { Heart, ShoppingCart } from "lucide-react";

const UserActions = () => {
  const { quantity } = useCartStore();

  return (
    <div className="flex items-center gap-2 justify-end">
      {/* Favorites Button */}
      <LinkButton
        variant="ghost"
        size="sm"
        className="flex flex-col items-center gap-1 h-auto py-2"
        href="/favorites"
      >
        <Heart className="size-5" />

        <span className="text-xs">Ulubione</span>
      </LinkButton>

      {/* Cart Button with Badge */}
      <LinkButton
        variant="ghost"
        size="sm"
        className="flex flex-col items-center gap-1 h-auto py-2 relative"
        href="/cart"
      >
        <div className="relative">
          <ShoppingCart className="size-5" />

          {quantity > 0 && (
            <Badge
              variant="default"
              className="absolute -top-2 -right-2.5 min-h-4 min-w-4 flex items-center justify-center p-0 text-[0.625rem] rounded-sm"
            >
              {quantity}
            </Badge>
          )}
        </div>

        <span className="text-xs">Koszyk</span>
      </LinkButton>
    </div>
  );
};

export default UserActions;
