import { useState } from "react";
import { Form, Header, Container, Item } from "semantic-ui-react";
import { InputButton, InputField } from "../../controls/form";
import {
  ProviderFooter,
  ProviderHeader,
  ProviderSubHeader,
  ProviderSidebar,
} from "../../controls/sharedComponents";
import { PatientStatusTable } from "./PatientStatusTable";
import "./PatientStatus.scss";

export const PatientStatus = () => {
  const [isActive, setActive] = useState(false);
  const toggleSidebar = () => {
    setActive(!isActive);
  };

  return (
    <Item as="div" className="Provider-Status">
      <ProviderHeader toggleMenu={toggleSidebar} />
      <ProviderSubHeader ActionButton />
      <ProviderSidebar visible={isActive} onHide={setActive} />
      <Container fluid>
        <Item as="sidebar">
          <Form size="mini">
            <Header as="h5">FILTER</Header>
            <InputField
              name="Patient Name"
              type="text"
              label="Patient Name"
              placeholder="Enter Patient Name"
              size="mini"
              hint={<i>(50 characters maximum)</i>}
            />
            <InputField
              name="PatientDoB"
              type="date"
              label="Patient DoB (mm/dd/yyyy)"
              size="mini"
            />
            <InputButton text="SEARCH" AddClass="mb-0" />
            <InputButton text="Clear filters" AddClass="mb-0 btn-secondary" />
          </Form>
        </Item>
        <Item as="div" className="content">
          <PatientStatusTable />
        </Item>
      </Container>
      <ProviderFooter />
    </Item>
  );
};
