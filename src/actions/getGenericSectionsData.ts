import { axiosWpAcfApi } from "@/lib/axios";
import { SectionData, SectionType } from "@/types/sections";

type ResponseSectionData = {
  template: string;
  acf: SectionType;
};

export const getGenericSectionsData = async (
  genericPageSectionsIds: number[]
): Promise<SectionData[] | null> => {
  try {
    const formattedSectionsIds = genericPageSectionsIds.join(",");

    const { data } = await axiosWpAcfApi<ResponseSectionData[]>(
      `/section?include=${formattedSectionsIds}`
    );

    if (!Array.isArray(data)) {
      return null;
    }

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
  } catch (error) {
    console.error("❌ Error fetching section data: ", error);
    return null;
  }
};
