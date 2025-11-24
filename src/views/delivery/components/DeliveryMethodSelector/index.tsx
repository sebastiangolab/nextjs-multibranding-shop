"use client";

import { Label } from "@/shared/shadcn/ui/label";
import { RadioGroup, RadioGroupItem } from "@/shared/shadcn/ui/radio-group";
import { DeliveryMethodData, useCheckoutStore } from "@/features/checkout";
import { getExtendedDeliveryMethod } from "../../helpers/getExtendedDeliveryMethod";
import { Price } from "@/features/prices";

interface DeliveryMethodSelectorProps {
  deliveriesMethods: DeliveryMethodData[];
}

export const DeliveryMethodSelector = ({
  deliveriesMethods,
}: DeliveryMethodSelectorProps) => {
  const {
    deliveryMethodData: selectedDeliveryMethod,
    updateDeliveryMethodData,
  } = useCheckoutStore();

  if (selectedDeliveryMethod === null) {
    return null;
  }

  const normalizedMethods = deliveriesMethods.map((method) =>
    getExtendedDeliveryMethod(method)
  );

  const handleSelectedMethod = (methodId: string) => {
    const method = normalizedMethods.find((method) => method.id === methodId);

    if (!method) return;

    const methodWithoutIcon = { ...method, icon: undefined };

    updateDeliveryMethodData(methodWithoutIcon);
  };

  return (
    <div className="bg-card rounded-lg border p-6">
      <h3 className="text-lg font-semibold mb-5">Metoda dostawy</h3>

      <RadioGroup
        value={selectedDeliveryMethod.id}
        onValueChange={handleSelectedMethod}
      >
        <div className="space-y-3">
          {normalizedMethods.map((method) => (
            <div
              key={method.id}
              className={`
                relative flex items-center space-x-3 rounded-lg border-2 p-4 cursor-pointer transition-all
                ${
                  selectedDeliveryMethod.id === method.id
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                }
              `}
              onClick={() => handleSelectedMethod(method.id)}
            >
              <RadioGroupItem
                value={method.id}
                id={method.id}
                className="mt-1"
              />

              <div className="flex items-center gap-4 flex-1">
                {/* Method icon */}
                <div
                  className={`
                    p-3 rounded-lg
                    ${
                      selectedDeliveryMethod.id === method.id
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }
                  `}
                >
                  {method.icon}
                </div>

                {/* Method details */}
                <div className="flex-1">
                  <Label
                    htmlFor={method.id}
                    className="font-semibold text-base cursor-pointer"
                  >
                    {method.title}
                  </Label>

                  {method.description ? (
                    <p className="text-sm text-muted-foreground">
                      {method.description}
                    </p>
                  ) : null}

                  {method.deliveryTime ? (
                    <p className="text-sm text-muted-foreground/80 mt-1">
                      📦 {method.deliveryTime}
                    </p>
                  ) : null}
                </div>

                {/* Method price */}
                <div className="text-right">
                  <p className="font-bold text-lg">
                    {method.isFree ? (
                      <span className="text-green-600">Gratis</span>
                    ) : (
                      <Price price={method.price} />
                    )}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </RadioGroup>
    </div>
  );
};
