import { useQuery, useMutation } from '@apollo/client';
import { useMemo, useReducer } from 'react';
import { Form, Container, Item } from 'semantic-ui-react';
import { InputButton, InputField, InputSelect } from '../controls/form';
import {
  ProviderFooter,
  ProviderHeader,
  ProviderSubHeader,
} from '../controls/sharedComponents';
import { mutationCreateUser, queryRoles } from '../services';

interface Role {
  id: string;
  name: string;
  code: string;
}

type UserForm = {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
};

type ActionTypesProps = 'firstName' | 'lastName' | 'email' | 'role' | 'reset';

type Action = {
  type: ActionTypesProps;
  payload: string;
};

const initialData: UserForm = {} as UserForm;

const userReducer = (state = initialData, action: Action) => {
  if (action.type === 'reset') return { ...initialData };
  return { ...state, [action.type]: action.payload };
};

function CreateAdminUser() {
  const [user, dispatchFormFieldChange] = useReducer(userReducer, initialData);

  const { data } = useQuery(queryRoles);
  const [createUserMutation] = useMutation(mutationCreateUser);

  const handleSave = async () => {
    const result = await createUserMutation({
      variables: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        roleId: parseInt(user.role),
      },
    });

    if (result.data.createUser.email === user.email) {
      // Replace alert with the Sematic Modal Popup
      alert(
        'Account has been created and triggered activation email to the user.'
      );

      dispatchFormFieldChange({
        type: 'reset',
        payload: '',
      });
    }
  };

  const updateFieldValue = (fieldName: ActionTypesProps, value: string) => {
    dispatchFormFieldChange({
      type: fieldName,
      payload: value,
    });
  };

  const roles = useMemo(() => {
    return data?.roles
      .filter((role: Role) => role.code.toLowerCase() !== 'provider')
      .map(({ id, code, name }: any) => {
        return {
          key: code,
          value: id,
          text: name,
        };
      });
  }, [data]);

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
                updateFieldValue(name as ActionTypesProps, value);
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
                updateFieldValue(name as ActionTypesProps, value);
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
                updateFieldValue(name as ActionTypesProps, value);
              }}
            />
            <InputSelect
              name='role'
              options={roles}
              inline
              fluid
              placeholder='Select Role'
              label='Role'
              required
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
              onClick={handleSave}
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
