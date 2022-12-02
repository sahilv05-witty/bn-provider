import { Table, Item } from "semantic-ui-react";
import "./PatientStatus.scss";

export const PatientStatusTable = () => {
  return (
    <Item as="div" className="Provider-Status-table">
      <Table singleLine striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Patient Name</Table.HeaderCell>
            <Table.HeaderCell>DOB</Table.HeaderCell>
            <Table.HeaderCell>Physician</Table.HeaderCell>
            <Table.HeaderCell>Service</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
            <Table.HeaderCell>Status Date</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.Cell>Jean-Luc Picard</Table.Cell>
            <Table.Cell>12/31/1970</Table.Cell>
            <Table.Cell>Beverly Crusher</Table.Cell>
            <Table.Cell>Consultation</Table.Cell>
            <Table.Cell>Consultation missing information</Table.Cell>
            <Table.Cell>12/15/2022</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Jean-Luc Picard</Table.Cell>
            <Table.Cell>12/31/1970</Table.Cell>
            <Table.Cell>Beverly Crusher</Table.Cell>
            <Table.Cell>Consultation</Table.Cell>
            <Table.Cell>Consultation missing information</Table.Cell>
            <Table.Cell>12/15/2022</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Jean-Luc Picard</Table.Cell>
            <Table.Cell>12/31/1970</Table.Cell>
            <Table.Cell>Beverly Crusher</Table.Cell>
            <Table.Cell>Consultation</Table.Cell>
            <Table.Cell>Consultation missing information</Table.Cell>
            <Table.Cell>12/15/2022</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Jean-Luc Picard</Table.Cell>
            <Table.Cell>12/31/1970</Table.Cell>
            <Table.Cell>Beverly Crusher</Table.Cell>
            <Table.Cell>Consultation</Table.Cell>
            <Table.Cell>Consultation missing information</Table.Cell>
            <Table.Cell>12/15/2022</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </Item>
  );
};
