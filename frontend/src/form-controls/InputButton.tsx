import {  Button, Form, Item, Icon } from 'semantic-ui-react';
import "../form-controls/FormControl.scss";

interface InputButton {
    text?: string;
    size?: any;
    fluid?: any;
    inline?: any;
    AddClass?: string;
    requiredHintText?: Boolean;
    circular?: any;
    icon?: any;

    disabled?: boolean;
    onClick?: ()=> any;
}

const InputButton = ({ text, fluid, size, inline, AddClass, requiredHintText, circular, icon, disabled, onClick }:InputButton) =>{ 
    return (

        <Form.Field className={AddClass} inline={inline}  >
        {inline ? <label></label>:''}
        <Item as="div">
            {requiredHintText ? <small>* indicates a required field</small>: "" }
            <Button onClick={onClick} disabled={disabled}   fluid={fluid} size={size} circular={circular}  content={text} icon={icon}/>
        </Item>
        </Form.Field>        
    )
}

export default InputButton
