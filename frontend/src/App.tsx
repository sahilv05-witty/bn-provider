import './App.scss';
import Login from './pages/Login/Login';
import AccountActivation from './pages/AccountActivation';
import CreateAdminUser from './pages/CreateAdminUser';
import CreateProviderUser from './pages/CreateProviderUser';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route  element={<AccountActivation />} path="/account-activation" />
        <Route element={<CreateAdminUser />} path="/create-admin-user" />
        <Route element={<CreateProviderUser />} path="/create-provider-user" />
        <Route element={<Login />} path="/login"  />
        <Route element={<Login />} path="/"  />
        <Route element={<Login />} path="*"  />
      </Routes>
    </Router>
  );
}

export default App;
