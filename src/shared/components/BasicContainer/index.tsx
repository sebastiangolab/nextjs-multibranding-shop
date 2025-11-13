import React, { ReactNode } from "react";

interface BasicContainerProps {
  children: ReactNode;
}

const BasicContainer = ({ children }: BasicContainerProps) => {
  return <div className="container mx-auto px-4 pt-9 pb-12">{children}</div>;
};

export default BasicContainer;
