import { ReactNode } from "react";
import { ProductData } from "@/features/products";

export enum CheckoutStep {
  CART = "cart",
  DELIVERY = "delivery",
  PAYMENT = "payment",
}

export interface DeliveryMethodData {
  id: string;
  enabled: boolean;
  title: string;
  description?: string;
  deliveryTime?: string;
  price: number;
  isFree?: boolean;
  icon?: ReactNode;
}

export interface CartTableProduct extends ProductData {
  quantity: number;
}
