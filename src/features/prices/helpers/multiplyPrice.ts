import { PRICE_DIVIDER } from "../config";
import { parsePriceToNumber } from "./parsePriceToNumber";

export const multiplyPrice = (
  price: string | number,
  quantity: number
): number => {
  const priceNumber = parsePriceToNumber(price);

  // Convert price to an integer to avoid floating point issues
  const priceValue = Math.round(priceNumber * PRICE_DIVIDER);

  const multiplyPriceValue = priceValue * quantity;

  return multiplyPriceValue / PRICE_DIVIDER;
};
