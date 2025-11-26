import {
  GenericSectionType,
  ImagePromoSectionProps,
  ImagePromoSectionResponseData,
  ImageWithTextSectionProps,
  ImageWithTextSectionResponseData,
  SectionProps,
  SectionResponseData,
  Slide,
  SliderSectionProps,
  SliderSectionResponseData,
} from "../types";

export const normalizeImagePromoSectionData = (
  data: ImagePromoSectionResponseData,
): ImagePromoSectionProps => {
  return {
    image: data.image,
    url: data.url,
    linkTitle: data.link_title,
    isFullWidth: data.is_full_width,
  };
};

export const normalizeSliderSectionData = (
  data: SliderSectionResponseData,
): SliderSectionProps => {
  const slides = [data.slide_1, data.slide_2, data.slide_3, data.slide_4];

  const filteredSlides: Slide[] = slides
    .map((slide) => {
      if (!slide?.image || !slide?.label || !slide?.url) {
        return null;
      }

      return {
        image: slide.image,
        label: slide.label!,
        url: slide.url!,
      };
    })
    .filter((slide) => slide !== null);

  return {
    slides: filteredSlides,
  };
};

export const normalizeImageWithTextSectionData = (
  data: ImageWithTextSectionResponseData,
): ImageWithTextSectionProps => {
  const { button_text_1, button_text_2, button_url_1, button_url_2 } = data;

  const primaryButton =
    button_text_1 && button_url_1
      ? {
          text: button_text_1,
          href: button_url_1,
        }
      : undefined;

  const secondaryButton =
    button_text_2 && button_url_2
      ? {
          text: button_text_2,
          href: button_url_2,
        }
      : undefined;

  return {
    label: data.label,
    title: data.title,
    text: data.text,
    image: data.image,
    isImageLeft: data.is_image_left,
    primaryButton: primaryButton,
    secondaryButton: secondaryButton,
  };
};

export const normalizeSectionData = (
  sectionType: GenericSectionType,
  data: SectionResponseData,
): SectionProps => {
  if (sectionType === GenericSectionType.IMAGE_PROMO_SECTION) {
    return normalizeImagePromoSectionData(
      data as ImagePromoSectionResponseData,
    );
  }

  if (sectionType === GenericSectionType.SLIDER_SECTION) {
    return normalizeSliderSectionData(data as SliderSectionResponseData);
  }

  if (sectionType === GenericSectionType.IMAGE_WITH_TEXT_SECTION) {
    return normalizeImageWithTextSectionData(
      data as ImageWithTextSectionResponseData,
    );
  }

  return data as SectionProps;
};
