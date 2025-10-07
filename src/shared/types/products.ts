export type ProductsCategoryData = {
  id: number;
  count: number;
  name: string;
  slug: string;
};

export type ProductImage = {
  id: number;
  src: string;
  alt: string;
};

export type ProductData = {
  id: number;
  name: string;
  slug: string;
  price: string;
  categories: ProductsCategoryData[];
  images: ProductImage[];
};
