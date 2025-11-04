import React, { ReactNode } from "react";
import Link from "next/link";
import { Button, ButtonProps } from "@shared/shadcn/ui/button";

interface LinkButtonProps extends ButtonProps {
  href: string;
  children: ReactNode;
}

export const LinkButton = ({
  href,
  children,
  ...buttonProps
}: LinkButtonProps) => {
  return (
    <Button {...buttonProps} asChild>
      <Link href={href}>{children}</Link>
    </Button>
  );
};
