import Link from "next/link";
import { MenuData } from "@shared/types";

interface MenuFooterColumnProps {
  menuData: MenuData;
}

const MenuFooterColumn = ({ menuData }: MenuFooterColumnProps) => {
  return (
    <div>
      <h3 className="mb-4 text-lg font-semibold">{menuData.name}</h3>

      <nav className="flex flex-col gap-2">
        {menuData.items.map((item) => (
          <Link
            key={item.id}
            href={item.url}
            prefetch={false}
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            {item.title}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default MenuFooterColumn;
