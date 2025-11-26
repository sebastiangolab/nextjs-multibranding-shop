import { Attribute } from "../types";

export const convertAttributesDataToParams = (
  attributes: Attribute[],
): Record<string, string> => {
  const result = attributes.reduce(
    (prevObject, { attributeSlug, activeOptions }) => {
      const existing = prevObject[attributeSlug]
        ? prevObject[attributeSlug].split(",")
        : [];

      prevObject[attributeSlug] = [...existing, ...activeOptions].join(",");

      return prevObject;
    },
    {} as Record<string, string>,
  );

  return result;
};
