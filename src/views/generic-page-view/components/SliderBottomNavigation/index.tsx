import { Button } from "@shared/shadcn/ui/button";
import { CarouselApi } from "@shared/shadcn/ui/carousel";
import { Slide } from "../../types";
import { Pause, Play } from "lucide-react";
import React, { Dispatch, MutableRefObject, SetStateAction } from "react";

interface SliderBottomNavigationProps {
  carouselApi: CarouselApi;
  activeSlide: number;
  slides: Slide[];
  isPlaying: boolean;
  setIsPlaying: Dispatch<SetStateAction<boolean>>;
  navButtonsRef: MutableRefObject<(HTMLButtonElement | null)[]>;
  navContainerRef: MutableRefObject<HTMLDivElement | null>;
}

const SliderBottomNavigation = ({
  carouselApi,
  activeSlide,
  slides,
  isPlaying,
  setIsPlaying,
  navButtonsRef,
  navContainerRef,
}: SliderBottomNavigationProps) => {
  return (
    <div className="absolute bottom-4 left-0 right-0 z-10 flex justify-center px-2">
      <div className="inline-flex items-center gap-2 px-3 py-2 bg-background/80 backdrop-blur-sm rounded-lg max-w-full">
        {/* Slide Navigation Tabs - Scrollable */}
        <div
          ref={navContainerRef}
          className="flex items-center gap-1 overflow-x-auto max-w-[calc(100vw-8rem)] scroll-smooth snap-x snap-mandatory scrollbar-hide"
        >
          {slides.map((slide, index) => (
            <Button
              key={slide.label}
              ref={(element) => {
                navButtonsRef.current[index] = element;
              }}
              variant={activeSlide === index ? "default" : "ghost"}
              size="sm"
              onClick={() => carouselApi?.scrollTo(index)}
              className="whitespace-nowrap h-7 px-2 text-xs snap-start shrink-0"
            >
              {slide.label}
            </Button>
          ))}
        </div>

        {/* Play/Pause Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsPlaying((prev) => !prev)}
          className="shrink-0 h-7 w-7 p-0"
        >
          {isPlaying ? (
            <Pause className="w-3 h-3" />
          ) : (
            <Play className="w-3 h-3" />
          )}
        </Button>
      </div>
    </div>
  );
};

export default SliderBottomNavigation;
