import { useMemo, useState } from "react";
import { ProductData } from "@features/products";
import { Attribute, AttributeFilterData, PriceFilterData } from "../types";
import { getPriceFilter } from "../helpers/getPriceFilter";
import { getAttributeFilters } from "../helpers/getAttributeFilters";

interface ProductsFiltersHookResults {
  priceFilterData: PriceFilterData | null;
  attributesFiltersData: AttributeFilterData[];
  selectedFiltersValues: {
    minPrice: number | null;
    maxPrice: number | null;
    attributes: Attribute[];
  };
  hasSelectedFilters: boolean;
  setPriceFilterValues: (min: number | null, max: number | null) => void;
  changeActiveAttribute: (
    attributeId: string,
    option: string,
    isChecked: boolean
  ) => void;
  getIsCheckedAttributeOption: (attributeId: string, option: string) => boolean;
  clearAllFiltersValues: () => void;
}

export function useProductsFilters(
  products: ProductData[]
): ProductsFiltersHookResults {
  const [minPriceValue, setMinPriceValue] = useState<number | null>(null);
  const [maxPriceValue, setMaxPriceValue] = useState<number | null>(null);
  const [activeAttributes, setActiveAttributes] = useState<Attribute[]>([]);

  const hasSelectedFilters =
    minPriceValue !== null ||
    maxPriceValue !== null ||
    activeAttributes.length > 0;

  const setPriceFilterValues = (min: number | null, max: number | null) => {
    setMinPriceValue(min);
    setMaxPriceValue(max);
  };

  const changeActiveAttribute = (
    attributeId: string,
    option: string,
    isChecked: boolean
  ) => {
    const otherAttributes = activeAttributes.filter(
      (activeAttribute) => activeAttribute.attributeId !== attributeId
    );

    const currentAttribute = activeAttributes.find(
      (activeAttribute) => activeAttribute.attributeId === attributeId
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
      { attributeId, activeOptions: updatedOptions },
    ]);
  };

  const getIsCheckedAttributeOption = (
    attributeId: string,
    option: string
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

  const priceFilterData =
    products.length > 0
      ? useMemo(() => getPriceFilter(products), [products])
      : null;

  const attributesFiltersData = useMemo(
    () => getAttributeFilters(products),
    [products]
  );

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
    getIsCheckedAttributeOption,
    clearAllFiltersValues,
  };
}
