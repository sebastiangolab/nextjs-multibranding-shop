"use client";

import { ProductData, ProductsCategoryData } from "@features/products";
import { Separator } from "@shared/shadcn/ui/separator";
import { useProductsFilters } from "../../hooks/useProductsFilters";
import { AttributeFilters } from "../AttributeFilters";
import CategoryHeader from "../CategoryHeader";
import { PriceFilter } from "../PriceFilter";
import { SubcategoryMenu } from "../SubcategoryMenu";

type CategoryViewClientProps = {
  categoryData: ProductsCategoryData;
  productsData: ProductData[];
};

const CategoryViewClient = ({
  categoryData,
  productsData,
}: CategoryViewClientProps) => {
  const {
    priceFilterData,
    attributesFiltersData,
    selectedFiltersValues,
    hasSelectedFilters,
    setPriceFilterValues,
    changeActiveAttribute,
    getIsCheckedAttributeOption,
    clearAllFiltersValues,
  } = useProductsFilters(productsData);

  const asideContentElement = (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold text-foreground mb-4">Kategorie</h3>

        <SubcategoryMenu categoriesData={categoryData.subcategories} />
      </div>

      <Separator />

      <div className="space-y-6">
        <h3 className="font-semibold text-foreground">Filtry</h3>

        {priceFilterData ? (
          <PriceFilter
            maxPrice={priceFilterData.maxPrice}
            setPriceFilterValues={setPriceFilterValues}
          />
        ) : null}

        {attributesFiltersData.length > 0 ? (
          <AttributeFilters
            attributes={attributesFiltersData}
            changeActiveAttribute={changeActiveAttribute}
            getIsCheckedAttributeOption={getIsCheckedAttributeOption}
          />
        ) : null}
      </div>
    </div>
  );

  return (
    <>
      <CategoryHeader title={categoryData?.name} />

      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[30%_70%] gap-8">
          <aside className="lg:sticky lg:top-8 lg:self-start">
            {asideContentElement}
          </aside>

          <main>{/* <CategoryContent /> */}</main>
        </div>
      </div>
    </>
  );
};

export default CategoryViewClient;
