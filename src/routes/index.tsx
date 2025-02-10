import type { FC } from 'react';
import type { RouteObject } from 'react-router';

import { lazy } from 'react';
// import { Navigate } from 'react-router';
import { useRoutes } from 'react-router-dom';

import GroupingSpecifications from '@/pages/grouping-specifications';
import LayoutPage from '@/pages/layout';
import LoginPage from '@/pages/login';

import WrapperRouteComponent from './config';
import ProductInfo from '@/pages/product-info';
import CompanyPersonInfo from '@/pages/person-company-info';
import ProductSupplier from '@/pages/product-supplier';
import CostumerInfo from '@/pages/costumer-info';

const NotFound = lazy(() => import(/* webpackChunkName: "404'"*/ '@/pages/404'));
const MetadataPage = lazy(() => import(/* webpackChunkName: "404'"*/ '@/pages/metadata'));
const AdvancedSearchPage = lazy(() => import(/* webpackChunkName: "guide'"*/ '@/pages/advanced-search'));
const FavoritesPage = lazy(() => import(/* webpackChunkName: "form'"*/ '@/pages/favorites'));
const ReportsPage = lazy(() => import(/* webpackChunkName: "basic-page" */ '@/pages/reports'));
const HomePage = lazy(() => import(/* webpackChunkName: "basic-page" */ '@/pages/home'));
const DashboardPage = lazy(() => import(/* webpackChunkName: "basic-page" */ '@/pages/account'));
const MediaDetailsPage = lazy(() => import(/* webpackChunkName: "basic-page" */ '@/pages/media-details'));

const routeList: RouteObject[] = [
  {
    path: '/login',
    element: <WrapperRouteComponent element={<LoginPage />} titleId="title.login" />,
  },
  {
    path: '/',
    element: <WrapperRouteComponent element={<LayoutPage />} titleId="title.homepage" />,
    children: [
      {
        path: '',
        element: <WrapperRouteComponent element={<HomePage />} titleId="title.homepage" />,
      },
      {
        path: '/main-tables/grouping-specifications',
        element: <WrapperRouteComponent element={<GroupingSpecifications />} titleId="title.grouping" />,
      },
      {
        path: '/main-tables/product-info',
        element: <WrapperRouteComponent element={<ProductInfo />} titleId="title.productInfo" />,
      },
      {
        path: '/main-tables/person-company-info',
        element: <WrapperRouteComponent element={<CompanyPersonInfo />} titleId="title.personCompanyInfo" />,
      },
      {
        path: '/main-tables/product-supplier',
        element: <WrapperRouteComponent element={<ProductSupplier />} titleId="title.productSupplier" />,
      },
      {
        path: '/main-tables/costumer-info',
        element: <WrapperRouteComponent element={<CostumerInfo />} titleId="title.costumerInfo" />,
      },
      {
        path: '/:media_id',
        element: <WrapperRouteComponent element={<MediaDetailsPage />} titleId="title.homepage" />,
      },
      {
        path: 'account',
        element: <WrapperRouteComponent element={<DashboardPage />} titleId="title.account" />,
      },
      {
        path: 'metadata',
        element: <WrapperRouteComponent element={<MetadataPage />} titleId="title.metadata" />,
      },
      {
        path: 'advanced-search',
        element: <WrapperRouteComponent element={<AdvancedSearchPage />} titleId="title.advanced-search" />,
      },
      {
        path: 'favorites',
        element: <WrapperRouteComponent element={<FavoritesPage />} titleId="title.favorites" />,
      },
      {
        path: 'reports',
        element: <WrapperRouteComponent element={<ReportsPage />} titleId="title.reports" />,
      },
      {
        path: '*',
        element: <WrapperRouteComponent element={<NotFound />} titleId="title.notFount" />,
      },
    ],
  },
];

const RenderRouter: FC = () => {
  const element = useRoutes(routeList);

  return element;
};

export default RenderRouter;
