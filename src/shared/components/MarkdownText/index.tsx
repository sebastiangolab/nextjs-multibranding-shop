import Markdown from "markdown-to-jsx";
import React from "react";

interface MarkdownTextProps {
  children: string;
}

const markdownOverrides = {
  p: {
    props: {
      className: "mb-4 last:mb-0",
    },
  },
};

const MarkdownText = ({ children }: MarkdownTextProps) => {
  return (
    <Markdown options={{ overrides: markdownOverrides }}>{children}</Markdown>
  );
};

export default MarkdownText;
