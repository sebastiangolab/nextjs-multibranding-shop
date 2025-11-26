import React, { Dispatch, SetStateAction } from "react";
import { BottomSheet } from "@shared/components/BottomSheet";
import { Button } from "@shared/shadcn/ui/button";
import { ProductsCategoryFullData } from "@shared/types";
import { SubcategoryMenu } from "../SubcategoryMenu";

interface MobileSubcategoriesSheetProps {
  isMobileSubcategoriesSheetOpen: boolean;
  setIsMobileSubcategoriesSheetOpen: Dispatch<SetStateAction<boolean>>;
  subcategories: ProductsCategoryFullData[];
}

export const MobileSubcategoriesSheet = ({
  isMobileSubcategoriesSheetOpen,
  setIsMobileSubcategoriesSheetOpen,
  subcategories,
}: MobileSubcategoriesSheetProps) => {
  const buttonElement = (
    <Button
      className="flex-1"
      size="lg"
      onClick={() => setIsMobileSubcategoriesSheetOpen(false)}
    >
      Zamknij
    </Button>
  );

  return (
    <BottomSheet
      title="Podkategorie"
      isOpen={isMobileSubcategoriesSheetOpen}
      onOpenChange={setIsMobileSubcategoriesSheetOpen}
      bottomContent={buttonElement}
    >
      <SubcategoryMenu categoriesData={subcategories} />
    </BottomSheet>
  );
};
