import React, { FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const AuthRoute: FC = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to='/login' replace />;
  }

  return <Outlet />;
};

export default AuthRoute;
