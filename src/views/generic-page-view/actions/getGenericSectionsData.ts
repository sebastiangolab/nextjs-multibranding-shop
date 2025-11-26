import { axiosWpAcfApi } from "@shared/lib/axios";
import { normalizeSectionData } from "../helpers/normalizeSectionHelpers";
import { GenericSectionType, SectionData, SectionResponseData } from "../types";

interface ResponseSectionData {
  template: string;
  acf: SectionResponseData;
}

export const getGenericSectionsData = async (
  genericPageSectionsIds: number[],
): Promise<SectionData[] | null> => {
  try {
    const formattedSectionsIds = genericPageSectionsIds.join(",");

    const { data } = await axiosWpAcfApi<ResponseSectionData[]>(`/section`, {
      params: {
        include: formattedSectionsIds,
        orderby: "include",
      },
    });

    if (!Array.isArray(data)) {
      return null;
    }

    const normalizedSectionsData: SectionData[] = data.map((sectionData) => {
      const sectionType = sectionData.template
        .replace("templates/template-", "")
        .replace(".php", "") as GenericSectionType;

      return {
        type: sectionType,
        fields: normalizeSectionData(sectionType, sectionData.acf),
      };
    });

    return normalizedSectionsData;
  } catch (error) {
    console.error("❌ Error fetching section data: ", error);
    return null;
  }
};
