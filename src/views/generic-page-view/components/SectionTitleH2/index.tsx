import React, { ReactNode } from "react";

interface SectionTitleH2Props {
  children: ReactNode;
}

const SectionTitleH2 = ({ children }: SectionTitleH2Props) => {
  return <h2 className="text-2xl md:text-3xl font-medium mb-5">{children}</h2>;
};

export default SectionTitleH2;
