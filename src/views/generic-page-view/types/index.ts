import { Image } from "@shared/types";

// Generic Section Types
export enum GenericSectionType {
  TEXT_SECTION = "text-section",
  IMAGE_WITH_TEXT_SECTION = "image-with-text-section",
  PRODUCTS_LIST_SECTION = "products-list-section",
  IMAGE_PROMO_SECTION = "image-promo-section",
  SLIDER_SECTION = "slider-section",
}

// Image With Text Section
export interface ImageWithTextSectionProps {
  label?: string;
  title?: string;
  text: string;
  image: Image;
  isImageLeft?: boolean;
  primaryButton?: {
    text: string;
    href: string;
  };
  secondaryButton?: {
    text: string;
    href: string;
  };
}

export interface ImageWithTextSectionResponseData
  extends Pick<
    ImageWithTextSectionProps,
    "label" | "title" | "text" | "image"
  > {
  is_image_left?: boolean;
  button_text_1?: string;
  button_url_1?: string;
  button_text_2?: string;
  button_url_2?: string;
}

// Text Section
export interface TextSectionProps {
  title?: string;
  text: string;
}

// Products List Section
export interface ProductsListSectionProps {
  title?: string;
  productsIds: number[];
}

// Image Promo Section
export interface ImagePromoSectionProps {
  image: Image;
  url: string;
  linkTitle?: string;
  isFullWidth?: boolean;
}

export interface ImagePromoSectionResponseData
  extends Pick<ImagePromoSectionProps, "image" | "url"> {
  link_title?: string;
  is_full_width?: boolean;
}

// Slider Section
export interface Slide {
  image: Image;
  label: string;
  url: string;
}

export interface SliderSectionProps {
  slides: Slide[];
}

interface SlideResponse {
  image?: Image;
  label?: string;
  url?: string;
}

export interface SliderSectionResponseData {
  slide_1?: SlideResponse;
  slide_2?: SlideResponse;
  slide_3?: SlideResponse;
  slide_4?: SlideResponse;
}

// Common Types
export type SectionProps =
  | ImageWithTextSectionProps
  | TextSectionProps
  | ProductsListSectionProps
  | ImagePromoSectionProps
  | SliderSectionProps;

export type SectionResponseData =
  | ImageWithTextSectionResponseData
  | TextSectionProps
  | ProductsListSectionProps
  | ImagePromoSectionResponseData
  | SliderSectionResponseData;

export interface SectionData {
  type: string;
  fields: SectionProps;
}
