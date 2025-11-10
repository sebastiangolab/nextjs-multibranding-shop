import { MenuItem, MenuResponseItem } from "@shared/types";

export const normalizeMenuItems = (items: MenuResponseItem[]): MenuItem[] => {
  const normalizeItems = items.reduce<MenuItem[]>((newItems, item) => {
    if (item.parent === "0") {
      return [...newItems, item];
    }

    const parentId = parseInt(item.parent);

    const updatedNewItems = newItems.map((newItem) => {
      if (newItem.id === parentId) {
        return {
          ...newItem,
          childrens: newItem.childrens ? [...newItem.childrens, item] : [item],
        };
      }

      return newItem;
    });

    return updatedNewItems;
  }, []);

  return normalizeItems;
};
