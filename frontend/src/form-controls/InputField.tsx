import { Form, Input } from 'semantic-ui-react';
import "../form-controls/FormControl.scss";
interface InputField{
    dis?:boolean;
    placeholder?:string;
    type?:string;
    icon?:string;
    label?:string;
    fieldClass?:string;
}

const InputField = ({dis,placeholder,label,fieldClass, type}:InputField) =>{ 
return (
      <Form.Field className={fieldClass}>
       {label ? <label>{label}</label>:''}
      <Input type={type} placeholder={placeholder} />
      </Form.Field>
)


}

export default InputField
