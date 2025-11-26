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

export interface ProductBrand {
  id: number;
  name: string;
  slug: string;
}

export interface ProductCategoryData {
  id: number;
  name: string;
  slug: string;
}

export interface ProductData {
  id: number;
  name: string;
  slug: string;
  price: string;
  categories: ProductCategoryData[];
  images: ProductImage[];
  attributes: ProductAttribute[];
  sku: string;
  shortDescription: string;
  description: string;
  brands: ProductBrand[];
}