import {  Button, Form, Item, Icon } from 'semantic-ui-react';
import "../form-controls/FormControl.scss";

interface InputButtonProbs{
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

export const InputButton = ({ text, fluid, size, inline, AddClass, requiredHintText, circular, icon, disabled, onClick }:InputButtonProbs) =>{ 
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
