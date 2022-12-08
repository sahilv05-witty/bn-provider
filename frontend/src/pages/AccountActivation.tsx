import { useMutation } from '@apollo/client';
import jwtDecode from 'jwt-decode';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Container, Form, Header, Item } from 'semantic-ui-react';
import {
  InputButton,
  InputField,
  InputTermPolicy,
  StringField,
} from '../controls/form';
import {
  ProviderFooter,
  ProviderHeader,
  ProviderSubHeader,
} from '../controls/sharedComponents';
import { useForm } from '../hooks/useForm';
import { mutationActivateAccount } from '../services';

let hintText = `Password must be at least 8 characters long, contain at least one lower case letter, one upper case letter, one digit, and one special character.`;

const PageTitle = [
  { key: 'Account Activation', content: 'Account Activation', active: true },
];

type ActivationToken = {
  exp: number;
  iat: number;
  sno: number;
  user: UserAccountActivation;
};

type UserAccountActivation = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
  isActivationToken: boolean;
  isProvider: boolean;
  provider: string;
  providerGroup: string;
};

type AccountActivationForm = {
  password: string;
  confirmPassword: string;
};

const AccountActivation = () => {
  const { activationToken } = useParams();
  const [userDetails, setUserDetails] = useState<UserAccountActivation>(
    {} as UserAccountActivation
  );
  const navigate = useNavigate();

  function accountActivationCallback() {
    activateAccount();
  }

  const loadInitialData = () => {
    try {
      if (!activationToken) {
        navigate('/login');
        alert('Invalid token');
        return;
      }
      const decodedToken: ActivationToken = jwtDecode(activationToken || '');

      if (decodedToken.exp * 1000 < Date.now()) {
        navigate('/login');
        alert('Invalid activation link: Activation link has been expired.');
        return;
      }

      const userDetailsFromToken = decodedToken.user as UserAccountActivation;
      userDetailsFromToken.id = decodedToken.sno;

      setUserDetails(userDetailsFromToken);
    } catch (error) {
      alert('Invalid token');
      navigate('/login');
    }
  };

  const { onChange, onSubmit, formState } = useForm<AccountActivationForm>(
    accountActivationCallback,
    {} as AccountActivationForm
  );

  const [activateAccount, { loading }] = useMutation(mutationActivateAccount, {
    update(proxy, { data }) {
      alert(
        'Account has been activated successfully.  Please login with your credential.'
      );
      navigate('/');
    },
    onError({ graphQLErrors }) {
      if (graphQLErrors && graphQLErrors.length > 0) {
        const errorDetails = graphQLErrors[0];

        if (errorDetails.message === 'Invalid Activation token.') {
          alert('Invalid Account Activation Token');
        }
      }
    },
    variables: {
      activateAccountInput: {
        id: userDetails.id,
        password: formState.confirmPassword,
        activationToken: activationToken,
      },
    },
  });

  useEffect(() => {
    if (!userDetails.email) {
      loadInitialData();
    }
  }, []);

  return (
    <Item as='div' className='Provider-Form-Page'>
      <ProviderHeader />
      <ProviderSubHeader PageTitle={PageTitle} />
      <Container fluid>
        <Item as='div' className='content'>
          <Header as='h5' textAlign='center'>
            Welcome to the Provider Portal, please set your password and agree
            to the terms of use.
          </Header>
          <Form>
            <StringField
              inline
              label='First Name '
              text={userDetails.firstName}
            />
            <StringField
              inline
              label='Last Name '
              text={userDetails.lastName}
            />
            <StringField inline label='Email ' text={userDetails.email} />
            {userDetails.isProvider === true && (
              <>
                <StringField
                  inline
                  label='Provider '
                  text={userDetails.provider}
                />
                <StringField
                  inline
                  label='Provider Group '
                  text={userDetails.providerGroup}
                />
              </>
            )}
            <InputField
              name='password'
              type='password'
              label='CREATE PASSWORD'
              inline
              placeholder='Password'
              required
              hint={hintText}
              value={formState.password}
              onChange={({ target: { name, value } }) => onChange(name, value)}
            />
            <InputField
              name='confirmPassword'
              type='password'
              label='CONFIRM PASSWORD'
              inline
              placeholder='Confirm Password'
              required
              value={formState.confirmPassword}
              onChange={({ target: { name, value } }) => onChange(name, value)}
            />
            <InputTermPolicy inline AddClass='empty-label' />
            <InputButton
              loading={loading}
              text='Continue'
              inline
              fluid
              requiredHintText
              AddClass='mb-0 empty-label'
              onClick={onSubmit}
            />
          </Form>
        </Item>
      </Container>
      <ProviderFooter />
    </Item>
  );
};

export default AccountActivation;
