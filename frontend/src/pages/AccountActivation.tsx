import { Form, Header, Container, Item } from 'semantic-ui-react'
import {InputButton, InputField, InputTermPolicy, StringField} from '../form-controls';
import {ProviderFooter,ProviderHeader,ProviderSubHeader} from '../sharedComponents';
import "./ProviderFormPage.scss";


function AccountActivation() {
  // function getData(){
  //   return "Vivek Yadav"
  // }
  // console.log("=================================");
  // console.log(getData());
  return (
    <Item as="div" className='Provider-Form-Page'>
      <ProviderHeader />
      <ProviderSubHeader />
      <Container fluid>
        <Item as="div" className='content'>
        <Header as="h5" textAlign='center'>Welcome to the Provider Portal, please set your password and agree to the terms of use.</Header>
        <Form>
            <StringField inline label="First Name " text="John"/>
            <StringField inline label="Last Name " text="Smith"/>
            <StringField inline label="Email " text="john@smith.com"/>
            <StringField inline label="Provider Group " text="Smith Group"/>
            <InputField  type='password' label="CREATE PASSWORD" inline placeholder='Password' required hint />
            <InputField type='password' label="CONFIRM PASSWORD" inline placeholder='Confirm Password'  required/>
            <InputTermPolicy inline AddClass="empty-label"/>
            <InputButton text="Continue" inline fluid requiredHintText AddClass='mb-0 empty-label'/>
        </Form>
        </Item>
    </Container>
    <ProviderFooter />
    </Item>
  )
}

export default AccountActivation