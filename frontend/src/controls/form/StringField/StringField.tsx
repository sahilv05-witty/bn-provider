import { Form, Input, Item } from 'semantic-ui-react';

interface StringFieldProps {
  text?: string;
  label?: string;
  AddClass?: string;
  inline?: any;
}

export const StringField = ({
  label,
  AddClass,
  text,
  inline,
}: StringFieldProps) => {
  return (
    <Form.Field className={AddClass} inline={inline}>
      {label ? <label style={{ paddingTop: 3 }}>{label}</label> : ''}
      <Item as='div'>{text}</Item>
    </Form.Field>
  );
};
