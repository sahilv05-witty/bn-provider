import React from 'react';
import logo from './logo.svg';
import './App.css';
import InputField from './form-controls/pp-input';
import {Form} from 'semantic-ui-react';
function App() {
  // let a:{disabled:boolean} = {
  //   disabled:true
  // };
  // let a=true;
  // let label='It disabled';
  return (
<Form>
<InputField dis={true}  fieldClass='newName'  placeholder={'Moin ji World'} /> 
</Form>
    
    
  );
}

export default App;
