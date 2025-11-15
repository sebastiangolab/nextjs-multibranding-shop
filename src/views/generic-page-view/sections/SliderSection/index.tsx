"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@shared/shadcn/ui/carousel";
import Section from "../../components/Section";
import { SliderSectionProps } from "../../types";
import Link from "next/link";
import SliderBottomNavigation from "../../components/SliderBottomNavigation";
import SliderArrows from "../../components/SliderArrows";

const AUTOPLAY_DELAY = 5000;

const SliderSection = ({ slides }: SliderSectionProps) => {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const navButtonsRef = useRef<(HTMLButtonElement | null)[]>([]);

  // Update active slide on carousel change
  useEffect(() => {
    if (!carouselApi) return;

    const onSelect = () => {
      setActiveSlide(carouselApi.selectedScrollSnap());
    };

    carouselApi.on("select", onSelect);

    return () => {
      carouselApi.off("select", onSelect);
    };
  }, [carouselApi]);

  // Scroll to active slider navigation button
  useEffect(() => {
    const activeButton = navButtonsRef.current[activeSlide];

    if (activeButton) {
      activeButton.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [activeSlide]);

  // Autoplay functionality
  useEffect(() => {
    if (!carouselApi || !isPlaying) return;

    // Autoplay interval
    const interval = setInterval(() => {
      if (carouselApi.canScrollNext()) {
        carouselApi.scrollNext();
        return;
      }

      carouselApi.scrollTo(0);
    }, AUTOPLAY_DELAY);

    return () => clearInterval(interval);
  }, [carouselApi, isPlaying]);

  return (
    <Section isFullWidth>
      <Carousel
        setApi={setCarouselApi}
        className="relative"
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent>
          {slides.map((slide) => (
            <CarouselItem key={slide.label}>
              <Link
                href={slide.url}
                title={slide.label}
                className="block relative h-[300px] md:h-[380px] lg:h-[450px] w-full overflow-hidden"
              >
                <Image
                  src={slide.image.url}
                  alt={slide.image.alt || slide.label}
                  fill
                  className="object-cover object-center"
                />
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>

        <SliderArrows carouselApi={carouselApi} />

        <SliderBottomNavigation
          carouselApi={carouselApi}
          activeSlide={activeSlide}
          slides={slides}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          navButtonsRef={navButtonsRef}
        />
      </Carousel>
    </Section>
  );
};

export default SliderSection;
