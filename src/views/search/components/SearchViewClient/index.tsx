"use client";

import {
  ProductData,
  ProductsGrid,
  ProductsGridSkeleton,
  getSearchedProductsData,
} from "@features/products";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useState } from "react";
import { LoadingOverlay } from "@shared/components/LoadingOverlay";
import { useRouter } from "next/navigation";
import { CustomPagination } from "@shared/components/Pagination";

interface SearchViewClientProps {
  searchPhrase: string;
  initialProductsData: {
    products: ProductData[];
    totalPages: number;
    totalProducts: number;
  };
  initialPage: number;
}

const SearchViewClient = ({
  searchPhrase,
  initialProductsData,
  initialPage,
}: SearchViewClientProps) => {
  const router = useRouter();
  const [paginationPage, setPaginationPage] = useState<number>(initialPage);

  const { data, isFetching, isSuccess, isPlaceholderData } = useQuery({
    queryKey: ["search-products", searchPhrase, paginationPage],
    queryFn: async () =>
      await getSearchedProductsData({
        phrase: searchPhrase,
        page: paginationPage,
      }),
    placeholderData: keepPreviousData,
    initialData:
      paginationPage === initialPage ? initialProductsData : undefined,
  });

  const handlePageChange = (newPage: number) => {
    setPaginationPage(newPage);

    router.push(
      `/search?q=${encodeURIComponent(searchPhrase)}&page=${newPage}`,
      {
        scroll: true,
      }
    );
  };

  const products = data?.products || [];
  const paginationTotalPages = data?.totalPages || 1;
  const totalProducts = data?.totalProducts || 0;

  return (
    <>
      {isFetching && isPlaceholderData && <LoadingOverlay />}

      {/* Search Header */}
      <div className="flex items-end justify-between mb-6">
        <div>
          <h1 className="text-3xl font-medium">
            Wyniki wyszukiwania dla frazy: {searchPhrase}
          </h1>

          <p className="text-muted-foreground mt-2">
            Znaleziono {totalProducts}{" "}
            {totalProducts === 1 ? "produkt" : "produktów"}
          </p>
        </div>

        <div className="flex-1">
          {paginationTotalPages > 1 ? (
            <CustomPagination
              currentPage={paginationPage}
              totalPages={paginationTotalPages}
              setPaginationPage={handlePageChange}
            />
          ) : null}
        </div>
      </div>

      {/* Grid z produktami */}
      {!isSuccess ? <ProductsGridSkeleton /> : null}

      {isSuccess && products.length === 0 ? (
        <p className="text-muted-foreground text-lg text-center py-12">
          Nie znaleziono produktów spełniających kryteria wyszukiwania
        </p>
      ) : null}

      {isSuccess && products.length > 0 ? (
        <ProductsGrid products={products} isSectionVariant />
      ) : null}

      {/* Dolna paginacja */}
      {paginationTotalPages > 1 ? (
        <div className="mt-8 flex justify-end">
          <CustomPagination
            currentPage={paginationPage}
            totalPages={paginationTotalPages}
            setPaginationPage={handlePageChange}
          />
        </div>
      ) : null}
    </>
  );
};

export default SearchViewClient;
