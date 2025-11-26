import React, { Dispatch, SetStateAction } from "react";
import { BottomSheet } from "@shared/components/BottomSheet";
import { Button } from "@shared/shadcn/ui/button";
import { ProductsFiltersElementData } from "../../types";
import { AttributeFilters } from "../AttributeFilters";
import { ClearFiltersButton } from "../ClearFiltersButton";
import { PriceFilter } from "../PriceFilter";

interface MobileFiltersSheetProps {
  isMobileFilterSheetOpen: boolean;
  setIsMobileFilterSheetOpen: Dispatch<SetStateAction<boolean>>;
  productsFiltersData: ProductsFiltersElementData;
  totalProducts: number;
}

export const MobileFiltersSheet = ({
  isMobileFilterSheetOpen,
  setIsMobileFilterSheetOpen,
  productsFiltersData,
  totalProducts,
}: MobileFiltersSheetProps) => {
  const {
    hasSelectedFilters,
    clearAllFiltersValues,
    priceFilterData,
    setPriceFilterValues,
    attributesFiltersData,
    changeActiveAttribute,
    checkIsActiveAttributeOption,
  } = productsFiltersData;

  const buttonsElement = (
    <>
      <Button
        className="flex-1"
        size="lg"
        onClick={() => setIsMobileFilterSheetOpen(false)}
      >
        Pokaż wyniki ({totalProducts})
      </Button>

      <Button
        variant="outline"
        className="flex-1"
        size="lg"
        onClick={() => setIsMobileFilterSheetOpen(false)}
      >
        Anuluj
      </Button>
    </>
  );

  return (
    <BottomSheet
      title="Filtry"
      isOpen={isMobileFilterSheetOpen}
      onOpenChange={setIsMobileFilterSheetOpen}
      bottomContent={buttonsElement}
    >
      {hasSelectedFilters ? (
        <div className="mb-6">
          <ClearFiltersButton clearAllFiltersValues={clearAllFiltersValues} />
        </div>
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
    </BottomSheet>
  );
};
