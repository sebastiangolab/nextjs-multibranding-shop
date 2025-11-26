"use client";

import { ChangeEvent } from "react";
import { Minus, Plus } from "lucide-react";
import { Button } from "@shared/shadcn/ui/button";
import { Input } from "@shared/shadcn/ui/input";

type QuantitySelectorProps = {
  quantity: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  setQuantity: (value: number) => void;
};

export const QuantitySelector = ({
  quantity,
  min = 1,
  max,
  setQuantity,
}: QuantitySelectorProps) => {
  const handleDecrement = () => {
    if (quantity > min) {
      const newValue = quantity - 1;
      setQuantity(newValue);
    }
  };

  const handleIncrement = () => {
    if (!max || quantity < max) {
      const newValue = quantity + 1;
      setQuantity(newValue);
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);

    if (!isNaN(value) && value >= min && (!max || value <= max)) {
      setQuantity(value);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={handleDecrement}
          disabled={quantity <= min}
        >
          <Minus className="size-4" />
        </Button>

        <Input
          type="number"
          value={quantity}
          onChange={handleInputChange}
          min={min}
          max={max}
          className="w-20 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />

        <Button
          variant="outline"
          size="icon"
          onClick={handleIncrement}
          disabled={max !== undefined && quantity >= max}
        >
          <Plus className="size-4" />
        </Button>
      </div>
    </div>
  );
};
