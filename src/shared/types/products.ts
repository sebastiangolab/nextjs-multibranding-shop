export interface ProductsCategoryData {
  id: number;
  count: number;
  name: string;
  slug: string;
}

export interface ProductImage {
  id: number;
  src: string;
  alt: string;
}

export interface ProductData {
  id: number;
  name: string;
  slug: string;
  price: string;
  categories: ProductsCategoryData[];
  images: ProductImage[];
}
