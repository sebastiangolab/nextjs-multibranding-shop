import React, { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
}

const Section = ({ children }: SectionProps) => {
  return <section className="w-full py-12">{children}</section>;
};

export default Section;
