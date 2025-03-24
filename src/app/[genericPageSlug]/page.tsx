import { ReactElement } from "react";
import { notFound } from "next/navigation";
import { getGenericPageDataById } from "@/actions/getPageDataById";

type GenericPageProps = {
  params: Promise<{ genericPageSlug: string }>;
};

const GenericPage = async ({
  params,
}: GenericPageProps): Promise<ReactElement<GenericPageProps>> => {
  const { genericPageSlug } = await params;
  const pageData = await getGenericPageDataById(genericPageSlug);

  if (!pageData) {
    notFound();
  }

  return <h1>{pageData.slug}</h1>;
};

export default GenericPage;
