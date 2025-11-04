"use client";

import { Label } from "@shared/shadcn/ui/label";
import { Checkbox } from "@shared/shadcn/ui/checkbox";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@shared/shadcn/ui/accordion";
import { AttributeFilterData } from "../../types";

interface AttributeFiltersProps {
  attributes: AttributeFilterData[];
  changeActiveAttribute: (
    attributeId: string,
    option: string,
    isChecked: boolean
  ) => void;
  getIsCheckedAttributeOption: (attributeId: string, option: string) => boolean;
}

export const AttributeFilters = ({
  attributes,
  changeActiveAttribute,
  getIsCheckedAttributeOption,
}: AttributeFiltersProps) => {
  const getAttributeOptions = (attribute: AttributeFilterData) => (
    <div className="space-y-3">
      {attribute.options.map((option) => (
        <div key={option} className="flex items-center space-x-2">
          <Checkbox
            id={`${attribute.id}-${option}`}
            checked={getIsCheckedAttributeOption(attribute.id, option)}
            onCheckedChange={(checked) =>
              changeActiveAttribute(attribute.id, option, !!checked)
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
  );

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

          <AccordionContent>{getAttributeOptions(attribute)}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};
