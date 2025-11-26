import MarkdownText from "@shared/components/MarkdownText";
import Section from "../../components/Section";
import SectionTitleH2 from "../../components/SectionTitleH2";
import { TextSectionProps } from "../../types";

const TextSection = ({ title, text }: TextSectionProps) => {
  return (
    <Section>
      <SectionTitleH2>{title}</SectionTitleH2>

      <MarkdownText>{text}</MarkdownText>
    </Section>
  );
};

export default TextSection;
