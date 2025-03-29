import type { FC } from 'react';
import type { RouteObject } from 'react-router';

import { lazy } from 'react';
// import { Navigate } from 'react-router';
import { useRoutes } from 'react-router-dom';

import { createCategory } from '@/pages/grouping-specifications/util';
import { createFactor } from '@/pages/inc-dec-factors/util';
import LayoutPage from '@/pages/layout';

import WrapperRouteComponent from './config';
import ListOfProforma from '@/pages/home/ListOfProforma';
import ProtectedRoute from '@/pages/ProtectedRoute';

const NotFound = lazy(() => import(/* webpackChunkName: "404'"*/ '@/pages/404'));
const MetadataPage = lazy(() => import(/* webpackChunkName: "404'"*/ '@/pages/metadata'));
const AdvancedSearchPage = lazy(() => import(/* webpackChunkName: "guide'"*/ '@/pages/advanced-search'));
const FavoritesPage = lazy(() => import(/* webpackChunkName: "form'"*/ '@/pages/favorites'));
const ReportsPage = lazy(() => import(/* webpackChunkName: "basic-page" */ '@/pages/reports'));
const HomePage = lazy(() => import(/* webpackChunkName: "basic-page" */ '@/pages/home'));
const DashboardPage = lazy(() => import(/* webpackChunkName: "basic-page" */ '@/pages/account'));
const ListOfPersonCompany = lazy(() => import('@/pages/person-company-info/ListOfPersonCompany'));
const ListOfFactors = lazy(() => import('@/pages/inc-dec-factors/ListOfFactors'));
const Supplier = lazy(() => import('@/pages/supplier'));
const ProductSupplier = lazy(() => import('@/pages/product-supplier'));
const ProductInfo = lazy(() => import('@/pages/product-info'));
const CompanyPersonInfo = lazy(() => import('@/pages/person-company-info'));
const LoginPage = lazy(() => import('@/pages/login'));
const IncDecFactors = lazy(() => import('@/pages/inc-dec-factors'));
const GroupingSpecifications = lazy(() => import('@/pages/grouping-specifications'));
const ListOfProducts = lazy(() => import('@/pages/product-info/ListOfProducts'));
const CostumerInfo = lazy(() => import('@/pages/costumer-info'));
const ListOfGroups = lazy(() => import('@/pages/grouping-specifications/ListOfGroups'));

const routeList: RouteObject[] = [
  {
    path: '/login',
    element: (
      <WrapperRouteComponent
        element={
          <ProtectedRoute>
            <LoginPage />
          </ProtectedRoute>
        }
        titleId="title.login"
      />
    ),
  },
  {
    path: '/',
    element: (
      <WrapperRouteComponent
        element={
          <ProtectedRoute>
            <LayoutPage />
          </ProtectedRoute>
        }
        titleId="title.homepage"
      />
    ),
    children: [
      {
        path: '',
        element: <WrapperRouteComponent element={<HomePage />} titleId="title.homepage" />,
      },
      {
        path: '/proforma-list',
        element: <WrapperRouteComponent element={<ListOfProforma />} titleId="title.homepage" />,
      },
      {
        path: '/main-tables/grouping-specifications',
        element: (
          <WrapperRouteComponent
            element={<GroupingSpecifications onSubmit={values => createCategory(values)} showButton={true} />}
            titleId="title.grouping"
          />
        ),
      },
      {
        path: '/main-tables/grouping-specifications/groups-list',
        element: <WrapperRouteComponent element={<ListOfGroups />} titleId="title.grouping" />,
      },
      {
        path: '/main-tables/product-info',
        element: <WrapperRouteComponent element={<ProductInfo />} titleId="title.productInfo" />,
      },
      {
        path: '/main-tables/product-info/products-list',
        element: <WrapperRouteComponent element={<ListOfProducts />} titleId="title.productInfo" />,
      },
      {
        path: '/main-tables/product-info/groups-list',
        element: <WrapperRouteComponent element={<ListOfGroups />} titleId="title.productInfo" />,
      },
      {
        path: '/main-tables/person-company-info',
        element: <WrapperRouteComponent element={<CompanyPersonInfo />} titleId="title.personCompanyInfo" />,
      },
      {
        path: '/main-tables/person-company-info/person-company-list',
        element: <WrapperRouteComponent element={<ListOfPersonCompany />} titleId="title.personCompanyInfo" />,
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
        path: '/main-tables/factors',
        element: (
          <WrapperRouteComponent
            element={<IncDecFactors onSubmit={values => createFactor(values)} showButton={true} />}
            titleId="title.incDecFactors"
          />
        ),
      },
      {
        path: '/main-tables/factors/factors-list',
        element: <WrapperRouteComponent element={<ListOfFactors />} titleId="title.incDecFactors" />,
      },
      {
        path: '/main-tables/supplier',
        element: <WrapperRouteComponent element={<Supplier />} titleId="title.supplier" />,
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
