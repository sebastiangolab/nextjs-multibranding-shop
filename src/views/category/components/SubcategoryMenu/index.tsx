import { LinkButton } from "@shared/components/LinkButton";
import { ProductsCategoryFullData } from "@shared/types";
import { usePathname } from "next/navigation";

interface SubcategoryMenuProps {
  categoriesData: ProductsCategoryFullData[];
}

export const SubcategoryMenu = ({ categoriesData }: SubcategoryMenuProps) => {
  const pathname = usePathname();

  return (
    <nav>
      {categoriesData.map((category) => (
        <div key={category.slug} className="space-y-1">
          <LinkButton
            href={`${pathname}/${category.slug}`}
            variant={"ghost"}
            className="w-full justify-start h-auto py-2 px-3 font-medium"
          >
            {category.name}
          </LinkButton>

          {category.subcategories?.length > 0 ? (
            <div className="ml-4 space-y-1">
              {category.subcategories?.map((subcategory) => (
                <LinkButton
                  key={subcategory.slug}
                  href={`${pathname}/${category.slug}/${subcategory.slug}`}
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start h-auto py-1 px-2 text-sm text-muted-foreground hover:text-foreground"
                  asChild
                >
                  {subcategory.name}
                </LinkButton>
              ))}
            </div>
          ) : null}
        </div>
      ))}
    </nav>
  );
};
