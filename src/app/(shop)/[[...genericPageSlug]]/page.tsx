import type { Metadata } from "next";
import { Footer } from "@/features/footer";
import { Header } from "@/features/header";
import {
  generateGenericPageMetadata,
  generateNotFoundPageMetadata,
} from "@/features/seo";
import GenericPageView, {
  GenericPageViewProps,
} from "@views/generic-page-view";
import { getGenericPageDataByUrl } from "@views/generic-page-view/actions/getGenericPageDataByUrl";

export async function generateMetadata({
  params,
}: GenericPageViewProps): Promise<Metadata> {
  const { genericPageSlug } = await params;
  const genericPageSlugPath = `/${genericPageSlug?.join("/") || ""}`;

  const pageData = await getGenericPageDataByUrl(genericPageSlugPath);

  if (!pageData) {
    return generateNotFoundPageMetadata();
  }

  return generateGenericPageMetadata(pageData.seo);
}

const GenericPage = async ({ params }: GenericPageViewProps) => {
  return (
    <>
      <Header />
      <GenericPageView params={params} />
      <Footer />
    </>
  );
};

export default GenericPage;
