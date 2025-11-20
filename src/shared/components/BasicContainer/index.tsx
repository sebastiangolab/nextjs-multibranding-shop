import React, { ReactNode } from "react";
import { cn } from "@/shared/shadcn/utils";

interface BasicContainerProps {
  children: ReactNode;
  className?: string;
}

const BasicContainer = ({ children, className }: BasicContainerProps) => {
  return (
    <div className={cn("container mx-auto px-4 pt-9 pb-12", className)}>
      {children}
    </div>
  );
};

export default BasicContainer;
