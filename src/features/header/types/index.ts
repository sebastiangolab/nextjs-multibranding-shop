export interface HeaderLogo {
  id: number;
  url: string;
  alt: string;
  width: number;
  height: number;
}

export interface MenuResponseItem {
  id: number;
  title: string;
  url: string;
  parent: string;
  order: number;
}

export interface MenuResponseData {
  id: number;
  name: string;
  count: number;
  items: MenuResponseItem[];
}

export interface MenuItem extends MenuResponseItem {
  childrens?: MenuItem[];
}

export interface MenuData extends Omit<MenuResponseData, "items"> {
  items: MenuItem[];
}

export interface HeaderData {
  logoData: HeaderLogo;
  menuData: MenuData;
}
