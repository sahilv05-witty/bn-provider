import { Form, Input } from 'semantic-ui-react';
import "../form-controls/FormControl.scss";
interface StringField{
    text?:string;
    label?:string;
    NewClass?:string;
    inline?: any;
}

const StringField = ({label,NewClass, text, inline}:StringField) =>{ 
return (
      <Form.Field className={NewClass} inline={inline}>
       {label ? <label style={{paddingTop: 3}}>{label}</label>:''}
        <div>{text}</div>
      </Form.Field>
)


}

export default StringField
