"use client";

import { createContext, ReactElement, ReactNode, useContext } from "react";

type LayoutContextType = {
  header: ReactNode;
  footer: ReactNode;
};

type LayoutContextProviderProps = LayoutContextType & {
  children: ReactElement;
};

const LayoutContext = createContext<LayoutContextType>({
  header: null,
  footer: null,
});

export const useLayoutContext = () => useContext(LayoutContext);

export const LayoutContextProvider = ({
  children,
  header,
  footer,
}: LayoutContextProviderProps) => {
  <LayoutContext.Provider value={{ header, footer }}>
    {children}
  </LayoutContext.Provider>;
};
