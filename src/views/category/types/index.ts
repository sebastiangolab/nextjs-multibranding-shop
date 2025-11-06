export interface PriceFilterData {
  name: string;
  maxPrice: number;
}

export interface AttributeFilterData {
  id: string;
  name: string;
  slug: string;
  options: string[];
}

export interface Attribute {
  attributeId: string;
  attributeSlug: string;
  activeOptions: string[];
}

export interface ProductsFiltersHookResults {
  hasSelectedFilters: boolean;
  priceFilterData: PriceFilterData | null;
  attributesFiltersData: AttributeFilterData[];
  selectedFiltersValues: {
    minPrice: number | null;
    maxPrice: number | null;
    attributes: Attribute[];
  };
  setPriceFilterValues: (min: number | null, max: number | null) => void;
  changeActiveAttribute: (
    attributeId: string,
    attributeSlug: string,
    option: string,
    isChecked: boolean
  ) => void;
  checkIsActiveAttributeOption: (
    attributeId: string,
    option: string
  ) => boolean;
  clearAllFiltersValues: () => void;
}

export type ProductsFiltersElementData = Pick<
  ProductsFiltersHookResults,
  | "hasSelectedFilters"
  | "clearAllFiltersValues"
  | "priceFilterData"
  | "setPriceFilterValues"
  | "attributesFiltersData"
  | "changeActiveAttribute"
  | "checkIsActiveAttributeOption"
>;
