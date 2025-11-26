import { Package, Store, Truck } from "lucide-react";
import { DeliveryMethodData } from "@/features/checkout";

enum DeliveryMethodId {
  STORE_PICKUP = "store_pickup",
  INPOST_PARCEL_MACHINES = "easypack_parcel_machines",
}

export const getExtendedDeliveryMethod = (
  deliveryMethodData: DeliveryMethodData,
): DeliveryMethodData => {
  const iconClasses = "w-6 h-6";

  if (deliveryMethodData.id === DeliveryMethodId.STORE_PICKUP) {
    return {
      ...deliveryMethodData,
      description: "Odbiór w wybranym punkcie sprzedaży",
      icon: <Store className={iconClasses} />,
      isFree: true,
    };
  }

  if (deliveryMethodData.id === DeliveryMethodId.INPOST_PARCEL_MACHINES) {
    return {
      ...deliveryMethodData,
      description: "Odbiór w wybranym paczkomacie",
      icon: <Package className={iconClasses} />,
    };
  }

  return {
    ...deliveryMethodData,
    description: "Dostawa pod wskazany adres",
    icon: <Truck className={iconClasses} />,
  };
};
