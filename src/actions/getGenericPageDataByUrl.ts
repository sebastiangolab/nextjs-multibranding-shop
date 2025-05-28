import { AxiosWordpress } from "@/lib/axios";

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
    const { data } = await AxiosWordpress<GenericPageData[]>(
      `/generic-page-by-url?url=${url}`
    );

    if (!Array.isArray(data) || data.length === 0) {
      return null;
    }

    return data[0];
  } catch (error) {
    console.error("❌ Error fetching generic page:", error);

    return null;
  }
};
