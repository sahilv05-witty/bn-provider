import { useMutation, useQuery } from '@apollo/client';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import { Container, Form, Header, Item } from 'semantic-ui-react';
import errorIcon from '../assets/img/error-icon.svg';
import {
  InputButton,
  InputCheckbox,
  InputField,
  InputSelect,
  StringField,
} from '../controls/form';
import {
  ProviderFooter,
  ProviderHeader,
  ProviderSubHeader,
} from '../controls/sharedComponents';
import { useAuth } from '../hooks/useAuth';
import { useForm } from '../hooks/useForm';
import { mutationCreateUser, queryProviders, queryRoles } from '../services';
import { Provider, Role } from '../types';

const doctorText =
  '“Dr.” will be used in the salutation of the activation email when this is yes. The user’s first name will be used when this is no.';
const errorText =
  'First name can only contain letters, apostrophes, hyphens, and periods.';

const PageTitle = [
  { key: 'Providers', content: 'Providers', link: true },
  { key: 'Create New User', content: 'Create New User', active: true },
];

type UserForm = {
  firstName: string;
  lastName: string;
  email: string;
  provider: string;
  useSalutation: string;
};

function CreateProviderUser() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  function createProviderUserCallback() {
    createUser();
  }

  const { onChange, onSubmit, formState, setFormState } = useForm<UserForm>(
    createProviderUserCallback,
    {} as UserForm
  );

  const { data: rolesData } = useQuery(queryRoles);
  const { data: providersData } = useQuery(queryProviders);

  const [createUser, { loading }] = useMutation(mutationCreateUser, {
    update(proxy, { data: { createUser: createUserData } }) {
      if (
        confirm(
          'Provider account has been created successfully.   Would you like to activate account?'
        )
      ) {
        navigate(`/account-activation/${createUserData.activationToken}`);
      } else {
        setFormState({
          ...formState,
          firstName: '',
          lastName: '',
          email: '',
          provider: '',
          useSalutation: '',
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
      roleId: rolesData?.roles.find((role: Role) => role.code === 'provider')
        .id,
      providerId: parseInt(formState.provider),
      useSalutation: Boolean(formState.useSalutation),
    },
  });

  const providers = useMemo(() => {
    return providersData?.providers.map(({ id, name }: Partial<Provider>) => {
      return {
        key: id,
        value: id,
        text: name,
      };
    });
  }, [providersData]);

  const doctorGroup =
    providersData?.providers.find((provider: Provider) => {
      return provider.id === parseInt(formState.provider?.toString());
    })?.group || '';

  return (
    <Item as='div' className='Provider-Form-Page'>
      <ProviderHeader />
      <ProviderSubHeader PageTitle={PageTitle} />
      <Container fluid>
        <Item as='div' className='content'>
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
          <Form>
            <InputCheckbox
              label='Doctor'
              inline
              toggle
              text={doctorText}
              checked={formState.useSalutation === 'true' ? true : false}
              onChange={(_, data) => {
                onChange('useSalutation', data.checked?.toString() || 'false');
              }}
            />
            <InputField
              name='firstName'
              label='First Name'
              inline
              placeholder='First Name'
              required
              error={errorText}
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
              name='provider'
              options={providers}
              inline
              fluid
              placeholder='Select Provider'
              label='Provider'
              required
              value={parseInt(formState.provider)}
              onChange={(e, { value }) =>
                onChange('provider', value?.toString() || '')
              }
            />
            <StringField inline label='Doctor Group' text={doctorGroup} />
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

export default CreateProviderUser;
