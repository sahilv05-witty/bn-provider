import { Item, Pagination, Table, PaginationProps } from "semantic-ui-react";
import { useEffect, useState } from "react";
import "./table.scss";
import { InputButton, InputField, InputSelect } from "../../form";
// type TableColumn = {
// 	name: string;
// 	label: string;
// 	isSortable: boolean;
// 	isVisiable: boolean;
// 	onSort: (sortColumnName: string, sortType: ASC | DESC) => void;
// 	addClasses: []
// }

interface TableProp {
  columnNames: string[];
  data: { [k: string]: any }[];
  isPaginationRequired?: boolean;
  defaultActivePage?: number;
  totalCount: number;
  numberOfItemsShow?: number;
}

export const TablePagination = ({
  numberOfItemsShow = 5,
  totalCount,
  defaultActivePage = 1,
  columnNames,
  data,
  isPaginationRequired = true,
}: TableProp) => {
  const[totalPages,updateTotalPages] = useState(0);
  useEffect(() => {
  // Total number of pages calculation
    updateTotalPages(Math.ceil(totalCount / numberOfItemsShow));
    getDataByPageNo(defaultActivePage,numberOfItemsShow);
  }, []);
  const [currentPage, updateCurrentPage] = useState(defaultActivePage);
  const [pageinput, updatePageInput] = useState("");
  const [currentPageItems, updateCurrentPageItems] = useState(
    [] as { [k: string]: any }[]
  );
  const getDataByPageNo = (pageNo: number,perPageItem:number) => {
    updateCurrentPage(pageNo);
    updateCurrentPageItems(
      data.slice((pageNo - 1) * perPageItem, pageNo * perPageItem)
    );
  };
  const onPageChange = (pageNo: number, fieldValue = "",incrementedItemPerPage=numberOfItemsShow) => {
    updateTotalPages(Math.ceil(totalCount / incrementedItemPerPage));
    if (!pageNo) pageNo = 1;
    getDataByPageNo(pageNo,incrementedItemPerPage);
    updatePageInput(fieldValue);
  };
  type DropdownOptionProps = {
    key: string;
    value: string;
    text: string;
  };
  const pagesCounts = [
    {
      key: numberOfItemsShow,
      value: numberOfItemsShow,
      text: numberOfItemsShow,
    },
    {
      key: "24",
      value: "24",
      text: "24",
    },
    {
      key: "48",
      value: "48",
      text: "48",
    },
    {
      key: "96",
      value: "96",
      text: "96",
    }
  ] as DropdownOptionProps[];
  return (
    <Item as="div" className="Provider-Status-table">
      <Table singleLine striped>
        <Table.Header>
          <Table.Row>
            {columnNames.map((colHeader) => {
              return <Table.HeaderCell>{colHeader}</Table.HeaderCell>;
            })}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {currentPageItems.map((info, index) => {
            return (
              <Table.Row key={index}>
                {Object.keys(info).map((fieldKey) => {
                  return <Table.Cell>{info[fieldKey]}</Table.Cell>;
                })}
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
      {isPaginationRequired ? (
        <Item as="div" className="pagination-container">
          <div>{data.length} Result</div>
          <Item as="div" className="col">
            <Pagination
              prevItem={{ content: "Prev" }}
              nextItem={{ content: "Next" }}
              defaultActivePage={defaultActivePage}
              activePage={currentPage}
              onPageChange={(e, data) => {
                onPageChange(+(data.activePage || 1));
              }}
              totalPages={totalPages}
            />
            <div>
              Page {currentPage} of {totalPages}
              <input
                type="number"
                min={1}
                max={10}
                value={pageinput}
                placeholder="Page No"
                onChange={({ target }: React.ChangeEvent<HTMLInputElement>) => {
                  let {value } = target;
                  onPageChange(+value, value);
                }}
              />
            </div>
          </Item>
           
          <div>
            <InputSelect name="pagesCounts" defaultValue={numberOfItemsShow} onChange={(event,data) => {
                const { value } = data;
              onPageChange(1,"",+(value||numberOfItemsShow));
              }} options={pagesCounts} />
          </div>
        </Item>
      ) : (
        ""
      )}
    </Item>
  );
};
