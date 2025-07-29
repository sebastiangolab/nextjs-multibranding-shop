import { axiosWpCustomApi } from "@/lib/axios";
import { MenuData, MenuType } from "@/types/menu";

export const getMainMenuData = async (
  menuType: MenuType
): Promise<MenuData[] | null> => {
  try {
    const { data } = await axiosWpCustomApi<MenuData[]>(`/menu/${menuType}`);

    return data ?? [];
  } catch (error) {
    console.error("❌ Error fetching main menu data: ", error);
    return null;
  }
};
