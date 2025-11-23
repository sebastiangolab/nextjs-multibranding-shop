import React from "react";
import SearchView from "@views/search";
import type { Metadata } from "next";
import { generateSearchMetadata } from "@/features/seo";

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
