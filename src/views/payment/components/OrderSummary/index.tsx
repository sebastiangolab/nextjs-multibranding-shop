"use client";

import { Edit, Loader, ShoppingBag } from "lucide-react";
import { useCartProducts, useCheckoutStore } from "@/features/checkout";
import { Price } from "@/features/prices";
import { LinkButton } from "@/shared/components/LinkButton";
import { SummaryOrderProductsList } from "./SummaryOrderProductsList";

export const OrderSummary = () => {
  const { deliveryFormData, deliveryMethodData } = useCheckoutStore();
  const { productsWithQuantity, isProductsLoading } = useCartProducts();

  const isLoadingSummaryData =
    isProductsLoading ||
    !Array.isArray(productsWithQuantity) ||
    productsWithQuantity.length === 0 ||
    !deliveryFormData ||
    !deliveryMethodData;

  return (
    <div className="bg-card rounded-lg border p-6">
      <h3 className="text-lg font-semibold mb-4">Podsumowanie zamówienia</h3>

      <div className="space-y-4">
        {/* Products list */}
        {isLoadingSummaryData ? (
          <Loader className="w-6 h-6 animate-spin" />
        ) : null}

        {!isLoadingSummaryData ? (
          <>
            <div className="pb-4 border-b">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-sm text-foreground/80 flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4" />
                  Produkty ({productsWithQuantity.length})
                </h4>

                <LinkButton variant="ghost" size="sm" href="/koszyk">
                  <Edit className="w-3 h-3 mr-1" />
                  Edytuj
                </LinkButton>
              </div>

              <SummaryOrderProductsList products={productsWithQuantity} />
            </div>

            {/* Personal data */}
            <div className="pb-4 border-b">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-sm text-foreground/80">
                  Dane kontaktowe
                </h4>

                <LinkButton variant="ghost" size="sm" href="/dostawa">
                  <Edit className="w-3 h-3 mr-1" />
                  Edytuj
                </LinkButton>
              </div>

              <div className="text-sm text-muted-foreground space-y-1">
                <p className="font-medium text-foreground">
                  {deliveryFormData.firstName} {deliveryFormData.lastName}
                </p>

                <p>{deliveryFormData.email}</p>

                <p>{deliveryFormData.phone}</p>
              </div>
            </div>

            {/* Delivery address */}
            <div className="pb-4 border-b">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-sm text-foreground/80">
                  Adres dostawy
                </h4>

                <LinkButton variant="ghost" size="sm" href="/dostawa">
                  <Edit className="w-3 h-3 mr-1" />
                  Edytuj
                </LinkButton>
              </div>

              <div className="text-sm text-muted-foreground">
                <p>
                  {deliveryFormData.street} {deliveryFormData.houseNumber}
                  {deliveryFormData.apartmentNumber &&
                    `/${deliveryFormData.apartmentNumber}`}
                </p>

                <p>
                  {deliveryFormData.postalCode} {deliveryFormData.city}
                </p>

                <p className="capitalize">{deliveryFormData.voivodeship}</p>
              </div>
            </div>

            {/* Billing address */}
            {deliveryFormData.isDifferentBillingAddress ? (
              <div className="pb-4 border-b">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-sm text-foreground/80">
                    Adres rozliczeniowy
                  </h4>

                  <LinkButton variant="ghost" size="sm" href="/dostawa">
                    <Edit className="w-3 h-3 mr-1" />
                    Edytuj
                  </LinkButton>
                </div>

                <div className="text-sm text-muted-foreground">
                  <p>
                    {deliveryFormData.billingStreet}{" "}
                    {deliveryFormData.billingHouseNumber}
                    {deliveryFormData.billingApartmentNumber &&
                      `/${deliveryFormData.billingApartmentNumber}`}
                  </p>

                  <p>
                    {deliveryFormData.billingPostalCode}{" "}
                    {deliveryFormData.billingCity}
                  </p>

                  <p className="capitalize">
                    {deliveryFormData.billingVoivodeship}
                  </p>
                </div>
              </div>
            ) : null}

            {/* Delivery method */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-sm text-foreground/80">
                  Metoda dostawy
                </h4>

                <LinkButton variant="ghost" size="sm" href="/dostawa">
                  <Edit className="w-3 h-3 mr-1" />
                  Edytuj
                </LinkButton>
              </div>

              <div className="text-sm">
                <p className="font-medium text-foreground">
                  {deliveryMethodData.title}
                </p>

                <p className="text-muted-foreground">
                  {deliveryMethodData.price === 0 ? (
                    <span className="text-green-600">Gratis</span>
                  ) : (
                    <Price price={deliveryMethodData.price} />
                  )}{" "}
                  • {deliveryMethodData.deliveryTime}
                </p>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};
