import React from 'react'
import { Form, Checkbox } from 'semantic-ui-react';

interface InputTermPolicy{
    label?:string;
    inline?: any;
    required?: any;
}


export function InputTermPolicy({label, inline, required}: InputTermPolicy) {
  return (
    <Form.Field className="input-term-policy" inline={inline} >
        {inline ? <label>{label}</label>:''}
        <Checkbox label={<><span className='star'>*</span><label>I agree to the 
          <a href='javascript:void(0)'> Terms of Use</a> and 
          <a href='javascript:void(0)'>Privacy Policy</a>.</label></>} />
  </Form.Field>
  )
}