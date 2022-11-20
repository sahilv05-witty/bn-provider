import React from 'react'
import { Item, Form, Header } from 'semantic-ui-react';
import InputField from '../form-controls/InputField';
import InputButton from "../form-controls/InputButton";
import errorIcon from "../assets/img/error-icon.svg";
import "./Login.scss"

const Login = () =>{ 
return (    
    <Item as="div" className="Login">
        <Header as="h1" className='title' content="PROVIDER PORTAL"/>
    
        <Form size='massive'>
            {/* ERROR  */}
            <Header block className='error' image={errorIcon} color="red" content="Invalid password. Your account has been temporarily locked due to too many unsuccessful log in attempts. You can try again in 10 minutes." />
            
            <Header as="h1" className='title' content="Sign In" />
            <InputField type="email" placeholder='WORK EMAIL'/>
            <InputField type="password" placeholder='PASSWORD'/>
            <InputButton text="CONTINUE" fluid size="massive"/>
            <Item as='a' className='link'>FORGOT PASSWORD</Item>
        </Form>
    </Item>)
}

export default Login
