import { ReactElement } from "react";
import { GenericSections, GenericSectionsProps } from "@genericSections";

type GenericPageProps = GenericSectionsProps;

const GenericPage = async ({
  params,
}: GenericPageProps): Promise<ReactElement<GenericPageProps>> => {
  return <GenericSections params={params} />;
};

export default GenericPage;
