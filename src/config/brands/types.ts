export interface BrandConfig {
  shopName: string;
  email: string;

  wooCommerceSettings: {
    deliveryZoneId: number;
  };

  // Theme shadcn configuration
  themeCss: string;
}
