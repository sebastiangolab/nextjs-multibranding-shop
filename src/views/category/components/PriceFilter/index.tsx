"use client";

import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import InputWithLabel from "@shared/components/InputWithLabel";
import { Label } from "@shared/shadcn/ui/label";
import { Slider } from "@shared/shadcn/ui/slider";
import { ProductsFiltersHookResults } from "../../types";
import { Price } from "@/features/prices";

interface PriceFilterProps {
  maxPrice: number;
  setPriceFilterValues: ProductsFiltersHookResults["setPriceFilterValues"];
  hasSelectedFilters: ProductsFiltersHookResults["hasSelectedFilters"];
}

type PriceRange = [number | null, number | null];

export const PriceFilter = ({
  maxPrice,
  setPriceFilterValues,
  hasSelectedFilters,
}: PriceFilterProps) => {
  const [priceRange, setPriceRange] = useState<PriceRange>([null, null]);
  const [priceRangeValues] = useDebounce(priceRange, 500);

  const handlePriceRangeChange = (newRange: PriceRange) => {
    let min = newRange[0];
    let max = newRange[1];

    if (min !== null) {
      if (min > maxPrice) min = maxPrice;
      if (min <= 0) min = 0;
    }

    if (max !== null) {
      if (max > maxPrice) max = maxPrice;
      if (max <= 0) max = maxPrice;
    }

    setPriceRange([min, max]);
  };

  useEffect(() => {
    if (priceRangeValues[0] === null && priceRangeValues[1] === null) {
      return;
    }

    const min = priceRangeValues[0] === 0 ? null : priceRangeValues[0];
    const max = priceRangeValues[1] === maxPrice ? null : priceRangeValues[1];

    setPriceFilterValues(min, max);
  }, [priceRangeValues]);

  useEffect(() => {
    if (
      !hasSelectedFilters &&
      (priceRange[0] !== null || priceRange[1] !== null)
    ) {
      setPriceRange([null, null]);
    }
  }, [hasSelectedFilters]);

  return (
    <div className="space-y-4">
      <Label className="text-sm font-medium">Cena</Label>

      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>{priceRange[0] ? <Price price={priceRange[0]} /> : "0 zł"}</span>

        <span>
          {priceRange[1] ? (
            <Price price={priceRange[1]} />
          ) : (
            <Price price={maxPrice} />
          )}
        </span>
      </div>

      <Slider
        value={[priceRange[0] || 0, priceRange[1] || maxPrice]}
        onValueChange={(values) =>
          handlePriceRangeChange([values[0], values[1]])
        }
        max={maxPrice}
        min={0}
        step={1}
        className="w-full mb-7"
      />

      <div className="grid grid-cols-2 gap-2">
        <InputWithLabel
          label="Min"
          id="min-price"
          type="number"
          value={priceRange[0] || ""}
          onChange={(e) =>
            handlePriceRangeChange([Number(e.target.value), priceRange[1]])
          }
          className="w-full px-2 py-1 text-sm border rounded-md"
          placeholder="Od"
        />

        <InputWithLabel
          label="Max"
          id="max-price"
          type="number"
          value={
            priceRange[1] !== maxPrice && priceRange[1] !== null
              ? priceRange[1]
              : ""
          }
          onChange={(e) =>
            handlePriceRangeChange([priceRange[0], Number(e.target.value)])
          }
          className="w-full px-2 py-1 text-sm border rounded-md"
          placeholder="Do"
        />
      </div>
    </div>
  );
};
