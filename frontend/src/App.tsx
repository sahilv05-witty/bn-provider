import './App.scss';
import {Container} from 'semantic-ui-react';
import Login from './pages/Login';
import ProviderHeader from './sharedComponents/ProviderHeader';
import ProviderFooter from "./sharedComponents/ProviderFooter";
import AccountActivation from './pages/AccountActivation';
import CreateNewUser from './pages/CreateNewUser';

function App() {
  return (
    <>
    
      <AccountActivation />
      {/* <Login /> */}
      {/* <CreateNewUser /> */}
    
   
    </>
  );
}

export default App;
