import { PRICE_DIVIDER } from "../config";
import { parsePriceToNumber } from "./parsePriceToNumber";

export const addPrices = (
  price: string | number,
  secondPrice: string | number
): number => {
  const priceNumber = parsePriceToNumber(price);
  const secondPriceNumber = parsePriceToNumber(secondPrice);

  // Convert price to an integer to avoid floating point issues
  const priceValue = Math.round(priceNumber * PRICE_DIVIDER);
  const secondPriceValue = Math.round(secondPriceNumber * PRICE_DIVIDER);

  const sumPrice = priceValue + secondPriceValue;

  return sumPrice / PRICE_DIVIDER;
};
