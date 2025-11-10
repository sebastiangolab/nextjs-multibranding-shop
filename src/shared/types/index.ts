export interface CartProductItem {
  productId: number;
  quantity: number;
}

// Products Category shared Types ---------------------------------
export interface ProductsCategoryFullData {
  id: number;
  count: number;
  name: string;
  slug: string;
  parent: string;
  subcategories: ProductsCategoryFullData[];
}

export interface ProductsCategoryResponseData
  extends Omit<ProductsCategoryFullData, "subcategories"> {
  subcategories: number[];
}
