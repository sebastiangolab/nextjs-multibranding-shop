"use client";

import React, { ReactNode } from "react";

interface CheckoutLayoutProps {
  children: ReactNode;
}

const CheckoutLayout = ({ children }: CheckoutLayoutProps) => {
  return <div className="min-h-[80vh] bg-muted/50">{children}</div>;
};

export default CheckoutLayout;
