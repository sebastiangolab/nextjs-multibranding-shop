import { ProductData } from "@/features/products";

export interface CartTableProduct extends ProductData {
  quantity: number;
}
