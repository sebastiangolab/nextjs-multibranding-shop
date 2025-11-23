import { Metadata } from "next";
import { generateMetadataBySeoData } from "./generateMetadataBySeoData";

// Generate metadata for 404 Not Found page
export function generateNotFoundPageMetadata(): Metadata {
  const pageSeoData = {
    title: "Strona nie znaleziona",
    description: "Nie znaleziono strony",
    isNoIndex: true,
    isNoFollow: true,
  };

  return generateMetadataBySeoData(pageSeoData);
}
