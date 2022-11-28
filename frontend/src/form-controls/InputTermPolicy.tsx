import React from 'react'
import { Form, Checkbox } from 'semantic-ui-react';

interface InputTermPolicy{
    label?:string;
    inline?: any;
    required?: any;
    AddClass?: string;
}


function InputTermPolicy({label, inline, required, AddClass}: InputTermPolicy) {
  return (
    <Form.Field className={`input-term-policy ${AddClass}`} inline={inline} >
        {inline ? <label>{label}</label>:''}
        <Checkbox label={<><span className='star'>*</span><label>I agree to the 
          <a href='javascript:void(0)'> Terms of Use</a> and 
          <a href='javascript:void(0)'>Privacy Policy</a>.</label></>} />
  </Form.Field>
  )
}

export default InputTermPolicy