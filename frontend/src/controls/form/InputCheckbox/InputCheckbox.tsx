import { Form, Item, Checkbox } from 'semantic-ui-react';
import "./InputCheckbox.scss";

interface InputCheckboxProps {
    text?: string;
    toggle?: boolean;
    label?: string;
    inline?: any;
    AddClass?: string;
    requiredHintText?: Boolean;
    circular?: any;
    checked: boolean;
    disabled?: boolean;
    onChange?: ()=> any;
}

export const InputCheckbox = ({ text, label, inline, AddClass, toggle, disabled, onChange,checked }:InputCheckboxProps) =>{ 
    return (

        <Form.Field className={AddClass} inline={inline}  >
        {label ? <label>{label}</label>:''}
        <Item as="div">
            <Checkbox className={toggle ? "switch-button": ""} toggle={toggle}  disabled={disabled} label={text} checked={checked} onChange={onChange}/>
        </Item>
        </Form.Field>        
    )
}

