import { Metadata } from "next";
import { PageSeoData } from "../types";
import { truncateText } from "./truncateText";
import { stripHtml } from "./stripHtml";

// Google recommends: title 50-60 chars, description 150-160 chars
export function generateMetadataBySeoData(seoData: PageSeoData): Metadata {
  let description = seoData.description;

  // Clean and truncate description if it exists
  if (description) {
    const cleanDescription = stripHtml(description);

    description = truncateText(cleanDescription, 155);
  }

  const metadata: Metadata = {
    title: seoData.title,
    description,
    robots: {
      index: seoData.isNoIndex ? false : true,
      follow: seoData.isNoFollow ? false : true,
    },
  };

  return metadata;
}
