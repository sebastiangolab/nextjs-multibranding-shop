import { SingleProductView } from "@views/single-product";

interface SingleProductPageProps {
  params: Promise<{ productSlug?: string }>;
}

const SingleProductPage = async ({ params }: SingleProductPageProps) => {
  return <SingleProductView params={params} />;
};

export default SingleProductPage;
