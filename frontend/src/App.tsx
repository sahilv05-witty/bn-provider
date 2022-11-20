import React from 'react';
import logo from './logo.svg';
import './App.scss';
import {Item} from 'semantic-ui-react';
import Login from './pages/Login';
import ProviderHeader from './sharedComponents/ProviderHeader';
import ProviderFooter from "./sharedComponents/ProviderFooter";

function App() {
  return (
    <>
    <ProviderHeader/>
    <Item as="div" className="pages">
      <Login />
    </Item>
    <ProviderFooter />
    </>
  );
}

export default App;
