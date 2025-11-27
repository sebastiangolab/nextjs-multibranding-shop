"use server";

import { normalizeMenuItems } from "@shared/helpers/menuHelpers";
import { axiosWpAcfApi, axiosWpCustomApi } from "@shared/lib/axios";
import { Image, MenuResponseData } from "@shared/types";
import { HeaderData } from "../types";

interface HeaderResponseData {
  acf: {
    logo: Image;
    logo_dark_mode: Image;
  };
}

export const getHeaderData = async (): Promise<HeaderData | null> => {
  try {
    // Fetch header settings and main menu in parallel
    const [{ data: headerData }, { data: menuData }] = await Promise.all([
      axiosWpAcfApi<HeaderResponseData[]>('theme-setting?slug="header"'),
      axiosWpCustomApi<MenuResponseData>("/menu/main_menu"),
    ]);

    console.log("✅ Fetched header data successfully.", {
      headerData,
      menuData,
    });

    const normalizedMenuDataItems = normalizeMenuItems(menuData.items);

    return {
      logoData: headerData[0].acf.logo,
      logoDarkModeData: headerData[0].acf.logo_dark_mode,
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
