import type { FC } from 'react';

import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

interface PublicRouteProps {
  element: React.ReactElement;
}

const PublicRoute: FC<PublicRouteProps> = ({ element }) => {
  const { logged } = useSelector((state: any) => state.user);

  return logged ? <Navigate to="/" replace /> : element;
};

export default PublicRoute;
