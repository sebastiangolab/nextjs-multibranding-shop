"use client";

import Image from "next/image";
import Link from "next/link";
import Section from "../../components/Section";
import { ImagePromoSectionProps } from "../../types";

export const ImagePromoSection = ({
  image,
  url,
  linkTitle,
  isFullWidth = false,
}: ImagePromoSectionProps) => {
  return (
    <Section isFullWidth={isFullWidth}>
      <Link
        href={url}
        prefetch={false}
        className="block relative w-full h-[230px] md:h-[300px] lg:h-[390px] overflow-hidden rounded-lg group"
        title={linkTitle}
      >
        <Image
          src={image.url}
          alt={image.alt}
          fill
          className="w-full h-auto object-cover object-center transition-transform duration-300 group-hover:scale-[1.02]"
        />
      </Link>
    </Section>
  );
};
