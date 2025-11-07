export interface HeaderLogo {
  id: number;
  url: string;
  alt: string;
  width: number;
  height: number;
}

export interface MenuData {
  id: number;
  title: string;
  url: string;
  parent: string;
  order: number;
  childrens?: MenuData[];
}

export interface HeaderData {
  logoData: HeaderLogo;
  menuData: MenuData[];
}
