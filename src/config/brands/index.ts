import { BrandConfig } from "./types";
import { brand1Config } from "./brand1/config";
import { brand2Config } from "./brand2/config";

/**
 * Helper to get the current brand configuration
 * Works in Server Components, Client Components, and Server Actions
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

/**
 * Returns the complete CSS string for the current brand
 * Includes light and dark themes
 * Used in layout.tsx for inline <style> injection in <head>
 */
export function generateThemeCSS(): string {
  const brand = getBrandConfig();
  return brand.themeCss;
}
