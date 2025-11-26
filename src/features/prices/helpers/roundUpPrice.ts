import { parsePriceToNumber } from "./parsePriceToNumber";

export function roundUpPrice(
  price: number | string,
  decimals: number = 2,
): number {
  const priceNumber = parsePriceToNumber(price);

  const factor = 10 ** decimals;
  return Math.ceil(priceNumber * factor) / factor;
}
