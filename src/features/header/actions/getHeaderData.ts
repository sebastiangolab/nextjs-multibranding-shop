import { axiosWpAcfApi, axiosWpCustomApi } from "@/lib/axios";
import { normalizeMenuItems } from "@header/helpers/normalizeMenuItems";
import { HeaderData, HeaderLogo, MenuData } from "@header/types";

type HeaderResponseData = {
  acf: {
    logo: HeaderLogo;
  };
}[];

export const getHeaderData = async (): Promise<HeaderData | null> => {
  try {
    const { data: headerData } = await axiosWpAcfApi<HeaderResponseData>(
      'theme-setting?slug="header"',
    );

    const { data: menuData } =
      await axiosWpCustomApi<MenuData[]>("/menu/main_menu");

    return {
      logoData: headerData[0].acf.logo,
      menuData: normalizeMenuItems(menuData) ?? [],
    };
  } catch (error) {
    console.error("❌ Error fetching main menu data: ", error);
    return null;
  }
};
