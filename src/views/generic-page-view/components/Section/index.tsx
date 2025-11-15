import React, { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  isFullWidth?: boolean;
}

const Section = ({ children, isFullWidth = false }: SectionProps) => {
  return (
    <section
      className={`${isFullWidth ? "w-full max-w-[1920px]" : "container px-4"} pb-10 md:pb-15 lg:pb-20  mx-auto`}
    >
      {children}
    </section>
  );
};

export default Section;
