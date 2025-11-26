"use server";

import { unstable_cache } from "next/cache";
import { axiosWCApi } from "@shared/lib/axios";
import { ProductsCategoryResponseData } from "@shared/types";

/**
 * Centralized function to fetch all product categories with caching
 * This prevents multiple API calls across different parts of the app
 */
const fetchAllCategories = async (): Promise<
  ProductsCategoryResponseData[]
> => {
  const { data } = await axiosWCApi<ProductsCategoryResponseData[]>(
    `/products/categories`,
    {
      params: {
        per_page: 100,
      },
    },
  );

  return data || [];
};

export const getAllProductsCategories = unstable_cache(
  fetchAllCategories,
  ["all-products-categories"],
  {
    revalidate: 3600, // Cache na 1 godzinę
    tags: ["products-categories"],
  },
);
