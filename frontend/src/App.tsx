import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './pages/Login/Login';
import AccountActivation from './pages/AccountActivation';
import CreateAdminUser from './pages/CreateAdminUser';
import CreateProviderUser from './pages/CreateProviderUser';
import { PatientStatus } from './pages/PatientStatus/PatientStatus';
import './App.scss';
import { TermOfUse } from './pages/TermOfUse/TermOfUse';
import { UserContextProvider } from './context/UserContext';
import { RequireAuth } from './components/shared/RequireAuth/RequireAuth';
import Home from './pages/Home/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<TermOfUse />} path='term-of-use' />
        <Route
          element={
            <RequireAuth>
              <PatientStatus />
            </RequireAuth>
          }
          path='patients'
        />
        <Route
          element={
            <RequireAuth>
              <AccountActivation />
            </RequireAuth>
          }
          path='account-activation'
        />
        <Route
          element={
            <RequireAuth>
              <CreateAdminUser />
            </RequireAuth>
          }
          path='create-admin-user'
        />
        <Route
          element={
            <RequireAuth>
              <CreateProviderUser />
            </RequireAuth>
          }
          path='create-provider-user'
        />
        <Route element={<Login />} path='login' />
        <Route element={<Home />} path='/' />
        <Route element={<Login />} path='*' />
      </Routes>
    </Router>
  );
}

export default App;
