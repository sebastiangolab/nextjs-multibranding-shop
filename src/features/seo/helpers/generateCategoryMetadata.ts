import { Metadata } from "next";
import { getBrandConfig } from "@/config/brands/getBrandConfig";
import { generateMetadataBySeoData } from "./generateMetadataBySeoData";

// Generate metadata for category page
export function generateCategoryMetadata(
  categoryName: string,
  categoryDescription?: string,
): Metadata {
  const brand = getBrandConfig();

  const description =
    categoryDescription ||
    `Przeglądaj produkty z kategorii ${categoryName} w ${brand.shopName}`;

  const seoData = {
    title: `${categoryName} | ${brand.shopName}`,
    description,
  };

  return generateMetadataBySeoData(seoData);
}
