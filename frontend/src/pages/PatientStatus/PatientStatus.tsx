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
  const ActionButtons = (
    <>
      <InputButton
        text="Export"
        onClick={() => console.log("This is working Export")}
      />
      <InputButton
        icon="plus"
        circular
        size="mini"
        onClick={() => console.log("This is Plus Button")}
      />
    </>
  );

  const PageTitle = [
    { key: "Patient Status", content: "Patient Status ", active: true },
  ];

  const [visible, setVisible] = useState(false);
  const toggleSidebar = () => {
    setVisible(!visible);
    console.log("fdsdfsd");
  };

  return (
    <Item as="div" className="Provider-Status">
      <ProviderHeader toggleMenu={toggleSidebar} />
      <ProviderSubHeader
        PageTitle={PageTitle}
        pageTitleHint={"Data was last updated on 9/29/22 at 6am PT. "}
        ActionButton={ActionButtons}
      />
      <ProviderSidebar visible={visible} onHide={setVisible} />
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
