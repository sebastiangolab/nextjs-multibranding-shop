import React from "react";
import type { Metadata } from "next";
import { generateSearchMetadata } from "@/features/seo";
import SearchView from "@views/search";

interface SearchPageProps {
  searchParams: Promise<{ q?: string; page?: string }>;
}

export async function generateMetadata({
  searchParams,
}: SearchPageProps): Promise<Metadata> {
  const { q } = await searchParams;

  return generateSearchMetadata(q);
}

const SearchPage = async ({ searchParams }: SearchPageProps) => {
  return <SearchView searchParams={searchParams} />;
};

export default SearchPage;
