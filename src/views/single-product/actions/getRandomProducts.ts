"use server";

import { ProductData } from "@features/products";
import { axiosWCApi } from "@shared/lib/axios";

export const getRandomProducts = async (
  currentProductId: number,
  categoryId: number,
): Promise<ProductData[] | null> => {
  try {
    // Fetch products from the same category (limited to reasonable amount)
    const { data } = await axiosWCApi<ProductData[]>("/products", {
      params: {
        category: categoryId,
        per_page: 30,
      },
    });

    if (!data) {
      return null;
    }

    // Exclude the current product and shuffle
    const randomProducts = data
      .filter((product) => product.id !== currentProductId)
      .sort(() => 0.5 - Math.random())
      .slice(0, 10);

    return randomProducts;
  } catch (error) {
    console.error("❌ Error fetching random products data: ", error);
    return null;
  }
};
