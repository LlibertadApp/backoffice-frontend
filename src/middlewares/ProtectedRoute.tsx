import { ReactNode } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

interface PrivateRouteProps {
  token: string | null;
  redirectPath?: string;
  children?: ReactNode;
}

const ProtectedRoute: React.FC<PrivateRouteProps> = ({ token, redirectPath = '/', children }) => {
  const location = useLocation();

  if (!token) {
    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  }

  return children || <Outlet />;
};

export default ProtectedRoute;
