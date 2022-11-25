import { Form, Container, Item } from 'semantic-ui-react'
import InputButton from '../form-controls/InputButton';
import InputField from '../form-controls/InputField';
import InputSelect from '../form-controls/InputSelect';
import ProviderHeader from '../sharedComponents/ProviderHeader';
import ProviderSubHeader from '../sharedComponents/ProviderSubHeader';
import ProviderFooter from '../sharedComponents/ProviderFooter';
import "./ProviderFormPage.scss";

const roleOption = [
  {value: "Account Admin", text: "Account Admin"},
  {value: "Super Admin", text: "Super Admin"}

]

function CreateAdminUser() {
  return (
    <Item as="div" className='Provider-Form-Page'>
      <ProviderHeader/>
      <ProviderSubHeader />
      <Container fluid>
        <Form>
          <InputField  label="First Name" inline placeholder='First Name' required/>
          <InputField  label="Last Name" inline placeholder='Last Name' required/>
          <InputField  type="email" label="Email" inline placeholder='Email Address' required/>
            <InputSelect options={roleOption} inline fluid placeholder='Select Role' label="Role" required />
            <InputButton AddClass='mb-0' text="Save" inline fluid requiredHintText/>
            <InputButton text="Cancel" inline fluid basic />
        </Form>
    </Container>
    <ProviderFooter />
    </Item>
  )
}

export default CreateAdminUser