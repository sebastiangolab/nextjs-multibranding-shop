import { MenuData } from "@shared/types";

export interface HeaderLogo {
  id: number;
  url: string;
  alt: string;
  width: number;
  height: number;
}

export interface HeaderData {
  logoData: HeaderLogo;
  menuData: MenuData;
}
