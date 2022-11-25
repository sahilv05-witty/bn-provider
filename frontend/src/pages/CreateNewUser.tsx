import { gql, useMutation, useQuery } from '@apollo/client';
import { useReducer } from 'react';
import { Container, Form, Item } from 'semantic-ui-react';
import InputButton from '../form-controls/InputButton';
import InputField from '../form-controls/InputField';
import InputSelect from '../form-controls/InputSelect';
import ProviderFooter from '../sharedComponents/ProviderFooter';
import ProviderHeader from '../sharedComponents/ProviderHeader';
import ProviderSubHeader from '../sharedComponents/ProviderSubHeader';
import './ProviderFormPage.scss';

const roles = gql`
  {
    roles {
      id
      code
      name
    }
  }
`;

const createUser = gql`
  mutation CreateUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $roleId: Float!
  ) {
    createUser(
      user: {
        firstName: $firstName
        lastName: $lastName
        email: $email
        roleId: $roleId
      }
    ) {
      id
      createdBy
      createdAt
      updatedBy
      updatedAt
      firstName
      lastName
      email
      isActive
      termsAcceptedAt
      lastLoggedInAt
      role {
        id
        name
        code
      }
      provider {
        id
        name
        group
      }
    }
  }
`;

type UserForm = {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
};

type ActionTypes = 'firstName' | 'lastName' | 'email' | 'role';

type Action = {
  type: ActionTypes;
  payload: string;
};

const initialData: UserForm = {} as UserForm;

const userReducer = (state = initialData, action: Action) => {
  return { ...state, [action.type]: action.payload };
};

function CreateNewUser() {
  const [user, dispatchUserFormFieldChange] = useReducer(
    userReducer,
    initialData
  );

  const { loading, error, data } = useQuery(roles);
  const [createUserMutation] = useMutation(createUser);

  const handleButtonClick = () => {
    createUserMutation({
      variables: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        roleId: parseInt(user.role),
      },
    });
  };

  const updateFieldValue = (fieldName: ActionTypes, value: string) => {
    dispatchUserFormFieldChange({
      type: fieldName,
      payload: value,
    });
  };

  if (loading) return <p>Loading Roles...</p>;
  // if (mLoading) return <p>Submitting the User details...</p>;
  // if (mError) return `Submission error! ${mError.message}`;

  return (
    <Item as='div' className='Provider-Form-Page'>
      <ProviderHeader />
      <ProviderSubHeader />
      <Container fluid>
        <Form>
          <InputField
            name='firstName'
            label='First Name'
            inline
            placeholder='First Name'
            required
            value={user.firstName}
            onChange={({ target }: React.ChangeEvent<HTMLInputElement>) => {
              const { name, value } = target;
              updateFieldValue(name as ActionTypes, value);
            }}
          />
          <InputField
            name='lastName'
            label='Last Name'
            inline
            placeholder='Last Name'
            required
            value={user.lastName}
            onChange={({ target }: React.ChangeEvent<HTMLInputElement>) => {
              const { name, value } = target;
              updateFieldValue(name as ActionTypes, value);
            }}
          />
          <InputField
            name='email'
            type='email'
            label='Email'
            inline
            placeholder='Email Address'
            required
            value={user.email}
            onChange={({ target }: React.ChangeEvent<HTMLInputElement>) => {
              const { name, value } = target;
              updateFieldValue(name as ActionTypes, value);
            }}
          />
          <InputSelect
            name='role'
            inline
            fluid
            placeholder='Select Role'
            label='Role'
            required
            value={user.role}
            options={data.roles.map(({ id, code, name }: any) => {
              return {
                key: code,
                value: id,
                text: name,
              };
            })}
            onChange={(e, data) => {
              if (data.value) {
                updateFieldValue('role', data.value.toString());
              }
            }}
          />
          <InputButton
            text='Save'
            inline
            fluid
            requiredHintText
            onClick={handleButtonClick}
          />
        </Form>
      </Container>
      <ProviderFooter />
    </Item>
  );
}

export default CreateNewUser;
