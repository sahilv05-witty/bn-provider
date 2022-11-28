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
  const myFunction = () =>{
    alert("This is working.")
  }
  return (
    <Item as="div" className='Provider-Form-Page'>
      <ProviderHeader/>
      <ProviderSubHeader />
      <Container fluid>
        <Item as='div' className='content'>
        <Form>
          <InputField  label="First Name" inline placeholder='First Name' required/>
          <InputField  label="Last Name" inline placeholder='Last Name' required/>
          <InputField  type="email" label="Email" inline placeholder='Email Address' required/>
          <InputSelect options={roleOption} inline fluid placeholder='Select Role' label="Role" required />
          <InputButton onClick={myFunction} AddClass='mb-0 empty-label' disabled text="Save" inline fluid requiredHintText/>
          <InputButton text="Cancel" inline fluid AddClass='btn-secondary empty-label'/>
        </Form>
        </Item>
    </Container>
    <ProviderFooter />
    </Item>
  )
}

export default CreateAdminUser