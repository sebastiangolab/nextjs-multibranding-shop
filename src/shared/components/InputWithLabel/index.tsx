import { ComponentProps } from "react";
import { Input } from "@shared/shadcn/ui/input";
import { Label } from "@shared/shadcn/ui/label";

interface InputWithLabelProps extends ComponentProps<"input"> {
  label: string;
}

function InputWithLabel({
  label,
  id,
  type,
  ...inputProps
}: InputWithLabelProps) {
  return (
    <div className="grid w-full max-w-sm items-center gap-3">
      <Label htmlFor={id}>{label}</Label>

      <Input type={type} id={id} {...inputProps} />
    </div>
  );
}

export default InputWithLabel;
