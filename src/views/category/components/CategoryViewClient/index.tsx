"use client";

import { ProductData, getProductsData } from "@features/products";
import { useProductsFilters } from "../../hooks/useProductsFilters";
import CategoryHeader from "../CategoryHeader";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { CategoryContent } from "../CategoryContent";
import { CategorySidebar } from "../CategorySidebar";
import { MobileFiltersSheet } from "../MobileFiltersSheet";
import { MobileSubcategoriesSheet } from "../MobileSubcategoriesSheet";
import { LoadingOverlay } from "@shared/components/LoadingOverlay";
import { convertAttributesDataToParams } from "@views/category/helpers/convertAttributesDataToParams";
import { ProductsCategoryFullData } from "@shared/types";
import { BreadcrumbItem } from "@/shared/hooks/useBreadcrumb";

type CategoryViewClientProps = {
  categoryData: ProductsCategoryFullData;
  allProductsData: ProductData[];
  breadcrumbCategoryItems: BreadcrumbItem[];
};

const CategoryViewClient = ({
  categoryData,
  allProductsData,
  breadcrumbCategoryItems,
}: CategoryViewClientProps) => {
  const [paginationPage, setPaginationPage] = useState<number>(1);

  const [isMobileFilterSheetOpen, setIsMobileFilterSheetOpen] =
    useState<boolean>(false);
  const [isMobileSubcategoriesSheetOpen, setIsMobileSubcategoriesSheetOpen] =
    useState<boolean>(false);

  const {
    priceFilterData,
    attributesFiltersData,
    selectedFiltersValues,
    hasSelectedFilters,
    setPriceFilterValues,
    changeActiveAttribute,
    checkIsActiveAttributeOption,
    clearAllFiltersValues,
  } = useProductsFilters(allProductsData);

  const { data, isLoading, isFetching, isSuccess, isPlaceholderData } =
    useQuery({
      queryKey: [
        "category-products",
        categoryData.id,
        selectedFiltersValues,
        paginationPage,
      ],
      queryFn: async () =>
        await getProductsData({
          categoryId: categoryData.id,
          page: paginationPage,
          min_price: selectedFiltersValues.minPrice,
          max_price: selectedFiltersValues.maxPrice,
          attributes:
            selectedFiltersValues.attributes.length > 0
              ? convertAttributesDataToParams(selectedFiltersValues.attributes)
              : undefined,
        }),
      placeholderData: keepPreviousData,
    });

  const paginationTotalPages = data?.totalPages || 1;
  const totalProducts = data?.totalProducts || 0;

  useEffect(() => {
    if (hasSelectedFilters && paginationPage !== 1) {
      setPaginationPage(1);
    }
  }, [selectedFiltersValues]);

  const sharedProductsFiltersData = {
    hasSelectedFilters,
    clearAllFiltersValues,
    priceFilterData,
    setPriceFilterValues,
    attributesFiltersData,
    changeActiveAttribute,
    checkIsActiveAttributeOption,
  };

  const isSubcategoriesAvailable =
    categoryData.subcategories && categoryData.subcategories.length > 0;

  return (
    <>
      {isFetching && isPlaceholderData && <LoadingOverlay />}

      {/* Mobile Filters Sheet */}
      <MobileFiltersSheet
        isMobileFilterSheetOpen={isMobileFilterSheetOpen}
        setIsMobileFilterSheetOpen={setIsMobileFilterSheetOpen}
        productsFiltersData={sharedProductsFiltersData}
        totalProducts={totalProducts}
      />

      {/* Mobile Subcategories Sheet */}
      {isSubcategoriesAvailable ? (
        <MobileSubcategoriesSheet
          isMobileSubcategoriesSheetOpen={isMobileSubcategoriesSheetOpen}
          setIsMobileSubcategoriesSheetOpen={setIsMobileSubcategoriesSheetOpen}
          subcategories={categoryData.subcategories}
        />
      ) : null}

      <CategoryHeader
        title={categoryData?.name}
        breadcrumbCategoryItems={breadcrumbCategoryItems}
      />

      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 md:grid-cols-[30%_70%] lg:grid-cols-[20%_80%] gap-10">
          {/* Desktop Sidebar */}
          <aside className="hidden md:block md:sticky md:top-8 md:self-start">
            <CategorySidebar
              subcategories={categoryData.subcategories}
              productsFiltersData={sharedProductsFiltersData}
            />
          </aside>

          <main>
            <CategoryContent
              paginationTotalPages={paginationTotalPages}
              paginationPage={paginationPage}
              setPaginationPage={setPaginationPage}
              isLoading={isLoading}
              isSuccess={isSuccess}
              products={data?.products ?? []}
              setIsMobileFilterSheetOpen={setIsMobileFilterSheetOpen}
              setIsMobileSubcategoriesSheetOpen={
                setIsMobileSubcategoriesSheetOpen
              }
            />
          </main>
        </div>
      </div>
    </>
  );
};

export default CategoryViewClient;
