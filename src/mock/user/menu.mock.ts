import type { MenuList } from '@/interface/layout/menu.interface';

import { intercepter, mock } from '../config';

const mockMenuList: MenuList = [
  {
    code: 'proforma invoice',
    label: {
      en_US: 'Proforma Invoice',
      fa_IR: 'پیش فاکتور',
    },
    icon: 'proforma invoice',
    path: '/',
  },
  {
    code: 'main-tables',
    label: {
      en_US: 'Main Tables',
      fa_IR: 'جداول پایه',
    },
    icon: 'main tables',
    path: '/',
    children: [
      {
        code: 'supplier',
        label: {
          en_US: 'Supplier',
          fa_IR: 'تامین کننده',
        },
        path: '/main-tables/supplier',
      },
      {
        code: 'info',
        label: {
          en_US: 'Company/person info',
          fa_IR: 'مشخصات شخص / شرکت',
        },
        path: '/main-tables/person-company-info',
      },
      // {
      //   code: 'product-supplier',
      //   label: {
      //     en_US: 'Product - Supplier',
      //     fa_IR: 'کالا - تامین کننده',
      //   },
      //   path: '/main-tables/product-supplier',
      // },
      {
        code: 'costumer info',
        label: {
          en_US: 'Costumer info',
          fa_IR: 'مشخصات مشتری',
        },
        path: '/main-tables/costumer-info',
      },
      {
        code: 'increasing/decreasing factors',
        label: {
          en_US: 'Increasing/decreasing factors',
          fa_IR: 'عوامل افزاینده/کاهنده',
        },
        path: '/main-tables/factors',
      },
      {
        code: 'product info',
        label: {
          en_US: 'Product info',
          fa_IR: 'مشخصات کالا',
        },
        path: '/main-tables/product-info',
      },
      {
        code: 'grouping specifications',
        label: {
          en_US: 'Grouping specifications',
          fa_IR: 'مشخصات گروه بندی',
        },
        path: '/main-tables/grouping-specifications',
      },
    ],
  },
  {
    code: 'reports',
    label: {
      en_US: 'Reports',
      fa_IR: 'گزارشات',
    },
    icon: 'reports',
    path: '/reports',
    children: [
      {
        code: 'proforma-report',
        label: {
          // zh_CN: '首页',
          en_US: 'Proforma report',
          fa_IR: 'گزارش آیتم های پیش فاکتور',
        },
        path: '/reports',
      },
    ],
  },
  // {
  //   code: 'account',
  //   label: {
  //     en_US: 'Account',
  //     fa_IR: 'حساب کاربری',
  //   },
  //   icon: 'account',
  //   path: '/account',
  // },
];

mock.mock('/user/menu', 'get', intercepter(mockMenuList));
