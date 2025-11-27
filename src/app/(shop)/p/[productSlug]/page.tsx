import type { Metadata } from "next";
import { Footer } from "@/features/footer";
import { Header } from "@/features/header";
import {
  generateNotFoundPageMetadata,
  generateProductMetadata,
} from "@/features/seo";
import { SingleProductView } from "@views/single-product";
import { getSingleProductData } from "@views/single-product/actions/getSingleProductData";

interface SingleProductPageProps {
  params: Promise<{ productSlug?: string }>;
}

export async function generateMetadata({
  params,
}: SingleProductPageProps): Promise<Metadata> {
  const { productSlug } = await params;

  if (!productSlug) {
    return generateNotFoundPageMetadata();
  }

  const productData = await getSingleProductData(productSlug);

  if (!productData) {
    return generateNotFoundPageMetadata();
  }

  return generateProductMetadata(
    productData.name,
    productData.shortDescription,
  );
}

const SingleProductPage = async ({ params }: SingleProductPageProps) => {
  return (
    <>
      <Header />
      <SingleProductView params={params} />
      <Footer />
    </>
  );
};

export default SingleProductPage;
