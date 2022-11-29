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
    checked: boolean;
    disabled?: boolean;
    onChange?: ()=> any;
}

const InputButton = ({ text, fluid, label, inline, AddClass, toggle, circular, icon, disabled, onChange,checked }:InputButton) =>{ 
    return (

        <Form.Field className={AddClass} inline={inline}  >
        {label ? <label>{label}</label>:''}
        <Item as="div">
            <Checkbox className={toggle ? "switch-button": ""} toggle={toggle}  label={text} checked={checked} onChange={onChange}/>
        </Item>
        </Form.Field>        
    )
}

export default InputButton
