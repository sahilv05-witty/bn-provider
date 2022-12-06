import { Item } from "semantic-ui-react";
import "./PatientStatus.scss";
import { TablePagination } from "../../controls/sharedComponents";
export const PatientStatusTable = () => {
  interface patient {
    name: string;
    dob: string;
    physician: string;
    service: string;
    status: string;
    statusDate: string;
  }
  // Get Data from Back end
  const patientInfo = [
    {
      name: "Jean-Luc Picard",
      dob: "12/31/1970",
      physician: "Beverly Crusher",
      service: "Consultation",
      status: "Consultation missing information",
      statusDate: "12/15/2022",
    },
    {
      name: "Jean-Luc Picard",
      dob: "12/31/1970",
      physician: "Beverly Crusher",
      service: "Consultation",
      status: "Consultation missing information",
      statusDate: "12/15/2022",
    },
    {
      name: "Jean-Luc Picard",
      dob: "12/31/1970",
      physician: "Beverly Crusher",
      service: "Consultation",
      status: "Consultation missing information",
      statusDate: "12/15/2022",
    },
    {
      name: "Jean-Luc Picard",
      dob: "12/31/1970",
      physician: "Beverly Crusher",
      service: "Consultation",
      status: "Consultation missing information",
      statusDate: "12/15/2022",
    },
    {
      name: "Vivek Yadav",
      dob: "12/31/1970",
      physician: "Beverly Crusher",
      service: "Consultation",
      status: "Consultation missing information",
      statusDate: "12/15/2022",
    },
    {
      name: "Ayush Yadav",
      dob: "12/31/1970",
      physician: "Beverly Crusher",
      service: "Consultation",
      status: "Consultation missing information",
      statusDate: "12/15/2022",
    },
    {
      name: "Jean-Luc Picard",
      dob: "12/31/1970",
      physician: "Beverly Crusher",
      service: "Consultation",
      status: "Consultation missing information",
      statusDate: "12/15/2022",
    },
    {
      name: "Jean-Luc Picard",
      dob: "12/31/1970",
      physician: "Beverly Crusher",
      service: "Consultation",
      status: "Consultation missing information",
      statusDate: "12/15/2022",
    },
    {
      name: "Jean-Luc Picard",
      dob: "12/31/1970",
      physician: "Beverly Crusher",
      service: "Consultation",
      status: "Consultation missing information",
      statusDate: "12/15/2022",
    },
    {
      name: "Jean-Luc Picard",
      dob: "12/31/1970",
      physician: "Beverly Crusher",
      service: "Consultation",
      status: "Consultation missing information",
      statusDate: "12/15/2022",
    },
    {
      name: "Jean-Luc Picard",
      dob: "12/31/1970",
      physician: "Beverly Crusher",
      service: "Consultation",
      status: "Consultation missing information",
      statusDate: "12/15/2022",
    },
    {
      name: "Jean-Luc Picard",
      dob: "12/31/1970",
      physician: "Beverly Crusher",
      service: "Consultation",
      status: "Consultation missing information",
      statusDate: "12/15/2022",
    },
    {
      name: "Jean-Luc Picard",
      dob: "12/31/1970",
      physician: "Beverly Crusher",
      service: "Consultation",
      status: "Consultation missing information",
      statusDate: "12/15/2022",
    },
    {
      name: "Jean-Luc Picard",
      dob: "12/31/1970",
      physician: "Beverly Crusher",
      service: "Consultation",
      status: "Consultation missing information",
      statusDate: "12/15/2022",
    },
    {
      name: "Jean-Luc Picard",
      dob: "12/31/1970",
      physician: "Beverly Crusher",
      service: "Consultation",
      status: "Consultation missing information",
      statusDate: "12/15/2022",
    },
    {
      name: "Abhishek",
      dob: "12/31/1970",
      physician: "Beverly Crusher",
      service: "Consultation",
      status: "Consultation missing information",
      statusDate: "12/15/2022",
    },
  ] as patient[];
  const columnName = [
    "Patient Name",
    "DOB",
    "Physician",
    "Service",
    "Status",
    "Status Date",
  ];

  return (
    <Item as="div" className="Provider-Status-table">
      <TablePagination
        numberOfItemsShow={5}
        totalCount={patientInfo.length}
        data={patientInfo}
        columnNames={columnName}
      ></TablePagination>
    </Item>
  );
};
