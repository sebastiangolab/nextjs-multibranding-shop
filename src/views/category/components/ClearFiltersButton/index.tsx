import { Button } from "@shared/shadcn/ui/button";
import { ProductsFiltersHookResults } from "../../types";
import React from "react";

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
