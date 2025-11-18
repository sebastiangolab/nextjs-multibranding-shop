import React from "react";
import SearchView from "@views/search";

interface SearchPageProps {
  searchParams: Promise<{ q?: string; page?: string }>;
}

const SearchPage = async ({ searchParams }: SearchPageProps) => {
  return <SearchView searchParams={searchParams} />;
};

export default SearchPage;
