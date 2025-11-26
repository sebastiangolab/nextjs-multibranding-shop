import React, { ReactNode } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@shared/shadcn/ui/sheet";

interface BottomSheetProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  children: ReactNode;
  title?: string;
  bottomContent?: ReactNode;
}

export const BottomSheet = ({
  isOpen,
  onOpenChange,
  children,
  title,
  bottomContent,
}: BottomSheetProps) => {
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[90vh] flex flex-col">
        {title ? (
          <SheetHeader>
            <SheetTitle>{title}</SheetTitle>
          </SheetHeader>
        ) : null}

        <div className="overflow-y-auto px-4">{children}</div>

        {bottomContent ? (
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-background border-t flex gap-3">
            {bottomContent}
          </div>
        ) : null}
      </SheetContent>
    </Sheet>
  );
};
