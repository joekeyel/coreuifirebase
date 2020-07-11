import React from 'react';
//import MaterialTable, { MTableToolbar } from 'material-table';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
export default function TableMaintenance(props) {
  //console.log('table',props);

 
  const [state, setState] = React.useState({
    columns: [
      {
        text: '#',
        datadataField: 'row',
        formatter: (cell, row, rowIndex) => { return (<p key={rowIndex}>{rowIndex + 1}</p>) },
        key: 'row'
      },
      {
        text: 'Date',
        dataField: 'UPS_ID',
        key: 'DATE'
      },
      {
        text: 'Maintenance Update',
        dataField: 'UPS_NAME',
        key: 'REMARK'
      },
     {
        text: 'Staff Name',
        dataField: 'SITE_NAME',
        key: 'USER_NAME'
      },
      {
        text: 'Staff ID',
        dataField: 'LOCATION_NAME',
        key: 'USER_ID'
      },
    ],
  });

  const customTotal = (from, to, size) => (
    <span className="react-bootstrap-table-pagination-total">
        Showing { from} to { to} of { size} Results
    </span>
);

const options = {
    paginationSize: 4,
    pageStartIndex: 1,
    // alwaysShowAllBtns: true, // Always show next and previous button
    // withFirstAndLast: false, // Hide the going to First and Last page button
    // hideSizePerPage: true, // Hide the sizePerPage dropdown always
    // hidePageListOnlyOnePage: true, // Hide the pagination list when only one page
    firstPageText: 'First',
    prePageText: 'Back',
    nextPageText: 'Next',
    lastPageText: 'Last',
    nextPageTitle: 'First page',
    prePageTitle: 'Pre page',
    firstPageTitle: 'Next page',
    lastPageTitle: 'Last page',
    showTotal: true,
    paginationTotalRenderer: customTotal,
    disablePageTitle: true,
    sizePerPageList: [{
        text: '10', value: 10
    }, {
        text: '20', value: 20
    }, {
        text: 'All', value: props.data.length
    }] // A numeric array is also available. the purpose of above example is custom the text
};

  return (
    <BootstrapTable
    bootstrap4
    keyField='id'
    data={props.data}
    columns={state.columns}
    pagination={paginationFactory(options)}
    noDataIndication='No records'
    striped
    hover
    condensed
    size="sm"
/>
  );
}