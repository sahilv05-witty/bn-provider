import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { PatientStatus } from '../PatientStatus/PatientStatus';
import Users from '../Users/Users';

const Home = () => {
  const auth = useAuth();

  if (!auth.user) {
    return <Navigate to='/login' />;
  }

  const { isProvider } = auth.user;

  if (isProvider) {
    return <PatientStatus />;
  }

  return <Users />;
};

export default Home;
