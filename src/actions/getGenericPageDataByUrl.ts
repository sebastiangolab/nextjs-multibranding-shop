import { axiosWpCustomApi } from "@/lib/axios";

type GenericPageData = {
  id: number;
  acf: {
    sections: number[];
  };
};

export const getGenericPageDataByUrl = async (
  url: string
): Promise<GenericPageData | null> => {
  try {
    const { data } = await axiosWpCustomApi<GenericPageData>(
      `/generic-page-by-url?url=${url}`
    );

    if (!data) {
      return null;
    }

    return data;
  } catch (error) {
    console.error("❌ Error fetching generic page: ", error);

    return null;
  }
};
