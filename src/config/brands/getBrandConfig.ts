import { BrandConfig } from "./types";
import { brand1Config } from "./brand1/config";
import { brand2Config } from "./brand2/config";

/**
 * Helper to get the current brand configuration
 * Safe to use in Client Components
 */
export function getBrandConfig(): BrandConfig {
  const brandId = process.env.NEXT_PUBLIC_BRAND;

  switch (brandId) {
    case "brand1":
      return brand1Config;
    case "brand2":
      return brand2Config;
    default:
      return brand1Config;
  }
}
