import {  Button, Form, Item, Checkbox } from 'semantic-ui-react';
import "../form-controls/FormControl.scss";
import "../form-controls/InputCheckbox.scss";

interface InputButton {
    text?: string;
    toggle?: boolean;
    label?: string;
    fluid?: any;
    inline?: any;
    AddClass?: string;
    requiredHintText?: Boolean;
    circular?: any;
    icon?: any;

    disabled?: boolean;
    onClick?: ()=> any;
}

const InputButton = ({ text, fluid, label, inline, AddClass, toggle, circular, icon, disabled, onClick }:InputButton) =>{ 
    return (

        <Form.Field className={AddClass} inline={inline}  >
        {label ? <label>{label}</label>:''}
        <Item as="div">
            <Checkbox className={toggle ? "switch-button": ""} toggle={toggle}  label={text}  />
        </Item>
        </Form.Field>        
    )
}

export default InputButton
