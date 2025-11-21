// Global
export interface Image {
  id: number;
  url: string;
  alt: string;
  width: number;
  height: number;
}

// Products Category shared types
export interface ProductsCategoryFullData {
  id: number;
  count: number;
  name: string;
  slug: string;
  parent: number;
  subcategories: ProductsCategoryFullData[];
}

export interface ProductsCategoryResponseData
  extends Omit<ProductsCategoryFullData, "subcategories"> {
  subcategories: number[];
}

// Menu shared types
export interface MenuResponseItem {
  id: number;
  title: string;
  url: string;
  parent: string;
  order: number;
}

export interface MenuResponseData {
  id: number;
  name: string;
  count: number;
  items: MenuResponseItem[];
}

export interface MenuItem extends MenuResponseItem {
  childrens?: MenuItem[];
}

export interface MenuData extends Omit<MenuResponseData, "items"> {
  items: MenuItem[];
}

// Cart shared types
export interface CartProductItem {
  productId: number;
  quantity: number;
}
