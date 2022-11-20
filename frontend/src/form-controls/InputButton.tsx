import {  Button } from 'semantic-ui-react';
import "../form-controls/FormControl.scss";

interface InputButton{
    text: string;
    size?: any;
    fluid?: any;
}

const InputButton = ({ text, fluid, size }:InputButton) =>{ 
return (
      
    <Button fluid={fluid} size={size}>{text}</Button>
      
)


}

export default InputButton
