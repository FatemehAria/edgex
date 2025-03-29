import React, { lazy, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
const LoginPage = lazy(() => import('@/pages/login'));

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const [userToken, setUserToken] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setUserToken(localStorage.getItem('t') || '');
  }, [localStorage.getItem('t')]);

  useEffect(() => {
    if (userToken) {
      navigate('/');
    } else {
      navigate('/login');
    }
  }, [userToken]);

  return userToken !== '' ? <>{children}</> : <LoginPage />;
}

export default ProtectedRoute;
