import { ReactElement } from "react";
import { getHeaderData } from "@/modules/header/actions/getHeaderData";
import HeaderClient from "./header.client";

const HeaderServer = async (): Promise<ReactElement | null> => {
  const data = await getHeaderData();

  if (!data) {
    return null;
  }

  return <HeaderClient data={data} />;
};

export default HeaderServer;
