import React from "react";
import { Sidebar, Menu, Header } from "semantic-ui-react";
import "./ProviderSidebar.scss";

interface ProviderSidebarProps {
  visible: boolean;
  onHide: any;
}

export const ProviderSidebar = ({ visible, onHide }: ProviderSidebarProps) => {
  return (
    <Sidebar
      className="Provider-Sidebar"
      as={Menu}
      animation="overlay"
      onHide={onHide}
      vertical
      visible={visible}
    >
      <Header as="h5">Patient Status</Header>
      <Menu.Item as="a">glossary</Menu.Item>
      <Menu.Item as="a">Change Password</Menu.Item>
      <Menu.Item as="a">Sign out</Menu.Item>
    </Sidebar>
  );
};
