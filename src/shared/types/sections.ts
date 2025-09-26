export enum GenericSectionType {
  TEXT_SECTION = "text-section",
  IMAGE_WITH_TEXT_SECTION = "image-with-text-section",
}

export type ImageWithTextSectionProps = {
  title?: string;
  text: string;
  image: number;
};

export type TextSectionProps = {
  title?: string;
  text: string;
};

export type SectionType = ImageWithTextSectionProps | TextSectionProps;

export type SectionData = {
  type: string;
  fields: SectionType;
};
