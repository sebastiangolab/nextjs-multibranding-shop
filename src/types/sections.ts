export enum GenericSectionType {
  SECTION_TEXT = "section-text",
  SECTION_IMAGE_WITH_TEXT = "section-image-with-text",
}

export type SectionWithTextAndImageType = {
  title?: string;
  text: string;
  image: number;
};

export type SectionWithTextType = {
  title?: string;
  text: string;
};

export type SectionType = SectionWithTextAndImageType | SectionWithTextType;

export type SectionData = {
  type: string;
  fields: SectionType;
};
