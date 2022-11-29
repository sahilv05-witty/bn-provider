import { Container, Form, Item } from 'semantic-ui-react';
import { InputButton, InputCheckbox, InputSelect } from '../controls';
import InputField from '../controls/InputField';
import StringField from '../controls/StringField';
import ProviderFooter from '../sharedComponents/ProviderFooter';
import ProviderHeader from '../sharedComponents/ProviderHeader';
import ProviderSubHeader from '../sharedComponents/ProviderSubHeader';
import './ProviderFormPage.scss';

const roleOption = [
  { value: 'Provider 1', text: 'Provider 1' },
  { value: 'Provider 2', text: 'Provider 2' },
];
const doctorGroup = [
  { value: 'Group A', text: 'Group A' },
  { value: 'Group B', text: 'Group B' },
];

const doctorText =
  '“Dr.” will be used in the salutation of the activation email when this is yes. The user’s first name will be used when this is no.';

function CreateProviderUser() {
  return (
    <Item as='div' className='Provider-Form-Page'>
      <ProviderHeader />
      <ProviderSubHeader />
      <Container fluid>
        <Item as='div' className='content'>
          <Form>
            <InputCheckbox label='Doctor' inline toggle text={doctorText} />
            <InputField
              name='firstName'
              label='First Name'
              inline
              placeholder='First Name'
              required
            />
            <InputField
              name='lastName'
              label='Last Name'
              inline
              placeholder='Last Name'
              required
            />
            <InputField
              name='email'
              type='email'
              label='Email'
              inline
              placeholder='Email Address'
              required
            />
            <InputSelect
              name='roles'
              options={roleOption}
              inline
              fluid
              placeholder='Select Provider'
              label='Provider'
              required
            />
            <StringField
              inline
              label='Doctor Group'
              text='BetterNight Group of Doctors'
            />
            <InputButton
              AddClass='mb-0 empty-label'
              text='Save'
              inline
              fluid
              requiredHintText
            />
            <InputButton
              text='Cancel'
              inline
              fluid
              AddClass='btn-secondary empty-label mb-0'
            />
          </Form>
        </Item>
      </Container>
      <ProviderFooter />
    </Item>
  );
}

export default CreateProviderUser;
