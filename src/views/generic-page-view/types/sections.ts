export enum GenericSectionType {
  TEXT_SECTION = "text-section",
  IMAGE_WITH_TEXT_SECTION = "image-with-text-section",
  PRODUCTS_LIST_SECTION = "products-list-section",
}

export interface ImageWithTextSectionProps {
  title?: string;
  text: string;
  image: number;
}

export interface TextSectionProps {
  title?: string;
  text: string;
}

export interface ProductsListSectionProps {
  title?: string;
  productsIds: number[];
}

export type SectionType =
  | ImageWithTextSectionProps
  | TextSectionProps
  | ProductsListSectionProps;
