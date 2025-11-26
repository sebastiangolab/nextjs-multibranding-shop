import { BreadcrumbItem, BreadcrumbWithData } from "@/features/breadcrumb";

type CategoryHeaderProps = {
  title: string;
  breadcrumbCategoryItems: BreadcrumbItem[];
};

const CategoryHeader = ({
  title,
  breadcrumbCategoryItems,
}: CategoryHeaderProps) => {
  return (
    <div className="space-y-2 pb-6 border-b">
      <BreadcrumbWithData
        currentPageLabel={title}
        categoryItems={breadcrumbCategoryItems}
        isCategoryCurrentPage
      />

      <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
        {title}
      </h1>
    </div>
  );
};

export default CategoryHeader;
