import { Button, Form, Item, Icon, ButtonProps } from 'semantic-ui-react';
import '../form-controls/FormControl.scss';

interface InputButton {
  text?: string;
  size?: any;
  fluid?: any;
  inline?: any;
  AddClass?: string;
  requiredHintText?: Boolean;
  circular?: any;
  icon?: any;
  onClick?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    data: ButtonProps
  ) => void;
}

const InputButton = ({
  text,
  fluid,
  size,
  inline,
  AddClass,
  requiredHintText,
  circular,
  icon,
  onClick,
}: InputButton) => {
  return (
    <Form.Field className={AddClass} inline={inline}>
      {inline ? <label></label> : ''}
      <Item as='div'>
        {requiredHintText ? <small>* indicates a required field</small> : ''}
        <Button
          fluid={fluid}
          size={size}
          circular={circular}
          content={text}
          icon={icon}
          onClick={onClick}
        />
      </Item>
    </Form.Field>
  );
};

export default InputButton;
