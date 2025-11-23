import { getBrandConfig } from "@/config/brands/getBrandConfig";
import { DeliveryMethodData } from "@/features/checkout";
import { parsePriceToNumber } from "@/features/prices";
import { axiosWCApi } from "@shared/lib/axios";

interface DeliveryMethodResponseData {
  method_id: string;
  title: string;
  enabled: boolean;
  settings: {
    delivery_terms: {
      value: string;
    };
    cost_per_order: {
      value: string;
    };
    cost: {
      value: string;
    };
  };
}

export const getDeliveriesMethods = async (): Promise<
  DeliveryMethodData[] | null
> => {
  try {
    const { wooCommerceSettings } = getBrandConfig();
    const deliveryZoneId = wooCommerceSettings.deliveryZoneId;

    const { data: allMethods } = await axiosWCApi<DeliveryMethodResponseData[]>(
      `/shipping/zones/${deliveryZoneId}/methods`
    );

    if (!Array.isArray(allMethods) || allMethods.length === 0) {
      return [];
    }

    const normalizeDeliveriesMethods = allMethods.map((method) => {
      const pricePerOrder = method.settings?.cost_per_order?.value ?? "0";
      const price = method.settings?.cost?.value ?? "0";

      return {
        id: method.method_id,
        enabled: method.enabled,
        title: method.title,
        deliveryTime: method.settings?.delivery_terms?.value,
        price: parsePriceToNumber(pricePerOrder || price),
      };
    });

    return normalizeDeliveriesMethods;
  } catch (error) {
    console.error("❌ Error fetching deliveries methods data: ", error);
    return null;
  }
};
