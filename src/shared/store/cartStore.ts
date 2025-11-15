import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface CartProductItem {
  productId: number;
  quantity: number;
}

interface CartStore {
  items: CartProductItem[];
  quantity: number;

  // Actions
  addItemToCart: (productId: number, quantity?: number) => void;
  removeItemFromCart: (productId: number) => void;
  updateProductQuantityInCart: (productId: number, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      quantity: 0,

      addItemToCart: (productId: number, quantity: number | undefined = 1) => {
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
              quantity: state.quantity + quantity,
            };
          }

          return {
            items: [...state.items, { productId, quantity }],
            quantity: state.quantity + quantity,
          };
        });
      },

      removeItemFromCart: (productId: number) => {
        set((state) => {
          const item = state.items.find((item) => item.productId === productId);
          const quantityToRemove = item?.quantity || 0;

          return {
            items: state.items.filter((item) => item.productId !== productId),
            quantity: state.quantity - quantityToRemove,
          };
        });
      },

      updateProductQuantityInCart: (productId: number, quantity: number) => {
        if (quantity <= 0) {
          get().removeItemFromCart(productId);
          return;
        }

        set((state) => {
          const item = state.items.find((item) => item.productId === productId);
          const oldQuantity = item?.quantity || 0;
          const quantityDiff = quantity - oldQuantity;

          return {
            items: state.items.map((item) =>
              item.productId === productId ? { ...item, quantity } : item
            ),
            quantity: state.quantity + quantityDiff,
          };
        });
      },

      clearCart: () => {
        set({ items: [], quantity: 0 });
      },
    }),
    {
      name: "cart-storage", // sessionStorage key
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
