import { useMutation, useQuery } from "@apollo/client";
import { useMemo, useReducer, useState } from "react";
import { Container, Form, Item } from "semantic-ui-react";
import {
  InputButton,
  InputCheckbox,
  InputField,
  InputSelect,
  StringField,
} from "../controls/form";
import {
  ProviderFooter,
  ProviderHeader,
  ProviderSubHeader,
} from "../controls/sharedComponents";
import { mutationCreateUser, queryProviders } from "../services";

const doctorText =
  "“Dr.” will be used in the salutation of the activation email when this is yes. The user’s first name will be used when this is no.";
const errorText =
  "First name can only contain letters, apostrophes, hyphens, and periods.";

type UserForm = {
  firstName: string;
  lastName: string;
  email: string;
  provider: number;
};

type ActionTypesProps = "firstName" | "lastName" | "email" | "provider";

type Action = {
  type: ActionTypesProps;
  payload: string;
};

const initialData: UserForm = {} as UserForm;

const userReducer = (state = initialData, action: Action) => {
  return { ...state, [action.type]: action.payload };
};

const PageTitle = [
  { key: "Providers", content: "Providers", link: true },
  { key: "Create New User", content: "Create New User", active: true },
];

function CreateProviderUser() {
  const [user, dispatchFormFieldChange] = useReducer(userReducer, initialData);

  const { data } = useQuery(queryProviders);
  const [createUserMutation] = useMutation(mutationCreateUser);

  const [value, setValue] = useState(true);

  let checkFun = () => {
    setValue(!value);
  };

  const providers = useMemo(() => {
    return data?.providers.map(({ id, name }: any) => {
      return {
        key: id,
        value: id,
        text: name,
      };
    });
  }, [data]);

  const doctorGroup = data?.providers.find((provider: any) => {
    console.log(JSON.stringify(provider));
    return provider.id === parseInt(user.provider?.toString());
  })?.group;

  const updateFieldValue = (fieldName: ActionTypesProps, value: string) => {
    dispatchFormFieldChange({
      type: fieldName,
      payload: value,
    });
  };

  const handleSave = () => {
    createUserMutation({
      variables: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        roleId: 3,
        providerId: user.provider,
      },
    });
  };

  return (
    <Item as="div" className="Provider-Form-Page">
      <ProviderHeader />
      <ProviderSubHeader PageTitle={PageTitle} />
      <Container fluid>
        <Item as="div" className="content">
          <Form>
            <InputCheckbox
              label="Doctor"
              inline
              toggle
              text={doctorText}
              checked={value}
              onChange={checkFun}
            />
            <InputField
              name="firstName"
              label="First Name"
              inline
              placeholder="First Name"
              required
              error={errorText}
              value={user.firstName}
              onChange={({ target }: React.ChangeEvent<HTMLInputElement>) => {
                const { name, value } = target;
                updateFieldValue(name as ActionTypesProps, value);
              }}
            />
            <InputField
              name="lastName"
              label="Last Name"
              inline
              placeholder="Last Name"
              required
              value={user.lastName}
              onChange={({ target }: React.ChangeEvent<HTMLInputElement>) => {
                const { name, value } = target;
                updateFieldValue(name as ActionTypesProps, value);
              }}
            />
            <InputField
              name="email"
              type="email"
              label="Email"
              inline
              placeholder="Email Address"
              required
              value={user.email}
              onChange={({ target }: React.ChangeEvent<HTMLInputElement>) => {
                const { name, value } = target;
                updateFieldValue(name as ActionTypesProps, value);
              }}
            />
            <InputSelect
              name="provider"
              options={providers}
              inline
              fluid
              placeholder="Select Provider"
              label="Provider"
              required
              onChange={(e, data) => {
                if (data.value) {
                  updateFieldValue("provider", data.value.toString());
                }
              }}
            />
            <StringField inline label="Doctor Group" text={doctorGroup} />
            <InputButton
              AddClass="mb-0 empty-label"
              text="Save"
              inline
              fluid
              requiredHintText
              onClick={handleSave}
            />
            <InputButton
              text="Cancel"
              inline
              fluid
              AddClass="btn-secondary empty-label mb-0"
            />
          </Form>
        </Item>
      </Container>
      <ProviderFooter />
    </Item>
  );
}

export default CreateProviderUser;
