import { ReactElement } from "react";
import ImageWithTextSection from "@/sections/ImageWithTextSection";
import TextSection from "@/sections/TextSection";
import {
  GenericSectionType,
  ImageWithTextSectionProps,
  SectionData,
  TextSectionProps,
} from "@/types/sections";

type SectionsProps = { sectionsData: SectionData[] };

const Sections = ({
  sectionsData,
}: SectionsProps): ReactElement<SectionsProps> => {
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
  });

  return <>{sectionsElements}</>;
};

export default Sections;
