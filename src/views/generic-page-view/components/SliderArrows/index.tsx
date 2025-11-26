import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@shared/shadcn/ui/button";
import { CarouselApi } from "@shared/shadcn/ui/carousel";

interface SliderArrowsProps {
  carouselApi: CarouselApi;
}

const commonArrowButtonClasses =
  "absolute top-1/2 -translate-y-1/2 z-10 w-8 h-8 md:w-9 md:h-9 bg-background/80 backdrop-blur-sm hover:bg-background";

const commonArrowButtonIconClasses = "w-4 h-4 md:w-5 md:h-5";

const SliderArrows = ({ carouselApi }: SliderArrowsProps) => {
  return (
    <>
      {/* Prev arrow */}
      <Button
        variant="outline"
        size="icon"
        onClick={() => carouselApi?.scrollPrev()}
        className={`${commonArrowButtonClasses} left-2 md:left-4`}
      >
        <ChevronLeft className={commonArrowButtonIconClasses} />
      </Button>

      {/* Next arrow */}
      <Button
        variant="outline"
        size="icon"
        onClick={() => carouselApi?.scrollNext()}
        className={`${commonArrowButtonClasses} right-2 md:right-4`}
      >
        <ChevronRight className={commonArrowButtonIconClasses} />
      </Button>
    </>
  );
};

export default SliderArrows;
