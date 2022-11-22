import { Form, Header, Container } from 'semantic-ui-react'
import InputButton from '../form-controls/InputButton';
import InputField from '../form-controls/InputField';
import StringField from '../form-controls/StringField';
import "./AccountActivation.scss";


function AccountActivation() {
  return (
    <Container fluid className='Account-activation'>
    <Form>
        <Header as="h5" textAlign='center'>Welcome to the Provider Portal, please set your password and agree to the terms of use.</Header>
        <StringField inline label="First Name " text="John"/>
        <StringField inline label="Last Name " text="Smith"/>
        <StringField inline label="Email " text="john@smith.com"/>
        <StringField inline label="Provider Group " text="Smith Group"/>
        <InputField label="CREATE PASSWORD" inline placeholder='Password' required hint/>
        <InputField label="CONFIRM PASSWORD" inline placeholder='Confirm Password' required/>
        <InputButton text="Continue" inline fluid requiredHintText/>
    </Form>
    </Container>
  )
}

export default AccountActivation