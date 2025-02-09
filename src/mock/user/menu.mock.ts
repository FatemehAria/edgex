import type { MenuList } from '@/interface/layout/menu.interface';

import { intercepter, mock } from '../config';

const media_id = localStorage.getItem('M_id');

const mockMenuList: MenuList = [
  {
    code: 'main-page',
    label: {
      // zh_CN: '首页',
      en_US: 'Home',
      fa_IR: 'صفحه اصلی',
    },
    icon: 'homepage',
    path: '/',
  },
  // {
  //   code: 'main-page',
  //   label: {
  //     // zh_CN: '首页',
  //     en_US: 'Home',
  //     fa_IR: 'صفحه اصلی',
  //   },
  //   icon: 'homepage',
  //   path: `/${media_id}`,
  // },
  {
    code: 'account',
    label: {
      // zh_CN: '首页',
      en_US: 'Account',
      fa_IR: 'حساب کاربری',
    },
    icon: 'account',
    path: '/account',
  },
  {
    code: 'enter-metadata',
    label: {
      // zh_CN: '文档',
      en_US: 'Metadata',
      fa_IR: 'ورود متادیتا',
    },
    icon: 'metadata',
    path: '/metadata',
  },
  {
    code: 'advanced-search',
    label: {
      // zh_CN: '引导',
      en_US: 'Advanced Search',
      fa_IR: 'جستجوی پیشرفته',
    },
    icon: 'advanced-search',
    path: '/advanced-search',
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
  },
  {
    code: 'favorites',
    label: {
      // zh_CN: '组件',
      en_US: 'Favorites',
      fa_IR: 'علاقه مندی ها',
    },
    icon: 'favorites',
    path: '/favorites',
  },
];

mock.mock('/user/menu', 'get', intercepter(mockMenuList));
