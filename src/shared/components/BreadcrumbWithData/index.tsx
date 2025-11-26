"use client";

import React, { Fragment } from "react";
import { SlashIcon } from "lucide-react";
import {
  BreadcrumbItem as BreadcrumbItemType,
  useBreadcrumb,
} from "@shared/hooks/useBreadcrumb";
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
  categoryItems?: BreadcrumbItemType[];
  isCategoryCurrentPage?: boolean;
}

const BreadcrumbWithData = ({
  currentPageLabel,
  categoryItems,
  isCategoryCurrentPage,
}: BreadcrumbWithDataProps) => {
  const breadcrumbItemsData = useBreadcrumb(
    currentPageLabel,
    categoryItems,
    isCategoryCurrentPage,
  );

  const breadcrumbItems = breadcrumbItemsData.map((item) => (
    <Fragment key={item.href}>
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
    </Fragment>
  ));

  return (
    <Breadcrumb>
      <BreadcrumbList>{breadcrumbItems}</BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadcrumbWithData;
