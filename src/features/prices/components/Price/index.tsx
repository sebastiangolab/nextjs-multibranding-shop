import React, { ReactElement } from "react";
import { roundUpPrice } from "../../helpers/roundUpPrice";

type PriceProps = {
  price: number | string;
};

const Price = ({ price }: PriceProps): ReactElement => {
  const roundedPrice = roundUpPrice(price).toFixed(2);

  return <span>{roundedPrice} zł</span>;
};

export default Price;
