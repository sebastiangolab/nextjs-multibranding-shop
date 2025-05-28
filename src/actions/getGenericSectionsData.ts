import { AxiosWordpress } from "@/lib/axios";

export enum GenericSectionType {
  SECTION_TEXT = "section-text",
  SECTION_IMAGE_WITH_TEXT = "section-image-with-text",
}

type SectionWithTextAndImageType = {
  title?: string;
  text: string;
  image: number;
};

type SectionWithTextType = {
  title?: string;
  text: string;
};

type SectionType = SectionWithTextAndImageType | SectionWithTextType;

type ResponseSectionData = {
  template: string;
  acf: SectionType;
};

type GenericSectionData = {
  type: ResponseSectionData["template"];
  fields: SectionType;
};

export const getGenericSectionsData = async (
  genericPageSectionsIds: number[]
): Promise<GenericSectionData[]> => {
  const formattedSectionsIds = genericPageSectionsIds.join(",");

  const { data } = await AxiosWordpress<ResponseSectionData[]>(
    `/section?include=${formattedSectionsIds}`
  );

  const normalizedSectionsData: GenericSectionData[] = data.map(
    (sectionData) => {
      const sectionType = sectionData.template
        .replace("templates/template-", "")
        .replace(".php", "");

      return {
        type: sectionType,
        fields: sectionData.acf,
      };
    }
  );

  return normalizedSectionsData;
};
