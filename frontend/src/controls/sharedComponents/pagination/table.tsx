

import { Item,Pagination , Table , PaginationProps} from 'semantic-ui-react';
import { useEffect, useState } from 'react';
import "./table.scss"
import { InputButton, InputField } from '../../form';

interface PaginationProbs {
defaultActivePage?:number;
totalCount:number;
onChangeEvent:Function;
perPageItem?:number;
}
// type TableColumn = {
// 	name: string;
// 	label: string;
// 	isSortable: boolean;
// 	isVisiable: boolean;
// 	onSort: (sortColumnName: string, sortType: ASC | DESC) => void;	
// 	addClasses: []
// }

interface TableProp {
columnNames:string[];
data:{[k:string]:any}[];
isPaginationRequired?:boolean;
defaultActivePage?:number;
totalCount:number;
numberOfItemsShow?:number;
}


export const TablePagination = ({numberOfItemsShow = 5,totalCount,defaultActivePage= 1, columnNames, data, isPaginationRequired=true }:TableProp) =>{
  useEffect(()=>{
    updateCurrentPageItems(data.slice(defaultActivePage-1,numberOfItemsShow));
  },[]);

  let [itemPerPage, updateItemPerPage] = useState(numberOfItemsShow);
let totalPages = Math.ceil(totalCount/itemPerPage);

const [currentPage,updateCurrentPage] = useState(defaultActivePage);
const [pageinput, updatePageInput] = useState('');
const [currentPageItems,updateCurrentPageItems] = useState([] as {[k:string]:any}[]);

const getDataByPageNo = (pageNo:number)=>{
  updateCurrentPage(pageNo);
  updateCurrentPageItems(data.slice((pageNo-1)*itemPerPage,pageNo*itemPerPage));
}
const onChange = (pageInfo:PaginationProps)=>{
// Event when press on pagination number
  const pageNo = +(pageInfo.activePage || 1);
getDataByPageNo(pageNo);
updatePageInput('');
}
// Page Input field 
const updateFieldValue = (value:string)=>{
  updatePageInput(value);
  const pageNo = +(value || 1);
  getDataByPageNo(pageNo);
  
}
//
const perPageItemInc = ()=>{  
  if(itemPerPage <= data.length){
  updateItemPerPage(++itemPerPage);
  totalPages = Math.ceil(totalCount/itemPerPage);
  updatePageInput('');
  getDataByPageNo(1);
  }
} 


return (
  <Item as="div" className="Provider-Status-table">
  <Table singleLine striped>
  <Table.Header>
    <Table.Row>
      {columnNames.map((colHeader)=>{
        return (
          <Table.HeaderCell>{colHeader}</Table.HeaderCell>     
        )
      })}
    </Table.Row>
  </Table.Header>
  <Table.Body>{
       currentPageItems.map((info,index)=>{
        return (
          <Table.Row key={index}>{
            Object.keys(info).map((fieldKey)=>{
              return (
                <Table.Cell>{info[fieldKey]}</Table.Cell>    
              )
            })
          }
          </Table.Row>
        )
       })
      }
        </Table.Body>
</Table>
{
  isPaginationRequired?
  <>
  <div>
    {data.length} Result
  </div>
  <Pagination defaultActivePage={defaultActivePage} activePage={currentPage} onPageChange={(e,data)=>onChange(data)} totalPages={totalPages} />
 <div>Page {currentPage} of {totalPages}
<input type='number'
  min={1}
  max={10}
  value={pageinput}
  placeholder='Page No'
  onChange={({target}: React.ChangeEvent<HTMLInputElement>)=>{
  const {name, value} = target;
  updateFieldValue(value);
}}
/>
 </div>
 <div>
 <InputButton
              text="Increment"
              inline
              fluid
              requiredHintText
              onClick={perPageItemInc}
            />
 </div>
  </>:''
}
  </Item>
  )
}
