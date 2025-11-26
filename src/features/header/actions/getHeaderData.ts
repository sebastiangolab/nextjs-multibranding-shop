"use server";

import { unstable_cache } from "next/cache";
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

const fetchHeaderData = async (): Promise<HeaderData | null> => {
  try {
    // Fetch header settings and main menu in parallel
    const [{ data: headerData }, { data: menuData }] = await Promise.all([
      axiosWpAcfApi<HeaderResponseData[]>('theme-setting?slug="header"'),
      axiosWpCustomApi<MenuResponseData>("/menu/main_menu"),
    ]);

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

export const getHeaderData = unstable_cache(
  async () => fetchHeaderData(),
  ["header-data"],
  {
    revalidate: 3600, // 1 hour
    tags: ["header", "menu"],
  }
);
