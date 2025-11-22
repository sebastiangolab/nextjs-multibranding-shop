import { BrandConfig } from "../types";
import themeCss from "./theme.css?raw";

export const brand1Config: BrandConfig = {
  shopName: "Brand 1 - Sebastian Shop",
  email: "seba@gmail.com",

  wooCommerceSettings: {
    deliveryZoneId: 2,
  },

  themeCss: themeCss,
};
