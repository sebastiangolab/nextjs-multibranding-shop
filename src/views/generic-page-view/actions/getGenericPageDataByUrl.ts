import { axiosWpCustomApi } from "@shared/lib/axios";
import { GenericPageData } from "../types";

interface GenericPageResponseData {
  id: number;
  title?: {
    rendered?: string;
  };
  acf: {
    sections: number[];
    seo_title: string;
    seo_description: string;
    is_no_index?: boolean;
  };
}

export const getGenericPageDataByUrl = async (
  url: string
): Promise<GenericPageData | null> => {
  try {
    const { data } = await axiosWpCustomApi<GenericPageResponseData>(
      `/generic-page-by-url?url=${url}`
    );

    return {
      id: data.id,
      title: data.title,
      seo: {
        title: data.acf.seo_title,
        description: data.acf.seo_description,
        isNoIndex: data.acf.is_no_index || false,
      },
      acf: {
        sections: data.acf.sections,
      },
    };
  } catch (error) {
    console.error("❌ Error fetching generic page: ", error);
    return null;
  }
};
