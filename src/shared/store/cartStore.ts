import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { CartProductItem } from "../types";

interface CartStore {
  items: CartProductItem[];

  // Actions
  addItem: (productId: number, quantity?: number) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  hasItem: (productId: number) => boolean;
  getItemQuantity: (productId: number) => number;
  getTotalItemsQuantity: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (productId: number, quantity: number | undefined = 1) => {
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.productId === productId
          );

          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.productId === productId
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            };
          }

          return {
            items: [...state.items, { productId, quantity }],
          };
        });
      },

      removeItem: (productId: number) => {
        set((state) => ({
          items: state.items.filter((item) => item.productId !== productId),
        }));
      },

      updateQuantity: (productId: number, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }

        set((state) => ({
          items: state.items.map((item) =>
            item.productId === productId ? { ...item, quantity } : item
          ),
        }));
      },

      clearCart: () => {
        set({ items: [] });
      },

      hasItem: (productId: number) => {
        return get().items.some((item) => item.productId === productId);
      },

      getItemQuantity: (productId: number) => {
        const item = get().items.find((item) => item.productId === productId);
        return item?.quantity || 0;
      },

      getTotalItemsQuantity: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      },
    }),
    {
      name: "cart-storage", // sessionStorage key
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
