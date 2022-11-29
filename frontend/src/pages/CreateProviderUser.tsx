import { Form, Container, Item } from 'semantic-ui-react'
import InputButton from '../form-controls/InputButton';
import InputField from '../form-controls/InputField';
import InputSelect from '../form-controls/InputSelect';
import StringField from '../form-controls/StringField';
import InputCheckbox from '../form-controls/InputCheckbox';
import ProviderHeader from '../sharedComponents/ProviderHeader';
import ProviderSubHeader from '../sharedComponents/ProviderSubHeader';
import ProviderFooter from '../sharedComponents/ProviderFooter';
import "./ProviderFormPage.scss";

const roleOption = [
  {value: "Provider 1", text: "Provider 1"},
  {value: "Provider 2", text: "Provider 2"}

]
const doctorGroup = [
  {value: "Group A", text: "Group A"},
  {value: "Group B", text: "Group B"}

]

const doctorText = "“Dr.” will be used in the salutation of the activation email when this is yes. The user’s first name will be used when this is no.";
const errorText = "First name can only contain letters, apostrophes, hyphens, and periods.";
function CreateProviderUser() {
  return (
    <Item as="div" className='Provider-Form-Page'>
      <ProviderHeader/>
      <ProviderSubHeader />
      <Container fluid>
      <Item as="div" className='content'>
        <Form>
            <InputCheckbox label="Doctor" inline toggle text={doctorText} />
            <InputField  label="First Name" inline placeholder='First Name' required error={errorText}/>
            <InputField  label="Last Name" inline placeholder='Last Name' required/>
            <InputField  type="email" label="Email" inline placeholder='Email Address' required/>
            <InputSelect options={roleOption} inline fluid placeholder='Select Provider' label="Provider" required />
            <StringField inline  label="Doctor Group" text="BetterNight Group of Doctors" />
            <InputButton  AddClass='mb-0 empty-label' text="Save" inline fluid requiredHintText/>
            <InputButton  text="Cancel" inline fluid AddClass='btn-secondary empty-label mb-0' />
        </Form>
        </Item>
    </Container>
    <ProviderFooter />
    </Item>
  )
}

export default CreateProviderUser