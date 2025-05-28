import { AxiosWordpress } from "@/lib/axios";
import { SectionData, SectionType } from "@/types/sections";

type ResponseSectionData = {
  template: string;
  acf: SectionType;
};

export const getGenericSectionsData = async (
  genericPageSectionsIds: number[]
): Promise<SectionData[]> => {
  const formattedSectionsIds = genericPageSectionsIds.join(",");

  const { data } = await AxiosWordpress<ResponseSectionData[]>(
    `/section?include=${formattedSectionsIds}`
  );

  const normalizedSectionsData: SectionData[] = data.map((sectionData) => {
    const sectionType = sectionData.template
      .replace("templates/template-", "")
      .replace(".php", "");

    return {
      type: sectionType,
      fields: sectionData.acf,
    };
  });

  return normalizedSectionsData;
};
