import { ReactElement } from "react";
import { getHeaderData } from "@header/actions/getHeaderData";
import HeaderClient from "@header/index.client";

const Header = async (): Promise<ReactElement | null> => {
  const data = await getHeaderData();

  if (!data) {
    return null;
  }

  return <HeaderClient data={data} />;
};

export default Header;
