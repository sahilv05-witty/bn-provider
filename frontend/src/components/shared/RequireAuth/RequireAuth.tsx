import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';

type RequireAuthProps = {
  checkAuthorization?: boolean;
  children: JSX.Element;
};

const RequireAuth = ({ children, checkAuthorization }: RequireAuthProps) => {
  const location = useLocation();
  const auth = useAuth();

  if (!auth.user) {
    return <Navigate to='/login' state={{ path: location.pathname }} />;
  }

  // if (checkAuthorization && auth.user.isProvider) {
  //   <ModalPopup showPopup />;
  //   return <Navigate to='/' state={{ path: location.pathname }} />;
  // }

  return children;
};

export default RequireAuth;
