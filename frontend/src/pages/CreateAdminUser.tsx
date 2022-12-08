import { useMutation, useQuery } from '@apollo/client';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Item } from 'semantic-ui-react';
import { InputButton, InputField, InputSelect } from '../controls/form';
import { DropdownOptionProps } from '../controls/form/InputSelect/InputSelect';
import {
  ProviderFooter,
  ProviderHeader,
  ProviderSubHeader,
} from '../controls/sharedComponents';
import { useForm } from '../hooks/useForm';
import { mutationCreateUser, queryRoles } from '../services';
import { Role } from '../types';

type UserForm = {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
};

const PageTitle = [
  { key: 'Administrators', content: 'Administrators', link: true },
  { key: 'Create New User', content: 'Create New User', active: true },
];

function CreateAdminUser() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  function createProviderUserCallback() {
    createUser();
  }

  const { onChange, onSubmit, formState, setFormState } =
    useForm<UserForm>(createProviderUserCallback, {} as UserForm);

  const { data: rolesData, loading: rolesLoading } = useQuery(queryRoles);

  const [createUser, { loading }] = useMutation(mutationCreateUser, {
    update(proxy, { data: { createUser: createUserData } }) {
      const selectedRole = rolesData?.roles.find(
        (role: Role) => role.id === parseInt(formState.role)
      )?.name;

      if (
        confirm(
          `${selectedRole} account has been created successfully.   Would you like to activate account?`
        )
      ) {
        navigate(`/account-activation/${createUserData.activationToken}`);
      } else {
        setFormState({
          ...formState,
          firstName: '',
          lastName: '',
          email: '',
          role: '',
        });
      }
    },
    onError({ graphQLErrors }) {
      if (graphQLErrors && graphQLErrors.length > 0) {
        const errorDetails = graphQLErrors[0];

        setErrorMessage(graphQLErrors.map((error) => error.message).join(', '));
      }
    },
    variables: {
      ...formState,
      roleId: parseInt(formState.role),
    },
  });

  const roles: DropdownOptionProps[] = useMemo(() => {
    return rolesData?.roles
      .filter((role: Role) => role.code.toLowerCase() !== 'provider')
      .map(({ id, code, name }: Role) => {
        return {
          key: code,
          value: id,
          text: name,
        };
      });
  }, [rolesData]);

  return (
    <Item as='div' className='Provider-Form-Page'>
      <ProviderHeader />
      <ProviderSubHeader PageTitle={PageTitle} />
      <Container fluid>
        <Item as='div' className='content'>
          <Form>
            <InputField
              name='firstName'
              label='First Name'
              inline
              placeholder='First Name'
              required
              value={formState.firstName}
              onChange={({ target: { name, value } }) => onChange(name, value)}
            />
            <InputField
              name='lastName'
              label='Last Name'
              inline
              placeholder='Last Name'
              required
              value={formState.lastName}
              onChange={({ target: { name, value } }) => onChange(name, value)}
            />
            <InputField
              name='email'
              type='email'
              label='Email'
              inline
              placeholder='Email Address'
              required
              value={formState.email}
              onChange={({ target: { name, value } }) => onChange(name, value)}
            />
            <InputSelect
              name='role'
              options={roles}
              inline
              fluid
              placeholder='Select Role'
              label='Role'
              required
              value={parseInt(formState.role)}
              onChange={(_, { value }) =>
                onChange('role', value?.toString() || '')
              }
            />
            <InputButton
              loading={loading}
              AddClass='mb-0 empty-label'
              text='Save'
              inline
              fluid
              requiredHintText
              onClick={onSubmit}
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
