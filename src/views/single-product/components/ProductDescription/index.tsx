import MarkdownText from "@shared/components/MarkdownText";
import React, { ReactElement } from "react";

interface ProductDescriptionProps {
  description: string;
}

const ProductDescription = ({
  description,
}: ProductDescriptionProps): ReactElement => {
  return (
    <div>
      <h2 className="text-2xl mb-4">Opis produktu</h2>

      <MarkdownText>{description}</MarkdownText>
    </div>
  );
};

export default ProductDescription;
