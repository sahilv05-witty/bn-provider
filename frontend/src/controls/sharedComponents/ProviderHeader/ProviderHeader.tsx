import React, { useState } from "react";
import { Image, Item, Header } from "semantic-ui-react";
import logo from "../../../assets/img/bn-logo.png";
import "./ProviderHeader.scss";

interface ProviderHeader {
  toggleMenu?: () => any;
}

export const ProviderHeader = ({ toggleMenu }: ProviderHeader) => {
  const [isActive, setActive] = useState(false);
  const toggleSidebar = () => {
    setActive(!isActive);
  };
  return (
    <Item as="div" className="provider-header">
      {toggleMenu && (
        <Item as="div" className="header-content">
          <Item as="div" className="toggle-btn" onClick={toggleSidebar}>
            <Item as="span"></Item>
            <Item as="span"></Item>
            <Item as="span"></Item>
          </Item>
          <Header as="h3">Provider Poral</Header>
        </Item>
      )}
      <Image src={logo} />
    </Item>
  );
};
