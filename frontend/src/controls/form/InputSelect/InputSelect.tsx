import React from 'react'
import { Select, Form, Item } from 'semantic-ui-react'

const countryOptions = [
  { key: 'bz', value: 'bz', text: 'Belize' },
  { key: 'bj', value: 'bj', text: 'Benin' },
]

interface InputSelectProps{
  placeholder?:string;
  type?:string;
  label?:string;
  AddClass?:string;
  inline?: any;
  required?: any;
  hint?: any;
  fluid?: any;
  options: any;
  error?: string;
}

export const InputSelect = ({placeholder, AddClass, inline, required, fluid, label, options, error}: InputSelectProps) => (


  <Form.Field className={AddClass} inline={inline} required={required} >
  {inline ? <label>{label}</label>:''}
  <Item as="div">
    <Select placeholder={placeholder} options={options} fluid={fluid} />
    {error ? <Item as="div" className='error'>{error}</Item>: ""}
  </Item>
  </Form.Field>
)
