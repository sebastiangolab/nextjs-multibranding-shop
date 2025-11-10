import Markdown from "markdown-to-jsx";
import React, { ReactElement } from "react";

interface ProductDescriptionProps {
  description: string;
}

const markdownOverrides = {
  p: {
    props: {
      className: "mb-4 last:mb-0",
    },
  },
};

const ProductDescription = ({
  description,
}: ProductDescriptionProps): ReactElement => {
  return (
    <div>
      <h2 className="text-2xl mb-4">Opis produktu</h2>

      <Markdown options={{ overrides: markdownOverrides }}>
        {description}
      </Markdown>
    </div>
  );
};

export default ProductDescription;
