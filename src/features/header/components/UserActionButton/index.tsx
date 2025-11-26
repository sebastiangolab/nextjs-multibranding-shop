import { ReactNode } from "react";
import { LinkButton } from "@shared/components/LinkButton";
import { Badge } from "@shared/shadcn/ui/badge";

interface UserActionButtonProps {
  label: string;
  href: string;
  icon: ReactNode;
  quantity?: number;
}

const UserActionButton = ({
  label,
  href,
  icon,
  quantity,
}: UserActionButtonProps) => {
  return (
    <LinkButton
      variant="ghost"
      size="sm"
      className="flex flex-col items-center gap-1 h-auto py-2 relative"
      href={href}
    >
      <div className="relative">
        {icon}

        {quantity && quantity > 0 ? (
          <Badge
            variant="default"
            className="absolute -top-2 -right-2.5 min-h-4 min-w-4 flex items-center justify-center p-0 text-[0.625rem] rounded-sm"
          >
            {quantity}
          </Badge>
        ) : null}
      </div>

      <span className="text-xs">{label}</span>
    </LinkButton>
  );
};

export default UserActionButton;
