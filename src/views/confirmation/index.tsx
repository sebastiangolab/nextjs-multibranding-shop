"use client";

import { Suspense } from "react";
import BasicContainer from "@/shared/components/BasicContainer";
import { Skeleton } from "@/shared/shadcn/ui/skeleton";
import ConfirmationContent from "./components/ConfirmationContent";

export const ConfirmationView = () => {
  return (
    <>
      <BasicContainer className="py-12">
        <Suspense
          fallback={
            <div className="max-w-2xl mx-auto">
              <Skeleton className="h-96 w-full rounded-lg" />
            </div>
          }
        >
          <ConfirmationContent />
        </Suspense>
      </BasicContainer>
    </>
  );
};
