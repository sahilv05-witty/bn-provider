import {  Button, Form, Item } from 'semantic-ui-react';
import "../form-controls/FormControl.scss";

interface InputButton{
    text: string;
    size?: any;
    fluid?: any;
    inline?: any;
    NewClass?: string;
    requiredHintText?: Boolean;
}

const InputButton = ({ text, fluid, size, inline, NewClass, requiredHintText }:InputButton) =>{ 
return (
    
    <Form.Field className={NewClass} inline={inline}  >
       {inline ? <label></label>:''}
       <Item as="div">
         {requiredHintText ? <small>* indicates a required field</small>: "" }
        <Button fluid={fluid} size={size}>{text}</Button>
       </Item>
      </Form.Field>
      
)


}

export default InputButton
