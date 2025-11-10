// ===============================
// Products Feature Exports
// ===============================

// Components ----------------------------------------------

export { default as ProductsGrid } from "./components/ProductsGrid";
export { default as ProductsGridSkeleton } from "./components/ProductsGridSkeleton";
export { default as ProductsCarousel } from "./components/ProductsCarousel";

// Helpers -------------------------------------------------

export { normalizeProductsCategoryData } from "./helpers/normalizeProductsCategoryData";

// Actions -------------------------------------------------

export { getProductsData } from "./actions/getProductsData";
export { getProductsCategoryData } from "./actions/getProductsCategoryData";

// Types ---------------------------------------------------

export type { ProductCategoryData } from "./types/index";
export type { ProductData } from "./types/index";
export type { ProductImage } from "./types/index";
