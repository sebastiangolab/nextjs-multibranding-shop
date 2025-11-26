import type { Metadata } from "next";
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
  return <SingleProductView params={params} />;
};

export default SingleProductPage;
