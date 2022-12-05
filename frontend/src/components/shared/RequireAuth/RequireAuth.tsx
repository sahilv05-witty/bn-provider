import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';

type RequireAuthProps = {
  children: JSX.Element;
};

export const RequireAuth = ({ children }: RequireAuthProps) => {
  const location = useLocation();
  const auth = useAuth();

  if (!auth.user) {
    return <Navigate to='/login' state={{ path: location.pathname }} />;
  }

  return children;
};
