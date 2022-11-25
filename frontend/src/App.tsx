import './App.scss';
import Login from './pages/Login';
import AccountActivation from './pages/AccountActivation';
import CreateNewUser from './pages/CreateNewUser';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<AccountActivation />} path='/account-activation' />
        <Route element={<CreateNewUser />} path='/create-user' />
        <Route element={<Login />} path='/' />
      </Routes>
    </Router>
  );
}

export default App;
