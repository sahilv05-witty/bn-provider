import { Form, Input, Item } from 'semantic-ui-react';
import "../form-controls/FormControl.scss";

interface InputField{
    placeholder?:string;
    type?:any;
    label?:any;
    AddClass?:string;
    inline?: any;
    required?: any;
    hint?: any;
    value?: string;
    error?: string;
    // onchange:? ()=> any;
}

const InputField = ({placeholder,label,AddClass, type, inline, required, hint, value, error}:InputField) =>{ 
return (
        <Form.Field className={AddClass} inline={inline} required={required} >
            {label ? <label>{label}</label>:''}
            <Item as="div">
                <Input type={type} placeholder={placeholder}value={value} /> 
                {hint ? <span className='hint'>Password must be at least 8 characters long, 
                    contain at least one lower case letter, one upper case letter, one digit, and one special character.</span>: ""
                }
                {error ? <Item as="div" className='error'>{error}</Item>: ""}
            </Item>
      </Form.Field>
)


}

export default InputField
