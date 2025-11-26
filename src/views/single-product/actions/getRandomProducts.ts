import { ProductData } from "@features/products";
import { axiosWCApi } from "@shared/lib/axios";

export const getRandomProducts = async (
  currentProductId: number,
  categoryId: number,
): Promise<ProductData[] | null> => {
  try {
    // Fetch first 100 products from the same category
    const { data } = await axiosWCApi<ProductData[]>("/products", {
      params: {
        category: categoryId,
        perPage: 100,
      },
    });

    if (!data) {
      return null;
    }

    // Exclude the current product from the results
    const productsWithoutCurrent = data.filter(
      (product) => product.id !== currentProductId,
    );

    // Shuffle and select 10 random products
    const randomProducts = productsWithoutCurrent
      .sort(() => 0.5 - Math.random())
      .slice(0, 10);

    return randomProducts;
  } catch (error) {
    console.error("❌ Error fetching random products data: ", error);
    return null;
  }
};
