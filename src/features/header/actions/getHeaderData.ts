import { axiosWpAcfApi, axiosWpCustomApi } from "@shared/lib/axios";
import { normalizeMenuItems } from "../helpers/normalizeMenuItems";
import { HeaderData, HeaderLogo, MenuResponseData } from "../types";

interface HeaderResponseData {
  acf: {
    logo: HeaderLogo;
  };
}

export const getHeaderData = async (): Promise<HeaderData | null> => {
  try {
    const { data: headerData } = await axiosWpAcfApi<HeaderResponseData[]>(
      'theme-setting?slug="header"'
    );

    const { data: menuData } =
      await axiosWpCustomApi<MenuResponseData>("/menu/main_menu");

    const normalizedMenuDataItems = normalizeMenuItems(menuData.items);

    return {
      logoData: headerData[0].acf.logo,
      menuData: {
        ...menuData,
        items: normalizedMenuDataItems,
      },
    };
  } catch (error) {
    console.error("❌ Error fetching main menu data: ", error);
    return null;
  }
};
