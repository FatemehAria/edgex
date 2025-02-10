import type { MenuList } from '@/interface/layout/menu.interface';

import { intercepter, mock } from '../config';

// const media_id = localStorage.getItem('M_id');

const mockMenuList: MenuList = [
  {
    code: 'main-tables',
    label: {
      // zh_CN: '首页',
      en_US: 'Main Tables',
      fa_IR: 'جداول پایه',
    },
    icon: 'main tables',
    path: '/',
    children: [
      {
        code: 'supplier',
        label: {
          // zh_CN: '首页',
          en_US: 'Supplier',
          fa_IR: 'تامین کننده',
        },
        path: '/main-tables/supplier',
      },
      {
        code: 'info',
        label: {
          // zh_CN: '首页',
          en_US: 'Company/person info',
          fa_IR: 'مشخصات شخص / شرکت',
        },
        path: '/main-tables/person-company-info',
      },
      {
        code: 'product-supplier',
        label: {
          // zh_CN: '首页',
          en_US: 'Product - Supplier',
          fa_IR: 'کالا - تامین کننده',
        },
        path: '/main-tables/product-supplier',
      },
      {
        code: 'info of corrective measures',
        label: {
          // zh_CN: '首页',
          en_US: 'Info of corrective measures',
          fa_IR: 'مشخصات اقدامات اصلاحی',
        },
        path: '/main-tables/corrective-measures',
      },
      {
        code: 'costumer info',
        label: {
          // zh_CN: '首页',
          en_US: 'Costumer info',
          fa_IR: 'مشخصات مشتری',
        },
        path: '/main-tables/costumer-info',
      },
      {
        code: 'increasing/decreasing factors',
        label: {
          // zh_CN: '首页',
          en_US: 'Increasing/decreasing factors',
          fa_IR: 'عوامل افزاینده/کاهنده',
        },
        path: '/main-tables/increasing-decreasing-factors',
      },
      {
        code: 'product info',
        label: {
          // zh_CN: '首页',
          en_US: 'Product info',
          fa_IR: 'مشخصات کالا',
        },
        path: '/main-tables/product-info',
      },
      {
        code: 'grouping specifications',
        label: {
          // zh_CN: '首页',
          en_US: 'Grouping specifications',
          fa_IR: 'مشخصات گروه بندی',
        },
        path: '/main-tables/grouping-specifications',
      },
      {
        code: 'event info',
        label: {
          // zh_CN: '首页',
          en_US: 'Event info',
          fa_IR: 'مشخصات ایونت',
        },
        path: '/main-tables/event-info',
      },
    ],
  },
  {
    code: 'info submission',
    label: {
      // zh_CN: '首页',
      en_US: 'Info submission',
      fa_IR: 'ورود اطلاعات',
    },
    icon: 'info submission',
    path: '/info-submission',
    children: [
      {
        code: 'supplier',
        label: {
          // zh_CN: '首页',
          en_US: 'Supplier',
          fa_IR: 'تامین کننده',
        },
        path: '/info-submission',
      },
    ],
  },
  {
    code: 'reports',
    label: {
      // zh_CN: '权限',
      en_US: 'Reports',
      fa_IR: 'گزارشات',
    },
    icon: 'reports',
    path: '/reports',
    children: [
      {
        code: 'supplier',
        label: {
          // zh_CN: '首页',
          en_US: 'Supplier',
          fa_IR: 'تامین کننده',
        },
        path: '/reports',
      },
    ],
  },
  // {
  //   code: 'account',
  //   label: {
  //     // zh_CN: '首页',
  //     en_US: 'Account',
  //     fa_IR: 'حساب کاربری',
  //   },
  //   icon: 'account',
  //   path: '/account',
  // },
  // {
  //   code: 'enter-metadata',
  //   label: {
  //     // zh_CN: '文档',
  //     en_US: 'Metadata',
  //     fa_IR: 'ورود متادیتا',
  //   },
  //   icon: 'metadata',
  //   path: '/metadata',
  // },
  // {
  //   code: 'advanced-search',
  //   label: {
  //     // zh_CN: '引导',
  //     en_US: 'Advanced Search',
  //     fa_IR: 'جستجوی پیشرفته',
  //   },
  //   icon: 'advanced-search',
  //   path: '/advanced-search',
  // },
  // {
  //   code: 'reports',
  //   label: {
  //     // zh_CN: '权限',
  //     en_US: 'Reports',
  //     fa_IR: 'گزارشات',
  //   },
  //   icon: 'reports',
  //   path: '/reports',
  // },
  // {
  //   code: 'favorites',
  //   label: {
  //     // zh_CN: '组件',
  //     en_US: 'Favorites',
  //     fa_IR: 'علاقه مندی ها',
  //   },
  //   icon: 'favorites',
  //   path: '/favorites',
  // },
];

mock.mock('/user/menu', 'get', intercepter(mockMenuList));
