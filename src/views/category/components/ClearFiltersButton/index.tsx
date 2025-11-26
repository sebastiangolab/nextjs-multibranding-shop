import React from "react";
import { Button } from "@shared/shadcn/ui/button";
import { ProductsFiltersHookResults } from "../../types";

interface ClearFiltersButtonProps {
  clearAllFiltersValues: ProductsFiltersHookResults["clearAllFiltersValues"];
}

export const ClearFiltersButton = ({
  clearAllFiltersValues,
}: ClearFiltersButtonProps) => {
  return (
    <Button
      variant="outline"
      className="w-full"
      onClick={clearAllFiltersValues}
    >
      Wyczyść filtry
    </Button>
  );
};
