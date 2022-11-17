import React from 'react'
import { Input } from 'semantic-ui-react';
import { Button, Checkbox, Form } from 'semantic-ui-react'
interface InputField{
    dis?:boolean;
    placeholder?:string;
    tyep?:string;
    icon?:string;
    label?:string;
    fieldClass?:string;
}

const InputField = ({dis,placeholder,label,fieldClass}:InputField) =>{ 
return (
      <Form.Field className={fieldClass}>
       {label ? <label>{label}</label>:''}
      <Input className='' placeholder={placeholder} />
      </Form.Field>
)


}

export default InputField
