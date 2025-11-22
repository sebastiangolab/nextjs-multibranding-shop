export interface BrandConfig {
  shopName: string;
  email: string;
  availableThemeToggle: boolean;

  wooCommerceSettings: {
    deliveryZoneId: number;
  };

  // Theme shadcn configuration
  themeCss: string;
}
