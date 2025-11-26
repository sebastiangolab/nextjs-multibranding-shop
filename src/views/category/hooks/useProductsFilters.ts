import { useMemo, useState } from "react";
import { ProductData } from "@features/products";
import { getAttributeFilters } from "../helpers/getAttributeFilters";
import { getPriceFilter } from "../helpers/getPriceFilter";
import { Attribute, ProductsFiltersHookResults } from "../types";

export function useProductsFilters(
  products: ProductData[],
): ProductsFiltersHookResults {
  const [minPriceValue, setMinPriceValue] = useState<number | null>(null);
  const [maxPriceValue, setMaxPriceValue] = useState<number | null>(null);
  const [activeAttributes, setActiveAttributes] = useState<Attribute[]>([]);

  const hasSelectedFilters =
    minPriceValue !== null ||
    maxPriceValue !== null ||
    activeAttributes.length > 0;

  const priceFilterData = useMemo(
    () => (products.length > 0 ? getPriceFilter(products) : null),
    [products],
  );

  const attributesFiltersData = useMemo(
    () => getAttributeFilters(products),
    [products],
  );

  const setPriceFilterValues = (min: number | null, max: number | null) => {
    setMinPriceValue(min);
    setMaxPriceValue(max);
  };

  const changeActiveAttribute = (
    attributeId: string,
    attributeSlug: string,
    option: string,
    isChecked: boolean,
  ) => {
    const otherAttributes = activeAttributes.filter(
      (activeAttribute) => activeAttribute.attributeId !== attributeId,
    );

    const currentAttribute = activeAttributes.find(
      (activeAttribute) => activeAttribute.attributeId === attributeId,
    );

    const currentOptions = currentAttribute?.activeOptions ?? [];

    const updatedOptions = isChecked
      ? [...currentOptions, option]
      : currentOptions.filter((currentOption) => currentOption !== option);

    if (updatedOptions.length === 0) {
      setActiveAttributes(otherAttributes);
      return;
    }

    setActiveAttributes([
      ...otherAttributes,
      { attributeId, attributeSlug, activeOptions: updatedOptions },
    ]);
  };

  const checkIsActiveAttributeOption = (
    attributeId: string,
    option: string,
  ): boolean => {
    return (
      activeAttributes
        .find((activeAttribute) => activeAttribute.attributeId === attributeId)
        ?.activeOptions.includes(option) ?? false
    );
  };

  const clearAllFiltersValues = () => {
    setMinPriceValue(null);
    setMaxPriceValue(null);
    setActiveAttributes([]);
  };

  return {
    priceFilterData,
    attributesFiltersData,
    selectedFiltersValues: {
      minPrice: minPriceValue,
      maxPrice: maxPriceValue,
      attributes: activeAttributes,
    },
    hasSelectedFilters,
    setPriceFilterValues,
    changeActiveAttribute,
    checkIsActiveAttributeOption,
    clearAllFiltersValues,
  };
}
