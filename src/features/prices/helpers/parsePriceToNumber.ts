export function parsePriceToNumber(number: number | string): number {
  const value = typeof number === "string" ? parseFloat(number) : number;

  if (isNaN(value)) {
    throw new Error("Invalid number");
  }

  return value;
}
