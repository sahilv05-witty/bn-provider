import { Form, Input, InputOnChangeData, Item } from 'semantic-ui-react';
import '../form-controls/FormControl.scss';
import _ from 'lodash';

interface InputField {
  name: string;
  placeholder?: string;
  type?: any;
  label?: any;
  AddClass?: string;
  inline?: any;
  required?: any;
  hint?: any;
  value?: string;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
    data: InputOnChangeData
  ) => void;
}

const InputField = ({
  name,
  placeholder,
  label,
  AddClass,
  type,
  inline,
  required,
  hint,
  value,
  onChange,
}: InputField) => {
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
        />
        {hint ? (
          <span className='hint'>
            Password must be at least 8 characters long, contain at least one
            lower case letter, one upper case letter, one digit, and one special
            character.
          </span>
        ) : (
          ''
        )}
      </Item>
    </Form.Field>
  );
};

export default InputField;
