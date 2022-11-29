import React from 'react'
import { Item } from 'semantic-ui-react'
import "./ProviderFooter.scss";
interface Footer {
}

export const ProviderFooter = ({}:Footer) =>{ 
return (   
    <Item as='footer' className="provider-footer">
        <Item as="span">© BetterNight, 2023</Item>
        <Item as="span">If you have any questions, contact us at [   ] </Item>
        <Item as="div">
            <Item as="a">Term of Use</Item>
            <Item as="a">Privacy Policy</Item>
        </Item>
    </Item>
)
}
ProviderFooter({});
