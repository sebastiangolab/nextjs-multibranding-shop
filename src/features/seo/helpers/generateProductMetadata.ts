import { getBrandConfig } from "@/config/brands/getBrandConfig";
import { Metadata } from "next";
import { generateMetadataBySeoData } from "./generateMetadataBySeoData";

// Generate metadata for product page
export function generateProductMetadata(
  productName: string,
  description?: string
): Metadata {
  const brand = getBrandConfig();

  const seoData = {
    title: `${productName} | ${brand.shopName}`,
    description: description,
  };

  return generateMetadataBySeoData(seoData);
}
