import React from "react";
import { Separator } from "@shared/shadcn/ui/separator";
import { ProductsCategoryFullData } from "@shared/types";
import { ProductsFiltersElementData } from "../../types";
import { AttributeFilters } from "../AttributeFilters";
import { ClearFiltersButton } from "../ClearFiltersButton";
import { PriceFilter } from "../PriceFilter";
import { SubcategoryMenu } from "../SubcategoryMenu";

interface CategorySidebarProps {
  subcategories: ProductsCategoryFullData[];
  productsFiltersData: ProductsFiltersElementData;
}

export const CategorySidebar = ({
  subcategories,
  productsFiltersData,
}: CategorySidebarProps) => {
  const {
    hasSelectedFilters,
    clearAllFiltersValues,
    priceFilterData,
    setPriceFilterValues,
    attributesFiltersData,
    changeActiveAttribute,
    checkIsActiveAttributeOption,
  } = productsFiltersData;

  const isSubcategoriesAvailable = subcategories && subcategories.length > 0;

  return (
    <div className="space-y-6">
      {isSubcategoriesAvailable ? (
        <>
          <h3 className="font-semibold text-foreground mb-4">Podkategorie</h3>

          <SubcategoryMenu categoriesData={subcategories} />

          <Separator />
        </>
      ) : null}

      <div className="space-y-6">
        <h3 className="font-semibold text-foreground">Filtry</h3>

        {hasSelectedFilters ? (
          <ClearFiltersButton clearAllFiltersValues={clearAllFiltersValues} />
        ) : null}

        {priceFilterData ? (
          <PriceFilter
            maxPrice={priceFilterData.maxPrice}
            setPriceFilterValues={setPriceFilterValues}
            hasSelectedFilters={hasSelectedFilters}
          />
        ) : null}

        {attributesFiltersData.length > 0 ? (
          <AttributeFilters
            attributes={attributesFiltersData}
            changeActiveAttribute={changeActiveAttribute}
            checkIsActiveAttributeOption={checkIsActiveAttributeOption}
          />
        ) : null}
      </div>
    </div>
  );
};
