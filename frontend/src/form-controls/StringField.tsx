import { Form, Input } from 'semantic-ui-react';
import "../form-controls/FormControl.scss";
interface StringField{
    text?:string;
    label?:string;
    AddClass?:string;
    inline?: any;
}

const StringField = ({label,AddClass, text, inline}:StringField) =>{ 
return (
      <Form.Field className={AddClass} inline={inline}>
       {label ? <label style={{paddingTop: 3}}>{label}</label>:''}
        <div>{text}</div>
      </Form.Field>
)


}

export default StringField
