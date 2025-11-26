import React from "react";
import { ProductData } from "@features/products";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@shared/shadcn/ui/carousel";
import ProductCard from "../ProductCard";

interface ProductsCarouselProps {
  products?: ProductData[] | null;
}

const ProductsCarousel = ({ products }: ProductsCarouselProps) => {
  if (!products || products.length === 0) {
    return <p>Brak produktów</p>;
  }

  return (
    <Carousel
      opts={{
        align: "start",
        loop: false,
      }}
      className="w-full"
    >
      <CarouselContent className="-ml-6">
        {products.map((product) => (
          <CarouselItem
            key={product.id}
            className="pl-6 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/4"
          >
            <ProductCard key={`product-${product.id}`} data={product} />
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious className="left-0" />
      <CarouselNext className="right-0" />
    </Carousel>
  );
};

export default ProductsCarousel;
