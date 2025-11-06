import {
  ProductData,
  ProductsGrid,
  ProductsGridSkeleton,
} from "@features/products";
import { ProductsPagination } from "../ProductsPagination";
import { Button } from "@shared/shadcn/ui/button";
import { Filter, Menu } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

interface CategoryContentProps {
  paginationTotalPages: number;
  paginationPage: number;
  setPaginationPage: (page: number) => void;
  isLoading: boolean;
  isSuccess: boolean;
  products: ProductData[];
  setIsMobileFilterSheetOpen: Dispatch<SetStateAction<boolean>>;
  setIsMobileSubcategoriesSheetOpen: Dispatch<SetStateAction<boolean>>;
}

export const CategoryContent = ({
  paginationTotalPages,
  paginationPage,
  setPaginationPage,
  isLoading,
  isSuccess,
  products,
  setIsMobileFilterSheetOpen,
  setIsMobileSubcategoriesSheetOpen,
}: CategoryContentProps) => {
  return (
    <>
      <div className="flex items-center justify-between gap-4 mb-8">
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="lg"
            className="md:hidden"
            onClick={() => setIsMobileFilterSheetOpen((prev) => !prev)}
          >
            <Filter className="h-4 w-4" />
            Filtry
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="md:hidden"
            onClick={() => setIsMobileSubcategoriesSheetOpen((prev) => !prev)}
          >
            <Menu className="h-4 w-4" />
            Podkategorie
          </Button>
        </div>

        {paginationTotalPages > 1 ? (
          <ProductsPagination
            currentPage={paginationPage}
            totalPages={paginationTotalPages}
            setPaginationPage={setPaginationPage}
          />
        ) : null}
      </div>

      {isLoading ? <ProductsGridSkeleton /> : null}

      {isSuccess ? <ProductsGrid products={products} /> : null}
    </>
  );
};
