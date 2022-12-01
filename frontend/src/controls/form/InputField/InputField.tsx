import { Form, Input, InputOnChangeData, Item } from 'semantic-ui-react';

interface InputFieldProps {
  name: string;
  placeholder?: string;
  type?: string;
  label?: any;
  AddClass?: string;
  inline?: boolean;
  required?: boolean;
  hint?: any;
  value?: string;
  error?: string;
  size?: any;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
    data: InputOnChangeData
  ) => void;
}

export const InputField = ({
  name,
  placeholder,
  label,
  AddClass,
  type,
  inline,
  required,
  hint,
  value,
  error,
  onChange,
  size,
}: InputFieldProps) => {
  return (
    <Form.Field className={AddClass} inline={inline} required={required}>
      {label ? <label>{label}</label> : ''}
      <Item as='div'>
        <Input
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          size={size}
        />
        {hint ? (
          <span className='hint'>
            {hint}
          </span>
        ) : (
          ''
        )}
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
