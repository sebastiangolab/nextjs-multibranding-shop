export type HeaderLogo = {
  id: number;
  url: string;
  alt: string;
  width: number;
  height: number;
};

export type HeaderData = {
  logoData: HeaderLogo;
  menuData: MenuData[];
};

export type MenuData = {
  id: number;
  title: string;
  url: string;
  parent: string;
  order: number;
  childrens?: MenuData[];
};
