"use client";

import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/shared/store/cartStore";
import { Button } from "@/shared/shadcn/ui/button";
import { Input } from "@/shared/shadcn/ui/input";
import { Minus, Plus, Trash2 } from "lucide-react";
import { ChangeEvent } from "react";
import { LinkButton } from "@/shared/components/LinkButton";
import { CartTableProduct } from "@/features/checkout";
import { multiplyPrice, Price } from "@/features/prices";

interface CartTableProps {
  products: CartTableProduct[];
}

export const CartTable = ({ products }: CartTableProps) => {
  const { updateProductQuantityInCart, removeItemFromCart } = useCartStore();

  if (products.length === 0) {
    return (
      <div className="bg-card rounded-lg border p-8 text-center">
        <p className="text-muted-foreground mb-4">Twój koszyk jest pusty</p>

        <LinkButton href="/">Przejdź do zakupów</LinkButton>
      </div>
    );
  }

  const desktopTrTagCommonClasses =
    "px-6 py-4 text-left text-sm font-semibold text-foreground";

  return (
    <div className="bg-card rounded-lg border overflow-hidden">
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50 border-b">
            <tr>
              <th className={desktopTrTagCommonClasses}>Produkt</th>

              <th className={desktopTrTagCommonClasses}>Cena</th>

              <th className={desktopTrTagCommonClasses}>Ilość</th>

              <th className={desktopTrTagCommonClasses}>Suma</th>

              <th className={desktopTrTagCommonClasses}>Akcje</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {products.map((product) => (
              <tr key={product.id} className={`transition-opacity`}>
                {/* Image nad name column */}
                <td className="px-6 py-4">
                  <Link
                    href={`/p/${product.slug}`}
                    className="flex items-center gap-4 hover:opacity-80 transition-opacity"
                  >
                    {product.images && product.images.length > 0 ? (
                      <div className="relative w-20 h-20 flex-shrink-0 bg-muted rounded-md overflow-hidden">
                        <Image
                          src={product.images[0].src}
                          alt={product.images[0].alt || product.name}
                          fill
                          className="object-contain p-2"
                        />
                      </div>
                    ) : null}

                    <div>
                      <h3 className="font-medium text-foreground line-clamp-2">
                        {product.name}
                      </h3>
                    </div>
                  </Link>
                </td>

                {/* Price column */}
                <td className="px-6 py-4">
                  <span className="font-medium text-foreground">
                    <Price price={product.price} />
                  </span>
                </td>

                {/* Quantity column */}
                <td className="px-6 py-4">
                  <div className="flex items-center justify-start gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() =>
                        updateProductQuantityInCart(
                          product.id,
                          product.quantity - 1
                        )
                      }
                      disabled={product.quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>

                    <Input
                      type="number"
                      min="1"
                      value={product.quantity}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        updateProductQuantityInCart(
                          product.id,
                          parseInt(event.target.value) || 1
                        )
                      }
                      className="w-16 text-center"
                    />

                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() =>
                        updateProductQuantityInCart(
                          product.id,
                          product.quantity + 1
                        )
                      }
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </td>

                {/* Total column */}
                <td className="px-6 py-4">
                  <span className="font-semibold text-foreground">
                    <Price
                      price={multiplyPrice(product.price, product.quantity)}
                    />
                  </span>
                </td>

                {/* Actions column */}
                <td className="px-6 py-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeItemFromCart(product.id)}
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden divide-y">
        {products.map((product) => (
          <div key={product.id} className={`p-4 transition-opacity`}>
            <div className="flex gap-4">
              {/* Product image */}
              {product.images && product.images.length > 0 ? (
                <Link
                  href={`/p/${product.slug}`}
                  className="relative w-24 h-24 flex-shrink-0 bg-muted rounded-md overflow-hidden"
                >
                  <Image
                    src={product.images[0].src}
                    alt={product.images[0].alt || product.name}
                    fill
                    className="object-contain p-2"
                  />
                </Link>
              ) : null}

              <div className="flex-1 min-w-0">
                {/* Product name */}
                <Link href={`/p/${product.slug}`}>
                  <h3 className="font-medium text-foreground line-clamp-2 mb-2">
                    {product.name}
                  </h3>
                </Link>

                {/* Product price */}
                <p className="text-sm text-muted-foreground mb-2">
                  Cena:{" "}
                  <span className="font-medium">
                    <Price price={product.price} />
                  </span>
                </p>

                {/* Product quantity */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() =>
                        updateProductQuantityInCart(
                          product.id,
                          product.quantity - 1
                        )
                      }
                      disabled={product.quantity <= 1}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>

                    <span className="w-8 text-center font-medium">
                      {product.quantity}
                    </span>

                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() =>
                        updateProductQuantityInCart(
                          product.id,
                          product.quantity + 1
                        )
                      }
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>

                  <p className="font-semibold text-foreground text-right">
                    <Price
                      price={multiplyPrice(product.price, product.quantity)}
                    />
                  </p>
                </div>

                {/* Remove product button */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeItemFromCart(product.id)}
                  className="text-destructive hover:text-destructive hover:bg-destructive/10 mt-2 w-full"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Usuń
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
