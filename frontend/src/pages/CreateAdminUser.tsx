import { useMutation, useQuery } from '@apollo/client';
import { useMemo, useReducer } from 'react';
import { Container, Form, Item } from 'semantic-ui-react';
import { InputButton, InputSelect } from '../controls';
import InputField from '../controls/InputField';
import { mutationCreateUser, queryRoles } from '../services';
import ProviderFooter from '../sharedComponents/ProviderFooter';
import ProviderHeader from '../sharedComponents/ProviderHeader';
import ProviderSubHeader from '../sharedComponents/ProviderSubHeader';
import './ProviderFormPage.scss';

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

function CreateAdminUser() {
  const [user, dispatchUserFormFieldChange] = useReducer(
    userReducer,
    initialData
  );

  const { loading, data } = useQuery(queryRoles);
  const [createUserMutation] = useMutation(mutationCreateUser);

  const handleButtonClick = async () => {
    const result = await createUserMutation({
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

  const renderRoles = useMemo(() => {
    return data.roles.map(({ id, code, name }: any) => {
      return {
        value: code,
        text: name,
      };
    });
  }, []);

  if (loading) return <p>Loading Roles...</p>;
  // if (mLoading) return <p>Submitting the User details...</p>;
  // if (mError) return `Submission error! ${mError.message}`;

  return (
    <Item as='div' className='Provider-Form-Page'>
      <ProviderHeader />
      <ProviderSubHeader />
      <Container fluid>
        <Item as='div' className='content'>
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
              options={renderRoles()}
              onChange={(e, data) => {
                if (data.value) {
                  updateFieldValue('role', data.value.toString());
                }
              }}
            />
            <InputButton
              AddClass='mb-0 empty-label'
              text='Save'
              inline
              fluid
              requiredHintText
              onClick={handleButtonClick}
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

export default CreateAdminUser;
