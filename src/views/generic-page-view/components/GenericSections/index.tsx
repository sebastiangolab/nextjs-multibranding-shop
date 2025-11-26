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
  return (
    <>
      {sectionsData.map((sectionData, index) => {
        const key = `${sectionData.type}-${index}`;

        switch (sectionData.type) {
          case GenericSectionType.IMAGE_WITH_TEXT_SECTION:
            return (
              <ImageWithTextSection
                key={key}
                {...(sectionData.fields as ImageWithTextSectionProps)}
              />
            );

          case GenericSectionType.TEXT_SECTION:
            return (
              <TextSection
                key={key}
                {...(sectionData.fields as TextSectionProps)}
              />
            );

          case GenericSectionType.PRODUCTS_LIST_SECTION:
            return (
              <ProductsListSection
                key={key}
                {...(sectionData.fields as ProductsListSectionProps)}
              />
            );

          case GenericSectionType.SLIDER_SECTION:
            return (
              <SliderSection
                key={key}
                {...(sectionData.fields as SliderSectionProps)}
              />
            );

          case GenericSectionType.IMAGE_PROMO_SECTION:
            return (
              <ImagePromoSection
                key={key}
                {...(sectionData.fields as ImagePromoSectionProps)}
              />
            );

          default:
            console.warn(`Unknown section type: ${sectionData.type}`);
            return null;
        }
      })}
    </>
  );
};

export default GenericSections;
