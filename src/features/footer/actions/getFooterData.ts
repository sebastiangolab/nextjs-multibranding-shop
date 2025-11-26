"use server";

import { normalizeMenuItems } from "@shared/helpers/menuHelpers";
import { axiosWpAcfApi, axiosWpCustomApi } from "@shared/lib/axios";
import { MenuResponseData } from "@shared/types";
import { FooterData } from "../types";

interface FooterResponseData {
  acf: {
    link_facebook: string;
    instagram_link: string;
    link_twitter: string;
  };
}

export const getFooterData = async (): Promise<FooterData | null> => {
  try {
    // Fetch footer settings and menus in parallel
    const [
      { data: footerData },
      { data: column1MenuData },
      { data: column2MenuData },
      { data: column3MenuData },
    ] = await Promise.all([
      axiosWpAcfApi<FooterResponseData[]>("theme-setting?slug=footer"),
      axiosWpCustomApi<MenuResponseData>("/menu/footer_column_1"),
      axiosWpCustomApi<MenuResponseData>("/menu/footer_column_2"),
      axiosWpCustomApi<MenuResponseData>("/menu/main_menu"),
    ]);

    if (!footerData || footerData.length === 0) {
      return null;
    }

    return {
      socialLinks: {
        facebook: footerData[0].acf.link_facebook,
        instagram: footerData[0].acf.instagram_link,
        twitter: footerData[0].acf.link_twitter,
      },
      menuData: {
        column1: {
          ...column1MenuData,
          items: normalizeMenuItems(column1MenuData.items),
        },
        column2: {
          ...column2MenuData,
          items: normalizeMenuItems(column2MenuData.items),
        },
        column3: {
          ...column3MenuData,
          items: normalizeMenuItems(column3MenuData.items),
        },
      },
    };
  } catch (error) {
    console.error("❌ Error fetching footer data: ", error);
    return null;
  }
};
