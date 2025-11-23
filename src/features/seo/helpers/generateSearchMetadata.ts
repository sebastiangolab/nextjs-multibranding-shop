import { getBrandConfig } from "@/config/brands/getBrandConfig";
import { Metadata } from "next";
import { generateMetadataBySeoData } from "./generateMetadataBySeoData";

/**
 * Generate metadata for search page
 */
export function generateSearchMetadata(query?: string): Metadata {
  const brand = getBrandConfig();

  let seoData = {
    title: `Wyszukiwanie - ${brand.shopName}`,
    description: `Wyszukaj produkty w ${brand.shopName}`,
    isNoIndex: true,
  };

  if (query) {
    seoData = {
      title: `Wyniki wyszukiwania: ${query} - ${brand.shopName}`,
      description: `Wyniki wyszukiwania dla frazy "${query}" w ${brand.shopName}`,
      isNoIndex: true,
    };
  }

  return generateMetadataBySeoData(seoData);
}
