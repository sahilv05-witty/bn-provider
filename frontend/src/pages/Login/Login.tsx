import { useMutation } from '@apollo/client';
import { useReducer, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Container, Form, Header, Item } from 'semantic-ui-react';
import errorIcon from '../../assets/img/error-icon.svg';
import { InputButton, InputField } from '../../controls/form';
import {
  ProviderFooter,
  ProviderHeader,
} from '../../controls/sharedComponents';
import { useAuth } from '../../hooks/useAuth';
import { mutationLoginUser } from '../../services';
import './Login.scss';

type LoginForm = {
  email: string;
  password: string;
};

type ActionTypesProps = 'email' | 'password' | 'reset';

type Action = {
  type: ActionTypesProps;
  payload: string;
};

const initialData: LoginForm = {} as LoginForm;

const userReducer = (state = initialData, action: Action) => {
  if (action.type === 'reset') return { ...initialData };
  return { ...state, [action.type]: action.payload };
};

const INVALID_CREDENTIALS = 'Invalid email or password.';
const INVALID_CREDENTIALS_ACCOUNT_LOCKED =
  'Invalid password. Your account has been temporarily locked due to too many unsuccessful log in attempts. You can try again in 10 minutes.';

const Login = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [user, dispatchFieldChange] = useReducer(userReducer, initialData);
  const location = useLocation();

  const auth = useAuth();

  const redirectTo =
    location.state && location.state.path !== 'login'
      ? location.state.path
      : '/';

  if (auth.user) {
    return <Navigate to={redirectTo} />;
  }

  const [loginUserMutation] = useMutation(mutationLoginUser);
  const navigate = useNavigate();

  const updateFieldValue = (fieldName: ActionTypesProps, value: string) => {
    if (errorMessage !== '') {
      setErrorMessage('');
    }

    dispatchFieldChange({
      type: fieldName,
      payload: value,
    });
  };

  const handleLogin = async () => {
    const { email, password } = user;

    if (!email || !password) {
      return;
    }

    try {
      const result = await loginUserMutation({
        variables: {
          email,
          password,
        },
      });

      const userDetails = result.data.login;

      if (userDetails && userDetails.email === user.email) {
        auth.setUser(userDetails);
        navigate(redirectTo, { replace: true });
      }
    } catch (error: any) {
      const { errors, data } = error;

      if (data === null && errors) {
        const errorDetails = errors[0];

        if (
          errorDetails.message === 'User not found' ||
          errorDetails.extensions.code === '404'
        ) {
          setErrorMessage(INVALID_CREDENTIALS);
        }
      }
    }
  };

  return (
    <Item as='div' className='Login'>
      <ProviderHeader />
      <Container fluid>
        <Item as='div' style={{ maxWidth: 300, margin: '0 auto' }}>
          <Header as='h1' className='title' content='PROVIDER PORTAL' />
          <Form size='massive'>
            {/* ERROR  */}
            {errorMessage && (
              <Header
                block
                className='error'
                image={errorIcon}
                color='red'
                content={errorMessage}
              />
            )}
            <Header as='h1' className='title' content='Sign In' />
            <InputField
              name='email'
              type='email'
              placeholder='WORK EMAIL'
              value={user.email}
              onChange={({ target }: React.ChangeEvent<HTMLInputElement>) => {
                const { name, value } = target;
                updateFieldValue(name as ActionTypesProps, value);
              }}
            />
            <InputField
              name='password'
              type='password'
              placeholder='PASSWORD'
              value={user.password}
              onChange={({ target }: React.ChangeEvent<HTMLInputElement>) => {
                const { name, value } = target;
                updateFieldValue(name as ActionTypesProps, value);
              }}
            />
            <InputButton
              text='CONTINUE'
              fluid
              size='massive'
              onClick={handleLogin}
            />
            <Item as='a' className='link'>
              FORGOT PASSWORD
            </Item>
          </Form>
        </Item>
      </Container>
      <ProviderFooter />
    </Item>
  );
};

export default Login;
