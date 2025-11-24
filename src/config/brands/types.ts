export interface BrandConfig {
  shopName: string;
  availableThemeToggle: boolean;

  contact: {
    email: string;
    phone: string;
  };

  wooCommerceSettings: {
    deliveryZoneId: number;
  };

  // Theme shadcn configuration
  themeCss: string;
}
