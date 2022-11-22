import { Form, Input, Item } from 'semantic-ui-react';
import "../form-controls/FormControl.scss";

interface InputField{
    placeholder?:string;
    type?:string;
    label?:string;
    NewClass?:string;
    inline?: any;
    required?: any;
    hint?: any;
}

const InputField = ({placeholder,label,NewClass, type, inline, required, hint}:InputField) =>{ 
return (
        <Form.Field className={NewClass} inline={inline} required={required} >
            {label ? <label>{label}</label>:''}
            <Item as="div">
                <Input type={type} placeholder={placeholder}/>
                {hint ? <span className='hint'>Password must be at least 8 characters long, 
                    contain at least one lower case letter, one upper case letter, one digit, and one special character.</span>: ""
                }
            </Item>
      </Form.Field>
)


}

export default InputField
