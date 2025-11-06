import React from "react";
import { SubcategoryMenu } from "../SubcategoryMenu";
import { Separator } from "@shared/shadcn/ui/separator";
import { PriceFilter } from "../PriceFilter";
import { AttributeFilters } from "../AttributeFilters";
import { ProductsCategoryData } from "@features/products";
import { ProductsFiltersElementData } from "../../types";
import { ClearFiltersButton } from "../ClearFiltersButton";

interface CategorySidebarProps {
  subcategories: ProductsCategoryData[];
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

  return (
    <div className="space-y-6">
      <h3 className="font-semibold text-foreground mb-4">Podkategorie</h3>

      <SubcategoryMenu categoriesData={subcategories} />

      <Separator />

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
