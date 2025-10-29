"use client";

import React from "react";
import { SlashIcon } from "lucide-react";
import { useBreadcrumb } from "@shared/hooks/useBreadcrumb";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@shared/shadcn/ui/breadcrumb";

interface BreadcrumbWithDataProps {
  currentPageLabel: string;
}

const BreadcrumbWithData = ({ currentPageLabel }: BreadcrumbWithDataProps) => {
  const breadcrumbItemsData = useBreadcrumb(currentPageLabel);

  const breadcrumbItems = breadcrumbItemsData.map((item) => (
    <React.Fragment key={item.href}>
      <BreadcrumbItem>
        {item.isCurrentPage ? (
          <BreadcrumbPage>{item.label}</BreadcrumbPage>
        ) : (
          <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
        )}
      </BreadcrumbItem>

      {!item.isCurrentPage ? (
        <BreadcrumbSeparator>
          <SlashIcon />
        </BreadcrumbSeparator>
      ) : null}
    </React.Fragment>
  ));

  return (
    <Breadcrumb>
      <BreadcrumbList>{breadcrumbItems}</BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadcrumbWithData;
