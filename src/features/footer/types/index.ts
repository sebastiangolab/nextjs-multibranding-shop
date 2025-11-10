import { MenuData } from "@shared/types";

interface FooterMenuData {
  column1: MenuData;
  column2: MenuData;
  column3: MenuData;
}

interface SocialLinks {
  facebook: string;
  instagram: string;
  twitter: string;
}

export interface FooterData {
  shopName: string;
  phone: string;
  email: string;
  socialLinks: SocialLinks;
  menuData: FooterMenuData;
}
