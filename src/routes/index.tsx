import type { FC } from 'react';
import type { RouteObject } from 'react-router';

import { lazy } from 'react';
// import { Navigate } from 'react-router';
import { useRoutes } from 'react-router-dom';

import { createCategory } from '@/pages/grouping-specifications/util';
import ListOfProforma from '@/pages/home/ListOfProforma';
import { createFactor } from '@/pages/inc-dec-factors/util';
import LayoutPage from '@/pages/layout';
import ApprovedProformaReports from '@/pages/reports/ApprovedProformaReports';

import WrapperRouteComponent from './config';
import PublicRoute from './publicRoute';

const NotFound = lazy(() => import(/* webpackChunkName: "404'"*/ '@/pages/404'));
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
    element: <WrapperRouteComponent element={<PublicRoute element={<LoginPage />} />} titleId="title.login" />,
  },
  {
    path: '/',
    element: <WrapperRouteComponent element={<LayoutPage />} titleId="title.homepage" auth={true} />,
    children: [
      {
        path: '',
        element: <WrapperRouteComponent element={<HomePage />} titleId="title.homepage" auth={true} />,
      },
      {
        path: '/proforma-list',
        element: <WrapperRouteComponent element={<ListOfProforma />} titleId="title.homepage" auth={true} />,
      },
      {
        path: '/main-tables/grouping-specifications',
        element: (
          <WrapperRouteComponent
            element={<GroupingSpecifications onSubmit={values => createCategory(values)} showButton={true} />}
            titleId="title.grouping"
            auth={true}
          />
        ),
      },
      {
        path: '/main-tables/grouping-specifications/groups-list',
        element: <WrapperRouteComponent element={<ListOfGroups />} titleId="title.grouping" auth={true} />,
      },
      {
        path: '/main-tables/product-info',
        element: <WrapperRouteComponent element={<ProductInfo />} titleId="title.productInfo" auth={true} />,
      },
      {
        path: '/main-tables/product-info/products-list',
        element: <WrapperRouteComponent element={<ListOfProducts />} titleId="title.productInfo" auth={true} />,
      },
      {
        path: '/main-tables/product-info/groups-list',
        element: <WrapperRouteComponent element={<ListOfGroups />} titleId="title.productInfo" auth={true} />,
      },
      {
        path: '/main-tables/person-company-info',
        element: (
          <WrapperRouteComponent element={<CompanyPersonInfo />} titleId="title.personCompanyInfo" auth={true} />
        ),
      },
      {
        path: '/main-tables/person-company-info/person-company-list',
        element: (
          <WrapperRouteComponent element={<ListOfPersonCompany />} titleId="title.personCompanyInfo" auth={true} />
        ),
      },
      {
        path: '/main-tables/product-supplier',
        element: <WrapperRouteComponent element={<ProductSupplier />} titleId="title.productSupplier" auth={true} />,
      },
      {
        path: '/main-tables/costumer-info',
        element: <WrapperRouteComponent element={<CostumerInfo />} titleId="title.costumerInfo" auth={true} />,
      },
      {
        path: '/main-tables/factors',
        element: (
          <WrapperRouteComponent
            element={<IncDecFactors onSubmit={values => createFactor(values)} showButton={true} />}
            titleId="title.incDecFactors"
            auth={true}
          />
        ),
      },
      {
        path: '/main-tables/factors/factors-list',
        element: <WrapperRouteComponent element={<ListOfFactors />} titleId="title.incDecFactors" auth={true} />,
      },
      {
        path: '/main-tables/supplier',
        element: <WrapperRouteComponent element={<Supplier />} titleId="title.supplier" auth={true} />,
      },
      {
        path: 'account',
        element: <WrapperRouteComponent element={<DashboardPage />} titleId="title.account" auth={true} />,
      },
      {
        path: 'reports',
        element: <WrapperRouteComponent element={<ReportsPage />} titleId="title.reports" auth={true} />,
      },
      {
        path: '/reports/confirmed-reports',
        element: (
          <WrapperRouteComponent element={<ApprovedProformaReports />} titleId="title.confirmedReports" auth={true} />
        ),
      },
      {
        path: '*',
        element: <WrapperRouteComponent element={<NotFound />} titleId="title.notFount" auth={true} />,
      },
    ],
  },
];

const RenderRouter: FC = () => {
  const element = useRoutes(routeList);

  return element;
};

export default RenderRouter;
