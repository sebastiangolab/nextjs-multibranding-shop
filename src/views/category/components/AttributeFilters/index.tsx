"use client";

import { Label } from "@shared/shadcn/ui/label";
import { Checkbox } from "@shared/shadcn/ui/checkbox";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@shared/shadcn/ui/accordion";
import { ProductsFiltersHookResults } from "../../types";

interface AttributeFiltersProps {
  attributes: ProductsFiltersHookResults["attributesFiltersData"];
  changeActiveAttribute: ProductsFiltersHookResults["changeActiveAttribute"];
  checkIsActiveAttributeOption: ProductsFiltersHookResults["checkIsActiveAttributeOption"];
}

export const AttributeFilters = ({
  attributes,
  changeActiveAttribute,
  checkIsActiveAttributeOption,
}: AttributeFiltersProps) => {
  return (
    <Accordion
      type="multiple"
      className="w-full"
      defaultValue={attributes.map((attr) => attr.id)}
    >
      {attributes.map((attribute) => (
        <AccordionItem key={attribute.id} value={attribute.id}>
          <AccordionTrigger className="text-sm font-medium">
            {attribute.name}
          </AccordionTrigger>

          <AccordionContent>
            <div className="space-y-3">
              {attribute.options.map((option) => (
                <div key={option} className="flex items-center space-x-2">
                  <Checkbox
                    id={`${attribute.id}-${option}`}
                    checked={checkIsActiveAttributeOption(attribute.id, option)}
                    onCheckedChange={(checked) =>
                      changeActiveAttribute(
                        attribute.id,
                        attribute.slug,
                        option,
                        !!checked
                      )
                    }
                  />

                  <Label
                    htmlFor={`${attribute.id}-${option}`}
                    className="text-sm font-normal cursor-pointer pt-px"
                  >
                    {option}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};
