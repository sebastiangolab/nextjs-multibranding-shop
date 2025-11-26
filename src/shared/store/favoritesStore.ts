import { toast } from "sonner";
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
          const isFavorite = state.productsIds.includes(productId);

          if (isFavorite) {
            toast.info("Usunięto z ulubionych");

            return {
              productsIds: state.productsIds.filter((id) => id !== productId),
            };
          }

          toast.success("Dodano do ulubionych");

          return {
            productsIds: [...state.productsIds, productId],
          };
        });
      },

      clearFavorites: () => {
        toast.success("Usunięto wszystkie produkty z ulubionych");

        set({ productsIds: [] });
      },
    }),
    {
      name: "favorites-storage", // localStorage key
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
