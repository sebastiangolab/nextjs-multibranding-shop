"use client";

import Image from "next/image";
import { LinkButton } from "@shared/components/LinkButton";
import MarkdownText from "@shared/components/MarkdownText";
import { Badge } from "@shared/shadcn/ui/badge";
import Section from "../../components/Section";
import SectionTitleH2 from "../../components/SectionTitleH2";
import { ImageWithTextSectionProps } from "../../types";

const ContentWithImageSection = ({
  label,
  title,
  text,
  image,
  isImageLeft = false,
  primaryButton,
  secondaryButton,
}: ImageWithTextSectionProps) => {
  return (
    <Section>
      <div className="grid gap-8 lg:gap-16 items-center lg:grid-cols-2">
        {/* Content block */}
        <div
          className={`flex flex-col gap-4 ${isImageLeft ? "lg:order-2" : "lg:order-1"}`}
        >
          {label && (
            <Badge variant="secondary" className="w-fit">
              {label}
            </Badge>
          )}

          <div>
            <SectionTitleH2>{title}</SectionTitleH2>

            <MarkdownText>{text}</MarkdownText>
          </div>

          {primaryButton || secondaryButton ? (
            <div className="flex flex-wrap gap-4 mt-2">
              {primaryButton ? (
                <LinkButton variant="default" href={primaryButton.href}>
                  {primaryButton.text}
                </LinkButton>
              ) : null}

              {secondaryButton ? (
                <LinkButton variant="outline" href={secondaryButton.href}>
                  {secondaryButton.text}
                </LinkButton>
              ) : null}
            </div>
          ) : null}
        </div>

        {/* Image block */}
        <div
          className={`relative w-full aspect-4/3 rounded-lg overflow-hidden ${isImageLeft ? "lg:order-1" : "lg:order-2"}`}
        >
          <Image
            src={image.url}
            alt={image.alt}
            className="object-cover"
            fill
          />
        </div>
      </div>
    </Section>
  );
};

export default ContentWithImageSection;
