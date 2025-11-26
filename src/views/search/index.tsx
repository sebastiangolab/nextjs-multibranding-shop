import React from "react";
import { notFound } from "next/navigation";
import { getSearchedProductsData } from "@features/products";
import BasicContainer from "@shared/components/BasicContainer";
import SearchViewClient from "./components/SearchViewClient";

interface SearchViewProps {
  searchParams: Promise<{ q?: string; page?: string }>;
}

const SearchView = async ({ searchParams }: SearchViewProps) => {
  const { q, page } = await searchParams;

  if (!q) {
    notFound();
  }

  const currentPage = page ? parseInt(page) : 1;

  const productsResponse = await getSearchedProductsData({
    phrase: q,
    page: currentPage,
  });

  if (!productsResponse) {
    notFound();
  }

  return (
    <BasicContainer>
      <SearchViewClient
        searchPhrase={q}
        initialProductsData={productsResponse}
        initialPage={currentPage}
      />
    </BasicContainer>
  );
};

export default SearchView;
