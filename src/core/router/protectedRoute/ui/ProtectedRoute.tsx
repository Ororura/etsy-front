import { FC, PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute: FC<PropsWithChildren> = ({ children }) => {
  const accessToken = localStorage.getItem('accessToken');

  if (!accessToken) {
    return <Navigate to='/login' replace />;
  }

  return children;
};

export { ProtectedRoute };
