"use server";

import { axiosWCApi } from "@shared/lib/axios";
import { ProductsCategoryResponseData } from "@shared/types";

/**
 * Centralized function to fetch all product categories with caching
 * This prevents multiple API calls across different parts of the app
 */
export const getAllProductsCategories = async (): Promise<
  ProductsCategoryResponseData[]
> => {
  const { data } = await axiosWCApi<ProductsCategoryResponseData[]>(
    `/products/categories`,
    {
      params: {
        per_page: 100,
      },
      next: {
        revalidate: 3600, // 1 hour cache
      },
    } as any,
  );

  return data || [];
};
