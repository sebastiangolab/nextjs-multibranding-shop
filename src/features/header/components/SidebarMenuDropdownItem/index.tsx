import { MenuItem } from "../../types";
import { LinkButton } from "@shared/components/LinkButton";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@shared/shadcn/ui/accordion";

interface AccordionMenuItemProps {
  menuItem: MenuItem;
}

const SidebarMenuDropdownItem = ({ menuItem }: AccordionMenuItemProps) => {
  return (
    <AccordionItem value={menuItem.id.toString()} className="border-none">
      <AccordionTrigger className="text-sm py-2 px-4 hover:bg-accent hover:no-underline hover:text-accent-foreground">
        {menuItem.title}
      </AccordionTrigger>

      <AccordionContent>
        <div className="flex flex-col gap-1 pl-4">
          {menuItem?.childrens?.map((subItem) => (
            <LinkButton
              key={subItem.id}
              variant="ghost"
              className="w-full justify-start text-sm"
              href={subItem.url}
            >
              {subItem.title}
            </LinkButton>
          ))}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default SidebarMenuDropdownItem;
