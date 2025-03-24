"use client";

import React, { ReactElement, ReactNode } from "react";
import { useLayoutContext } from "@/contexts/LayoutContext";

type LayoutWrapperProps = {
  children: ReactNode;
};

const LayoutWrapper = ({
  children,
}: LayoutWrapperProps): ReactElement<LayoutWrapperProps> => {
  const { header, footer } = useLayoutContext();

  return (
    <>
      {header}
      {children}
      {footer}
    </>
  );
};

export default LayoutWrapper;
