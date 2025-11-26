import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { DeliveryFormData } from "../schemas/deliveryFormSchema";
import { DeliveryMethodData } from "../types";

interface CheckoutTerms {
  storeRegulation: boolean;
  privacyPolicy: boolean;
  marketing: boolean;
}

interface CheckoutStore {
  summaryProductsPrice: number;
  deliveryFormData: DeliveryFormData | null;
  deliveryMethodData: DeliveryMethodData | null;
  termsAccepted: CheckoutTerms;

  // Actions
  updateSummaryProductsPrice: (updatedPrice: number) => void;
  updateDeliveryFormData: (data: DeliveryFormData) => void;
  updateDeliveryMethodData: (data: DeliveryMethodData) => void;
  updateTermsAccepted: (terms: Partial<CheckoutTerms>) => void;
  resetCheckout: () => void;
}

export const useCheckoutStore = create<CheckoutStore>()(
  persist(
    (set) => ({
      summaryProductsPrice: 0,
      deliveryFormData: null,
      deliveryMethodData: null,
      termsAccepted: {
        storeRegulation: false,
        privacyPolicy: false,
        marketing: false,
      },

      updateSummaryProductsPrice: (updatedPrice: number) => {
        set({ summaryProductsPrice: updatedPrice });
      },

      updateDeliveryFormData: (data: DeliveryFormData) => {
        set(() => ({
          deliveryFormData: data,
        }));
      },

      updateDeliveryMethodData: (data: DeliveryMethodData) => {
        set(() => ({
          deliveryMethodData: data,
        }));
      },

      updateTermsAccepted: (terms: Partial<CheckoutTerms>) => {
        set((state) => ({
          termsAccepted: {
            ...state.termsAccepted,
            ...terms,
          },
        }));
      },

      resetCheckout: () => {
        set({
          summaryProductsPrice: 0,
          deliveryFormData: null,
          deliveryMethodData: null,
          termsAccepted: {
            storeRegulation: false,
            privacyPolicy: false,
            marketing: false,
          },
        });
      },
    }),
    {
      name: "checkout-storage", // sessionStorage key
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
