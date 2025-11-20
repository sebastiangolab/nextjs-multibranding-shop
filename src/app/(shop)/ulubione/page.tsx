import React from "react";
import type { Metadata } from "next";
import FavoritesView from "@views/favorites";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Ulubione`,
    description: `Twoje ulubione produkty`,
  };
}

const FavoritesPage = () => {
  return <FavoritesView />;
};

export default FavoritesPage;
