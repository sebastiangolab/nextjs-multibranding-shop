import { ReactElement } from "react";
import {
  GenericSectionType,
  ImageWithTextSectionProps,
  SectionData,
  TextSectionProps,
} from "@shared/types/sections";
import ImageWithTextSection from "@shared/ui/sections/ImageWithTextSection";
import TextSection from "@shared/ui/sections/TextSection";

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
