import { ReactElement } from "react";
import { notFound } from "next/navigation";
import { getGenericPageDataByUrl } from "@/actions/getGenericPageDataByUrl";
import { getGenericSectionsData } from "@/actions/getGenericSectionsData";
import Sections from "@/components/Sections";

type GenericPageProps = {
  params: Promise<{ genericPageSlug?: string[] }>;
};

const ignoredPrefixes = ["/_next", "/.well-known"];
const ignoredExtensions = [".json", ".js", ".css"];

const GenericPage = async ({
  params,
}: GenericPageProps): Promise<ReactElement<GenericPageProps>> => {
  const { genericPageSlug } = await params;

  const genericPageSlugPath = `/${genericPageSlug?.join("/") || ""}`;

  if (
    ignoredPrefixes.some((prefix) => genericPageSlugPath.startsWith(prefix)) ||
    ignoredExtensions.some((ext) => genericPageSlugPath.endsWith(ext))
  ) {
    return <></>;
  }

  const pageData = await getGenericPageDataByUrl(genericPageSlugPath);

  if (!pageData) {
    notFound();
  }

  const sectionsData = await getGenericSectionsData(pageData.acf.sections);

  if (!sectionsData) {
    return <></>;
  }

  return <Sections sectionsData={sectionsData} />;
};

export default GenericPage;
