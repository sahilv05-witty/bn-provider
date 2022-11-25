import React from 'react';
import { Dropdown, Form, Item, DropdownProps } from 'semantic-ui-react';

type SelectOptions = {
  key: string;
  value: string;
  text: string;
};

interface InputSelect {
  loading?: boolean;
  name: string;
  placeholder?: string;
  type?: string;
  label?: string;
  AddClass?: string;
  inline?: any;
  required?: any;
  hint?: any;
  fluid?: any;
  value?: any;
  options: SelectOptions[];
  onChange?: (
    event: React.SyntheticEvent<HTMLElement, Event>,
    data: DropdownProps
  ) => void;
}

const InputSelect = ({
  loading,
  name,
  placeholder,
  AddClass,
  inline,
  required,
  fluid,
  label,
  options,
  onChange,
  value,
}: InputSelect) => {
  return (
    <Form.Field className={AddClass} inline={inline} required={required}>
      {inline ? <label>{label}</label> : ''}
      <Item as='div'>
        <Dropdown
          loading={loading}
          name={name}
          placeholder={placeholder}
          options={options}
          fluid={fluid}
          onChange={onChange}
        />
      </Item>
    </Form.Field>
  );
};

export default InputSelect;
