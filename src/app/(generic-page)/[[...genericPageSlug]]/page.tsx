import GenericPageView, {
  GenericPageViewProps,
} from "@views/generic-page-view";

const GenericPage = async ({ params }: GenericPageViewProps) => {
  return <GenericPageView params={params} />;
};

export default GenericPage;
