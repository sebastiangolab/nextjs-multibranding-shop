import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface FavoritesStore {
  productsIds: number[];

  // Actions
  toggleFavoriteProduct: (productId: number) => void;
  clearFavorites: () => void;
}

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set) => ({
      productsIds: [],

      toggleFavoriteProduct: (productId: number) => {
        set((state) => {
          if (state.productsIds.includes(productId)) {
            return {
              productsIds: state.productsIds.filter((id) => id !== productId),
            };
          }

          return {
            productsIds: [...state.productsIds, productId],
          };
        });
      },

      clearFavorites: () => {
        set({ productsIds: [] });
      },
    }),
    {
      name: "favorites-storage", // sessionStorage key
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
