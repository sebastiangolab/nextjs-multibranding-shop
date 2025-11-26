import { getSearchedProductsData, ProductsGrid } from "@features/products";
import Section from "../../components/Section";
import { ProductsListSectionProps } from "../../types";
import SectionTitleH2 from "../../components/SectionTitleH2";

const ProductsListSection = async ({
  title,
  products,
}: ProductsListSectionProps) => {
  const productsResponse = await getSearchedProductsData({
    includeIds: products,
  });

  return (
    <Section>
      <SectionTitleH2>{title}</SectionTitleH2>

      <ProductsGrid products={productsResponse?.products} isSectionVariant />
    </Section>
  );
};

export default ProductsListSection;
