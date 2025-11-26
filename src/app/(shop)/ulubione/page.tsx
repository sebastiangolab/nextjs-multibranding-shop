import React from "react";
import type { Metadata } from "next";
import { getBrandConfig } from "@/config/brands/getBrandConfig";
import FavoritesView from "@views/favorites";

export async function generateMetadata(): Promise<Metadata> {
  const brand = getBrandConfig();

  return {
    title: `Ulubione | ${brand.shopName}`,
    description: `Twoje ulubione produkty`,
  };
}

const FavoritesPage = () => {
  return <FavoritesView />;
};

export default FavoritesPage;
