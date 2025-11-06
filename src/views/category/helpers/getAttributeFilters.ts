import { ProductData } from "@features/products";
import { AttributeFilterData } from "../types";

export const getAttributeFilters = (
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
        slug: currentAttribute.slug,
        name: currentAttribute.name,
        options: currentAttribute.options,
      };

      return [...prevAttributes, normalizeAttribute];
    },
    [] as AttributeFilterData[]
  );

  return attributesFilters;
};
