import { Container, Form, Header, Item } from 'semantic-ui-react';
import { InputButton } from '../controls';
import InputField from '../controls/InputField';
import InputTermPolicy from '../controls/InputTermPolicy';
import StringField from '../controls/StringField';
import ProviderFooter from '../sharedComponents/ProviderFooter';
import ProviderHeader from '../sharedComponents/ProviderHeader';
import ProviderSubHeader from '../sharedComponents/ProviderSubHeader';
import './ProviderFormPage.scss';

function AccountActivation() {
  return (
    <Item as='div' className='Provider-Form-Page'>
      <ProviderHeader />
      <ProviderSubHeader />
      <Container fluid>
        <Item as='div' className='content'>
          <Header as='h5' textAlign='center'>
            Welcome to the Provider Portal, please set your password and agree
            to the terms of use.
          </Header>
          <Form>
            <StringField inline label='First Name ' text='John' />
            <StringField inline label='Last Name ' text='Smith' />
            <StringField inline label='Email ' text='john@smith.com' />
            <StringField inline label='Provider Group ' text='Smith Group' />
            <InputField
              name='password'
              type='password'
              label='CREATE PASSWORD'
              inline
              placeholder='Password'
              required
              hint
            />
            <InputField
              name='password'
              type='password'
              label='CONFIRM PASSWORD'
              inline
              placeholder='Confirm Password'
              required
            />
            <InputTermPolicy inline AddClass='empty-label' />
            <InputButton
              text='Continue'
              inline
              fluid
              requiredHintText
              AddClass='mb-0 empty-label'
            />
          </Form>
        </Item>
      </Container>
      <ProviderFooter />
    </Item>
  );
}

export default AccountActivation;
