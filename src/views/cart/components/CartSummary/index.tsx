"use client";

import { Separator } from "@/shared/shadcn/ui/separator";
import { Loader2, ShoppingBag } from "lucide-react";
import { LinkButton } from "@/shared/components/LinkButton";

interface CartSummaryProps {
  subtotal: number;
  itemsCount: number;
  isLoading?: boolean;
}

export const CartSummary = ({
  subtotal,
  itemsCount,
  isLoading,
}: CartSummaryProps) => {
  const subTotalPriceElement = isLoading ? (
    <Loader2 className="h-4 w-4 animate-spin text-primary" />
  ) : (
    subtotal.toFixed(2) + " zł"
  );

  return (
    <div className="bg-card rounded-lg border p-6 sticky top-24">
      <h2 className="text-xl font-bold mb-6">Podsumowanie</h2>

      <div className="space-y-4">
        {/* Products count */}
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">
            Produkty ({itemsCount} {itemsCount === 1 ? "szt." : "szt."})
          </span>

          <span className="font-medium">{subTotalPriceElement}</span>
        </div>

        <Separator />

        {/* Total */}
        <div className="flex justify-between items-baseline">
          <span className="text-lg font-semibold">Suma</span>

          <span className="text-2xl font-bold text-primary">
            {subTotalPriceElement}
          </span>
        </div>

        {/* Info about delivery */}
        <div className="bg-secondary/50 border border-secondary rounded-lg p-3 text-sm text-secondary-foreground">
          Koszt dostawy zostanie obliczony w następnym kroku
        </div>

        {/* Button */}
        {!isLoading && itemsCount > 0 ? (
          <LinkButton className="w-full" size="lg" href="/dostawa">
            <ShoppingBag className="w-5 h-5 mr-2" />
            Przejdź do dostawy
          </LinkButton>
        ) : null}

        {/* Security */}
        <p className="text-xs text-muted-foreground text-center pt-4 border-t">
          🔒 Bezpieczne i szyfrowane płatności
        </p>
      </div>
    </div>
  );
};
