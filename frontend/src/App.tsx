import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.scss';
import { RequireAuth } from './components/shared';
import AccountActivation from './pages/AccountActivation';
import CreateAdminUser from './pages/CreateAdminUser';
import CreateProviderUser from './pages/CreateProviderUser';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import { PatientStatus } from './pages/PatientStatus/PatientStatus';
import { TermOfUse } from './pages/TermOfUse/TermOfUse';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='login' element={<Login />} />
        <Route
          path='account-activation/:activationToken'
          element={<AccountActivation />}
        />
        <Route path='/' element={<Home />} />
        <Route path='term-of-use' element={<TermOfUse />} />
        <Route
          path='patients'
          element={
            <RequireAuth>
              <PatientStatus />
            </RequireAuth>
          }
        />
        <Route
          element={
            <RequireAuth checkAuthorization>
              <CreateAdminUser />
            </RequireAuth>
          }
          path='create-admin-user'
        />
        <Route
          element={
            <RequireAuth checkAuthorization>
              <CreateProviderUser />
            </RequireAuth>
          }
          path='create-provider-user'
        />
        <Route element={<Login />} path='*' />
      </Routes>
    </Router>
  );
}

export default App;
