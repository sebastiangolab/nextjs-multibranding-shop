import { axiosWpAcfApi, axiosWpCustomApi } from "@shared/lib/axios";
import { HeaderData, HeaderLogo } from "../types";
import { MenuResponseData } from "@shared/types";
import { normalizeMenuItems } from "@shared/helpers/menuHelpers";

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
    console.error("❌ Error fetching header data: ", error);
    return null;
  }
};
