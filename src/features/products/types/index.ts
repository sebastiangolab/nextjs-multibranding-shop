export interface ProductsCategoryData {
  id: number;
  count: number;
  name: string;
  slug: string;
  parent: string;
  subcategories: ProductsCategoryData[];
}

export interface ProductsCategoryResponseData
  extends Omit<ProductsCategoryData, "subcategories"> {
  subcategories: number[];
}

export interface ProductImage {
  id: number;
  src: string;
  alt: string;
}

export interface ProductAttribute {
  id: number;
  name: string;
  slug: string;
  options: string[];
}

export interface ProductData {
  id: number;
  name: string;
  slug: string;
  price: string;
  categories: ProductsCategoryData[];
  images: ProductImage[];
  attributes: ProductAttribute[];
}
