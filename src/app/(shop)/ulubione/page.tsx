import React from "react";
import type { Metadata } from "next";
import FavoritesView from "@views/favorites";
import { getBrandConfig } from "@/config/brands/getBrandConfig";

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
