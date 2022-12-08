import React from 'react';
import { Form, Item, Dropdown, DropdownProps } from 'semantic-ui-react';

export type DropdownOptionProps = {
  key: string;
  value: string;
  text: string;
};

interface InputSelectProps {
  name: string;
  placeholder?: string;
  type?: string;
  label?: string;
  AddClass?: string;
  inline?: boolean;
  required?: boolean;
  hint?: any;
  fluid?: boolean;
  options: DropdownOptionProps[];
  error?: string;
  value?: string | number;
  onChange?: (
    event: React.SyntheticEvent<HTMLElement, Event>,
    data: DropdownProps
  ) => void;
}

export const InputSelect = ({
  name,
  placeholder,
  AddClass,
  inline,
  required,
  fluid,
  label,
  options,
  error,
  value,
  onChange,
}: InputSelectProps) => {
  return (
    <Form.Field className={AddClass} inline={inline} required={required}>
      {inline ? <label>{label}</label> : ''}
      <Item as='div'>
        <Dropdown
          search
          scrolling
          clearable
          name={name}
          value={value}
          placeholder={placeholder}
          options={options}
          fluid={fluid}
          selectOnNavigation={false}
          selection
          onChange={onChange}
        />
        {error ? (
          <Item as='div' className='error'>
            {error}
          </Item>
        ) : (
          ''
        )}
      </Item>
    </Form.Field>
  );
};
