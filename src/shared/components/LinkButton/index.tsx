import React, { ReactNode } from "react";
import Link from "next/link";
import { Button, ButtonProps } from "@shared/shadcn/ui/button";

interface LinkButtonProps extends ButtonProps {
  href: string;
  children: ReactNode;
  prefetch?: boolean;
}

export const LinkButton = ({
  href,
  children,
  prefetch,
  ...buttonProps
}: LinkButtonProps) => {
  return (
    <Button {...buttonProps} asChild>
      <Link href={href} prefetch={prefetch}>
        {children}
      </Link>
    </Button>
  );
};
