import { useCallback, useMemo, useState } from "react";
import { ProductData } from "@features/products/types";

export enum FilterType {
  ATTRIBUTE = "attribute",
  PRICE = "price",
}

interface FilterBase {
  type: FilterType;
  name: string;
}

export interface AttributeFilterData extends FilterBase {
  id: string;
  type: FilterType.ATTRIBUTE;
  slug: string;
  options: string[];
}

export interface PriceFilterData extends FilterBase {
  type: FilterType.PRICE;
}

export type FilterData = AttributeFilterData | PriceFilterData;

interface Attribute {
  id: string;
  values: string[];
}

export interface ProductsFiltersHookResults {
  filtersElementsData: FilterData[];
  selectedFiltersValues: {
    minPrice: number | null;
    maxPrice: number | null;
    attributes: Attribute[];
  };
  hasSelectedFilters: boolean;
  setPriceFilterValues: (min: number | null, max: number | null) => void;
  setActiveAttributes: (attributes: Attribute[]) => void;
  clearAllFiltersValues: () => void;
}

const getAttributeFilters = (
  products: ProductData[]
): AttributeFilterData[] => {
  const attributes = products.flatMap((product) => product.attributes || []);

  const attributesFilters: AttributeFilterData[] = attributes.reduce(
    (prevAttributes, currentAttribute) => {
      let existingAttribute = prevAttributes.find(
        (filter) => filter.id.toString() === currentAttribute.id.toString()
      );

      if (existingAttribute) {
        existingAttribute.options.push(...currentAttribute.options);
        existingAttribute.options = [...new Set(existingAttribute.options)]; // Remove duplicates

        const attributesWithoutExisting = prevAttributes.filter(
          (attr) => attr.id !== existingAttribute.id
        );

        return [...attributesWithoutExisting, existingAttribute];
      }

      const normalizeAttribute: AttributeFilterData = {
        id: currentAttribute.id.toString(),
        type: FilterType.ATTRIBUTE,
        name: currentAttribute.name,
        slug: currentAttribute.slug,
        options: currentAttribute.options,
      };

      return [...prevAttributes, normalizeAttribute];
    },
    [] as AttributeFilterData[]
  );

  return attributesFilters;
};

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

  console.log("minPriceValue:", minPriceValue);
  console.log("maxPriceValue:", maxPriceValue);
  console.log("hasSelectedFilters:", hasSelectedFilters);

  const setPriceFilterValues = (min: number | null, max: number | null) => {
    setMinPriceValue(min);
    setMaxPriceValue(max);
  };

  const clearAllFiltersValues = () => {
    setMinPriceValue(null);
    setMaxPriceValue(null);
    setActiveAttributes([]);
  };

  const filtersElementsData = useMemo(() => {
    const filtersElements = [] as FilterData[];

    if (products.length === 0) {
      return filtersElements;
    }

    // Price filter
    filtersElements.push({
      type: FilterType.PRICE,
      name: "Cena",
    });

    // Attributes filters
    const attributesFilters = getAttributeFilters(products);

    filtersElements.push(...attributesFilters);

    return filtersElements;
  }, [products]);

  return {
    filtersElementsData,
    selectedFiltersValues: {
      minPrice: minPriceValue,
      maxPrice: maxPriceValue,
      attributes: activeAttributes,
    },
    hasSelectedFilters,
    setPriceFilterValues,
    setActiveAttributes,
    clearAllFiltersValues,
  };
}
