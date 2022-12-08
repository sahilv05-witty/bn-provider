import { Button, Form, Item } from 'semantic-ui-react';
import './InputButton.scss';

interface InputButtonProps {
  text?: string;
  size?: any;
  loading?: boolean;
  fluid?: any;
  inline?: any;
  AddClass?: string;
  requiredHintText?: Boolean;
  circular?: any;
  icon?: any;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => any;
}

export const InputButton = ({
  loading,
  text,
  fluid,
  size,
  inline,
  AddClass,
  requiredHintText,
  circular,
  icon,
  disabled,
  onClick,
}: InputButtonProps) => {
  return (
    <Form.Field className={AddClass} inline={inline}>
      {inline ? <label></label> : ''}
      <Item as='div'>
        {requiredHintText ? <small>* indicates a required field</small> : ''}
        <Button
          loading={loading}
          onClick={onClick}
          disabled={disabled}
          fluid={fluid}
          size={size}
          circular={circular}
          content={text}
          icon={icon}
        />
      </Item>
    </Form.Field>
  );
};
