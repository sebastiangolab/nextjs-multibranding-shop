export enum MenuType {
  MAIN = "main_menu",
  FOOTER = "footer_menu",
}

export type MenuData = {
  id: number;
  title: string;
  url: string;
  parent: string;
  order: number;
};
