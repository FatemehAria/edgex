interface MenuItem {
  /** menu item code */
  code: string;
  /** menu labels */
  label: {
    // zh_CN: string;
    en_US: string;
    fa_IR: string;
  };
  /** Icon Name
   *
   * Sub-submenus do not require icons
   */
  icon?: string;
  /** Menu Routing */
  path: string;
  /** submenu */
  children?: MenuItem[];
}

export type MenuChild = Omit<MenuItem, 'children'>;

export type MenuList = MenuItem[];
