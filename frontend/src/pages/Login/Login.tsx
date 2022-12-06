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
const emailPattern = new RegExp("^[_a-zA-Z0-9!#$%&'*+-/=?^_`{|}~;]+(\\.[_a-zA-Z0-9!#$%&'*+-/=?^_`{|}~;]+)*@[a-zA-Z0-9-]+(\\.[a-zA-Z0-9-]+)*(\\.[a-zA-Z]{2,})$");
const passwordPattern = new RegExp("^(?!.*\\s)(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[~!@#$%^&*()_+])(?=.*?[0-9]).{8,}$");
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
  const [isEmailValid,updateEmail] = useState(false);
  const [isPasswordValid,updatePasswordValid]= useState(false);
  const isLoginFormValid = ():boolean=>{
    let isValid = true;
    const { email, password } = user;
    if (!email || !password || !isEmailValid || !isPasswordValid) {        
      isValid = false;
      }
    return isValid;
  }
  const [submitted,updateSubmitted] = useState(false);
  

  const handleLogin = async () => {
    updateSubmitted(true);
    if(!isLoginFormValid()){
      return;
    }
    try {
      const result = await loginUserMutation({
        variables: {
          email:user.email,
          password:user.password,
        },
      });

      const userDetails = result.data.login;

      if (userDetails && userDetails.email === user.email) {
        auth.setUser(userDetails);
        navigate(redirectTo, { replace: true });
      }
    } catch (error: any) {
      const { errors, data } = error;
      setErrorMessage(INVALID_CREDENTIALS);
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
                updateEmail(emailPattern.test(value)); 
                updateFieldValue(name as ActionTypesProps, value);
              }}
            />
            {/* Error Part for Email Field */}
            {submitted &&<div>
              {!user.email && <span className='error'>
                Email is Required.
            </span>}
            {user.email && !isEmailValid && <span className='error'>
              Enter a valid email.
            </span>

            }
            </div>
              }
            <InputField
              name='password'
              type='password'
              placeholder='PASSWORD'
              value={user.password}
              onChange={({ target }: React.ChangeEvent<HTMLInputElement>) => {
                const { name, value } = target;
                updatePasswordValid(passwordPattern.test(value));
                updateFieldValue(name as ActionTypesProps, value);
              }}
            />
            {submitted &&<div>
              {!user.password && <span className='error'>
              Password is Required.
            </span>}
            {user.password && !isPasswordValid && <span className='error'>
            Your password must be at least 8 characters long, must contain
                at least one lower case letter, one upper case letter, one digit
                and one special character.
            </span>

            }
            </div>
              }
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
