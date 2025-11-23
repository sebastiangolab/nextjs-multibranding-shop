"use client";

import { Button } from "@/shared/shadcn/ui/button";
import { Separator } from "@/shared/shadcn/ui/separator";
import { Loader2, ShoppingBag, CreditCard, Truck } from "lucide-react";
import { useCheckoutStore } from "../../store/useCheckoutStore";
import { useCartStore } from "@/shared/store/cartStore";
import { CheckoutStep } from "../../types";
import { addPrices, Price } from "@/features/prices";

interface CheckoutSummaryProps {
  step: CheckoutStep;
  isLoading?: boolean;
  isDisabled?: boolean;
  buttonOnClick?: () => void;
  errorMessage?: string;
}

const CheckoutSummary = ({
  step,
  isLoading = false,
  isDisabled = false,
  buttonOnClick,
  errorMessage,
}: CheckoutSummaryProps) => {
  const { summaryProductsPrice, deliveryMethodData } = useCheckoutStore();
  const { quantity: cartItemsQuantity } = useCartStore();

  const deliveryCost = deliveryMethodData?.price ?? 0;
  const deliveryEstimate = deliveryMethodData?.deliveryTime;

  const totalProductsPriceElement = isLoading ? (
    <Loader2 className="h-4 w-4 animate-spin text-primary" />
  ) : (
    <Price price={summaryProductsPrice} />
  );

  const buttonIconClasses = "w-5 h-5 mr-2";

  // Config for each step
  const stepConfig = {
    [CheckoutStep.CART]: {
      totalPrice: summaryProductsPrice,
      infoText: "Koszt dostawy zostanie obliczony w następnym kroku",
      buttonText: "Przejdź do dostawy",
      buttonIcon: <ShoppingBag className={buttonIconClasses} />,
      deliveryCost: null,
      deliveryEstimate: null,
    },
    [CheckoutStep.DELIVERY]: {
      totalPrice: addPrices(summaryProductsPrice, deliveryCost),
      infoText: null,
      buttonText: "Przejdź do płatności",
      buttonIcon: <Truck className={buttonIconClasses} />,
      deliveryCost,
      deliveryEstimate,
    },
    [CheckoutStep.PAYMENT]: {
      totalPrice: addPrices(summaryProductsPrice, deliveryCost),
      infoText: null,
      buttonText: `Zapłać`,
      buttonIcon: <CreditCard className={buttonIconClasses} />,
      deliveryCost,
      deliveryEstimate,
    },
  };

  // Current step config
  const config = stepConfig[step];

  const totalPriceElement = isLoading ? (
    <Loader2 className="h-6 w-6 animate-spin text-primary" />
  ) : (
    <Price price={config.totalPrice} />
  );

  return (
    <div className="space-y-4 sticky top-24 self-start">
      <div className="bg-white rounded-lg border p-6">
        <h2 className="text-xl font-bold mb-6">Podsumowanie</h2>

        <div className="space-y-4">
          {/* Products info */}
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">
              Produkty ({cartItemsQuantity} szt.)
            </span>
            <span className="font-medium">{totalProductsPriceElement}</span>
          </div>

          {/* Delivery info */}
          {config.deliveryCost !== null && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Dostawa</span>

              {config.deliveryCost === 0 ? (
                <span className="font-medium text-green-600">Gratis</span>
              ) : (
                <span className="font-medium">
                  <Price price={config.deliveryCost} />
                </span>
              )}
            </div>
          )}

          <Separator />

          {/* Total price */}
          <div className="flex justify-between items-baseline">
            <span className="text-lg font-semibold">Do zapłaty:</span>

            <span className="text-2xl font-bold text-primary">
              {totalPriceElement}
            </span>
          </div>

          {/* Info text */}
          {config.infoText ? (
            <div className="bg-secondary/50 border border-secondary rounded-lg p-3 text-sm text-secondary-foreground">
              {config.infoText}
            </div>
          ) : null}

          {/* Delivery time info */}
          {config.deliveryEstimate ? (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-900">
              📦 Szacowany czas dostawy: {config.deliveryEstimate}
            </div>
          ) : null}

          <Separator />

          {/* Button */}
          <Button
            className="w-full"
            size="lg"
            onClick={buttonOnClick}
            disabled={isLoading || isDisabled}
          >
            {config.buttonIcon}
            {config.buttonText}
          </Button>

          {/* Error message */}
          {errorMessage && (
            <p className="text-xs text-red-600 text-center">{errorMessage}</p>
          )}

          {/* Additional info */}
          <div className="text-center pt-4 border-t">
            <p className="text-xs text-gray-500">
              🔒 Bezpieczne i szyfrowane płatności
            </p>

            <p className="text-xs text-gray-400 mt-1">Powered by Stripe</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSummary;
