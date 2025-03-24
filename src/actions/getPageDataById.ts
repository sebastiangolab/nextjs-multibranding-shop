import { AxiosWordpress } from "@/lib/axios";

type GenericPageData = {
  id: number;
  type: string;
  slug: string;
  acf: {
    sections: number[];
  };
};

export const getGenericPageDataById = async (
  slug: string,
): Promise<GenericPageData | null> => {
  try {
    const { data } = await AxiosWordpress<GenericPageData[]>(
      `/generic-page?slug=${slug}`
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
