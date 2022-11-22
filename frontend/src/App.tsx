import './App.scss';
import {Item} from 'semantic-ui-react';
import Login from './pages/Login';
import ProviderHeader from './sharedComponents/ProviderHeader';
import ProviderFooter from "./sharedComponents/ProviderFooter";
import AccountActivation from './pages/AccountActivation';

function App() {
  return (
    <>
    <ProviderHeader/>
    <Item as="div" className="pages">
      <AccountActivation />
    </Item>
    <ProviderFooter />
    </>
  );
}

export default App;
