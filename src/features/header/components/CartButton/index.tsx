"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@shared/store/cartStore";

const CartButton = () => {
  const { getTotalItemsQuantity } = useCartStore();

  const totalItems = getTotalItemsQuantity();

  return (
    <Link href="/koszyk" className="flex items-center gap-1">
      <ShoppingCart className="h-5 w-5" />
      <span>Koszyk ({getTotalItemsQuantity()})</span>
    </Link>
  );
};
export default CartButton;
