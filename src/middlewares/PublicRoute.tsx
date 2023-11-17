import { ReactNode } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

interface PublicRouteProps {
  token: string | null;
  redirectPath?: string;
  children?: ReactNode;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ token, redirectPath = '/dashboard', children }) => {
  const location = useLocation();

  if (token) {
    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  }

  return children || <Outlet />;
};

export default PublicRoute;
