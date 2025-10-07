export enum GenericSectionType {
  TEXT_SECTION = "text-section",
  IMAGE_WITH_TEXT_SECTION = "image-with-text-section",
  PRODUCTS_LIST_SECTION = "products-list-section",
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

export type ProductsListSectionProps = {
  title?: string;
  productsIds: number[];
};

export type SectionType =
  | ImageWithTextSectionProps
  | TextSectionProps
  | ProductsListSectionProps;
