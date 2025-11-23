import { ProductData } from "@features/products";
import { PriceFilterData } from "../types";
import { parsePriceToNumber } from "@/features/prices";

export const getPriceFilter = (products: ProductData[]): PriceFilterData => {
  const prices = products.map((product) => parsePriceToNumber(product.price));
  const maxPrice = prices.length > 0 ? Math.max(...prices) : 0;

  return {
    name: "Cena",
    maxPrice,
  };
};
