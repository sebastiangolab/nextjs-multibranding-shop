import { create } from "zustand";
import { ProductData } from "@features/products/types";

interface AddToCartModalStore {
  isOpen: boolean;
  product: ProductData | null;
  quantity: number;

  // Actions
  openModal: (product: ProductData, quantity?: number) => void;
  closeModal: () => void;
}

export const useAddToCartModalStore = create<AddToCartModalStore>((set) => ({
  isOpen: false,
  product: null,
  quantity: 1,

  openModal: (product: ProductData, quantity: number = 1) => {
    set({ isOpen: true, product, quantity });
  },

  closeModal: () => {
    set({ isOpen: false, product: null, quantity: 1 });
  },
}));
