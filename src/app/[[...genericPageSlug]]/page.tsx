import { ReactElement } from "react";
import { notFound } from "next/navigation";
import { getGenericPageDataByUrl } from "@/actions/getGenericPageDataByUrl";
import { getGenericSectionsData } from "@/actions/getGenericSectionsData";

type GenericPageProps = {
  params: Promise<{ genericPageSlug?: string[] }>;
};

const GenericPage = async ({
  params,
}: GenericPageProps): Promise<ReactElement<GenericPageProps>> => {
  const { genericPageSlug } = await params;

  const genericPageSlugPath = `/${genericPageSlug?.join("/") || ""}`;

  const pageData = await getGenericPageDataByUrl(genericPageSlugPath);

  if (!pageData) {
    notFound();
  }

  const sectionsData = await getGenericSectionsData(pageData.acf.sections);

  console.log("sectionsData", sectionsData);

  return <h1>Generic page</h1>;
};

export default GenericPage;
