import { Metadata } from "next";
import { PageSeoData } from "../types";
import { generateMetadataBySeoData } from "./generateMetadataBySeoData";

// Generate metadata for generic page
export function generateGenericPageMetadata(seoData: PageSeoData): Metadata {
  const pageSeoData = {
    title: seoData.title,
    description: seoData.description,
  };

  return generateMetadataBySeoData(pageSeoData);
}
