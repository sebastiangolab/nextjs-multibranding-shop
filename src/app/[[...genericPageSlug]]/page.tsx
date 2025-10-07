import { ReactElement } from "react";
import GenericPageView, {
  GenericPageViewProps,
} from "@views/generic-page-view";

type GenericPageProps = GenericPageViewProps;

const GenericPage = async ({
  params,
}: GenericPageProps): Promise<ReactElement<GenericPageProps>> => {
  return <GenericPageView params={params} />;
};

export default GenericPage;
