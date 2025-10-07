import { ReactElement } from "react";
import { SectionData } from "../../types";
import {
  GenericSectionType,
  ImageWithTextSectionProps,
  ProductsListSectionProps,
  TextSectionProps,
} from "../../types/sections";
import ImageWithTextSection from "../sections/ImageWithTextSection";
import ProductsListSection from "../sections/ProductsListSection";
import TextSection from "../sections/TextSection";

export type GenericSectionsProps = {
  sectionsData: SectionData[];
};

const GenericSections = async ({
  sectionsData,
}: GenericSectionsProps): Promise<ReactElement<GenericSectionsProps>> => {
  const sectionsElements = sectionsData.map((sectionData, index) => {
    if (sectionData.type === GenericSectionType.IMAGE_WITH_TEXT_SECTION) {
      return (
        <ImageWithTextSection
          key={`${sectionData.type}-${index}`}
          {...(sectionData.fields as ImageWithTextSectionProps)}
        />
      );
    }

    if (sectionData.type === GenericSectionType.TEXT_SECTION) {
      return (
        <TextSection
          key={`${sectionData.type}-${index}`}
          {...(sectionData.fields as TextSectionProps)}
        />
      );
    }

    if (sectionData.type === GenericSectionType.PRODUCTS_LIST_SECTION) {
      return (
        <ProductsListSection
          key={`${sectionData.type}-${index}`}
          {...(sectionData.fields as ProductsListSectionProps)}
        />
      );
    }
  });

  return <>{sectionsElements}</>;
};

export default GenericSections;
