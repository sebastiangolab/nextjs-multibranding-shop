import { ImagePromoSection } from "../../sections/ImagePromoSection";
import ImageWithTextSection from "../../sections/ImageWithTextSection";
import ProductsListSection from "../../sections/ProductsListSection";
import SliderSection from "../../sections/SliderSection";
import TextSection from "../../sections/TextSection";
import {
  GenericSectionType,
  ImagePromoSectionProps,
  ImageWithTextSectionProps,
  ProductsListSectionProps,
  SectionData,
  SliderSectionProps,
  TextSectionProps,
} from "../../types";

interface GenericSectionsProps {
  sectionsData: SectionData[];
}

const GenericSections = async ({ sectionsData }: GenericSectionsProps) => {
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

    if (sectionData.type === GenericSectionType.SLIDER_SECTION) {
      return (
        <SliderSection
          key={`${sectionData.type}-${index}`}
          {...(sectionData.fields as SliderSectionProps)}
        />
      );
    }

    if (sectionData.type === GenericSectionType.IMAGE_PROMO_SECTION) {
      return (
        <ImagePromoSection
          key={`${sectionData.type}-${index}`}
          {...(sectionData.fields as ImagePromoSectionProps)}
        />
      );
    }
  });

  return <>{sectionsElements}</>;
};

export default GenericSections;
