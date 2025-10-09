import { ProductsList } from "@features/products";
import { ProductsListSectionProps } from "../../../types/sections";
import Section from "../../Section";

const ProductsListSection = async ({
  title,
  productsIds,
}: ProductsListSectionProps) => {
  return (
    <Section>
      <h2 className="text-2xl md:text-3xl font-semibold mb-6">{title}</h2>

      <ProductsList productsIds={productsIds} />
    </Section>
  );
};

export default ProductsListSection;
