import React from 'react'
import { Item, Form, Header, Container } from 'semantic-ui-react';
import { InputField, InputButton } from '../form-controls';
import errorIcon from "../assets/img/error-icon.svg";
import {ProviderFooter,ProviderHeader} from '../sharedComponents';
import "./Login.scss"
const Login = () =>{ 
return (    
    <Item as="div" className="Login">
        <ProviderHeader/>
        <Container fluid>
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
        </Container>
        <ProviderFooter/>
    </Item>)
}

export default Login
