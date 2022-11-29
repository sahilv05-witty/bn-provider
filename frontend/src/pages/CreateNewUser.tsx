import { Form, Container, Item } from 'semantic-ui-react'

import {InputButton, InputField, InputSelect} from '../form-controls';
import {ProviderFooter,ProviderHeader,ProviderSubHeader} from '../sharedComponents';
import "./ProviderFormPage.scss";


function CreateNewUser() {
  return (
    <Item as="div" className='Provider-Form-Page'>
      <ProviderHeader/>
      <ProviderSubHeader />
      <Container fluid>
        <Form>
          <InputField  label="First Name" inline placeholder='First Name' required/>
          <InputField  label="Last Name" inline placeholder='Last Name' required/>
          <InputField  type="email" label="Email" inline placeholder='Email Address' required/>
            <InputSelect inline fluid placeholder='Select Role' label="Role" required />
          <InputButton text="Save" inline fluid requiredHintText/>
        </Form>
    </Container>
    <ProviderFooter />
    </Item>
  )
}

export default CreateNewUser