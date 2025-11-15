import { normalizeMenuItems } from "@shared/helpers/menuHelpers";
import { axiosWpAcfApi, axiosWpCustomApi } from "@shared/lib/axios";
import { Image, MenuResponseData } from "@shared/types";
import { HeaderData } from "../types";

interface HeaderResponseData {
  acf: {
    logo: Image;
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
