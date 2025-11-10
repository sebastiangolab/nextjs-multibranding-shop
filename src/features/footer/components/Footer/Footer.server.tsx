import { getFooterData } from "../../actions/getFooterData";
import React from "react";
import FooterClient from "./Footer.client";

const Footer = async () => {
  const footerData = await getFooterData();

  if (!footerData) {
    return <></>;
  }

  return <FooterClient footerData={footerData} />;
};

export default Footer;
