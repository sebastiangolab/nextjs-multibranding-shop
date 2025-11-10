import { ProductImage } from "@features/products/types";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@shared/shadcn/ui/carousel";
import { Dialog, DialogContent, DialogTitle } from "@shared/shadcn/ui/dialog";
import React, { ReactElement, useEffect, useState } from "react";
import Image from "next/image";

interface ProductGalleryLightboxProps {
  productName: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedImageIndex: number;
  setSelectedIndex: (index: number) => void;
  images: ProductImage[];
}

const ProductGalleryLightbox = ({
  productName,
  isOpen,
  onOpenChange,
  selectedImageIndex,
  setSelectedIndex,
  images,
}: ProductGalleryLightboxProps): ReactElement => {
  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    if (!api) return;

    api.on("select", () => setSelectedIndex(api.selectedScrollSnap()));
  }, [api, setSelectedIndex]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-auto w-auto">
        <DialogTitle>{productName}</DialogTitle>

        <Carousel
          setApi={setApi}
          opts={{
            startIndex: selectedImageIndex,
            loop: true,
          }}
        >
          <CarouselContent>
            {images.map((image, index) => (
              <CarouselItem
                key={index}
                className="flex items-center justify-center"
              >
                <Image src={image.src} alt={image.alt} fill />
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="left-4" />
          <CarouselNext className="right-4" />
        </Carousel>

        {/* Image Counter in Lightbox */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-background/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm z-10">
          {selectedImageIndex + 1} / {images.length}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductGalleryLightbox;
