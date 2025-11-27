import React from "react";
import type { Metadata } from "next";
import { Footer } from "@/features/footer";
import { Header } from "@/features/header";
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
  return (
    <>
      <Header />
      <SearchView searchParams={searchParams} />
      <Footer />
    </>
  );
};

export default SearchPage;
