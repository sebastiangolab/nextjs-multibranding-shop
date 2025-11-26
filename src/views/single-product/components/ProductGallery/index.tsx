"use client";

import React, { ReactElement, useMemo, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProductImage } from "@features/products";
import { Button } from "@shared/shadcn/ui/button";
import ProductGalleryLightbox from "../ProductGalleryLightbox";

interface ProductGalleryProps {
  productName: string;
  images: ProductImage[];
}

const ProductGallery = ({
  productName,
  images,
}: ProductGalleryProps): ReactElement => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const hasMultipleImages = images.length > 1;
  const hasMoreThan5Images = images.length > 5;

  const handlePrevious = () => {
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleThumbnailClick = (index: number) => {
    setSelectedIndex(index);
  };

  const handleMainImageClick = () => {
    setIsLightboxOpen(true);
  };

  const selectedImage = useMemo(
    () => images[selectedIndex],
    [images, selectedIndex],
  );

  const thumbnails = useMemo(() => images.slice(0, 5), [images]);

  const commonArrowButtonClasses =
    "absolute top-1/2 -translate-y-1/2 rounded-full shadow-lg opacity-90 hover:opacity-100";

  return (
    <>
      <div className="flex flex-col gap-4">
        {/* Main Image */}
        <div
          className="relative aspect-square w-full overflow-hidden rounded-lg bg-muted cursor-pointer border max-h-[35rem]"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={handleMainImageClick}
        >
          <Image
            src={selectedImage.src}
            alt={selectedImage.alt}
            fill
            className="object-cover"
            priority
            fetchPriority="high"
          />

          {/* Navigation Arrows - Visible on Hover */}
          {isHovered && hasMultipleImages && (
            <>
              <Button
                variant="secondary"
                size="icon"
                className={commonArrowButtonClasses + " left-4"}
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrevious();
                }}
              >
                <ChevronLeft className="size-6" />
              </Button>

              <Button
                variant="secondary"
                size="icon"
                className={commonArrowButtonClasses + " right-4"}
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
              >
                <ChevronRight className="size-6" />
              </Button>
            </>
          )}

          {/* Image Counter */}
          <div className="absolute bottom-4 right-4 bg-background/80 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
            {selectedIndex + 1} / {images.length}
          </div>
        </div>

        {/* Thumbnails */}
        <div className="grid grid-cols-5 gap-2">
          {thumbnails.map((image, index) => (
            <button
              key={index}
              onClick={() => {
                if (index === 4 && hasMoreThan5Images) {
                  handleMainImageClick();
                } else {
                  handleThumbnailClick(index);
                }
              }}
              className={`relative aspect-square overflow-hidden rounded-md border-2 transition-all ${
                index === selectedIndex
                  ? "border-primary ring-2 ring-primary/20"
                  : "border-border hover:border-primary/50"
              }`}
            >
              {index === 4 && hasMoreThan5Images ? (
                <>
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover brightness-50"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white text-2xl font-bold">
                      +{images.length - 4}
                    </span>
                  </div>
                </>
              ) : (
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                />
              )}
            </button>
          ))}
        </div>
      </div>

      <ProductGalleryLightbox
        productName={productName}
        isOpen={isLightboxOpen}
        onOpenChange={setIsLightboxOpen}
        selectedImageIndex={selectedIndex}
        images={images}
        setSelectedIndex={setSelectedIndex}
      />
    </>
  );
};

export default ProductGallery;
