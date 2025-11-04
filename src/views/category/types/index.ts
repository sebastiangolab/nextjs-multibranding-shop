export interface PriceFilterData {
  name: string;
  maxPrice: number;
}

export interface AttributeFilterData {
  id: string;
  name: string;
  options: string[];
}

export interface Attribute {
  attributeId: string;
  activeOptions: string[];
}
