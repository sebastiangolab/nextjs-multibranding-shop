import React from "react";
import { getHeaderData } from "../../actions/getHeaderData";
import HeaderClient from "./Header.client";

const Header = async () => {
  const data = await getHeaderData();

  if (!data) {
    return null;
  }

  return <HeaderClient data={data} />;
};

export default Header;
