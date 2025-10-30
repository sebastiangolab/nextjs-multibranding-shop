import BreadcrumbWithData from "@shared/components/BreadcrumbWithData";

type CategoryHeaderProps = {
  title: string;
};

const CategoryHeader = ({ title }: CategoryHeaderProps) => {
  return (
    <div className="space-y-2 pb-6 border-b">
      <BreadcrumbWithData currentPageLabel={title} />

      <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
        {title}
      </h1>
    </div>
  );
};

export default CategoryHeader;
