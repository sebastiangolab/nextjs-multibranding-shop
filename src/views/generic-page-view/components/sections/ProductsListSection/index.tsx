import { ReactElement } from "react";
import { getProductsData } from "@shared/actions/getProductsData";
import ProductsList from "@shared/components/ProductsList";
import { ProductsListSectionProps } from "../../../types/sections";

const ProductsListSection = async ({
  title,
  productsIds,
}: ProductsListSectionProps): Promise<
  ReactElement<ProductsListSectionProps>
> => {
  const productsData = await getProductsData({
    ids: productsIds,
  });

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl md:text-3xl font-semibold mb-6">{title}</h2>

      <ProductsList products={productsData} />
    </section>
  );
};

export default ProductsListSection;
