import React , {useState} from 'react';
import { Route, Redirect, Link } from "react-router-dom";
import MaterialTable, { MTableToolbar } from 'material-table';


export default function TableDCSite(props) {
  //console.log('table',props);

  const [state, setState] = useState({
    columns: [
      {
        title: '#',
        field: 'row',
       // render: (cell) => <p>{cell.tableData.id + 1}</p>
      },
      {
        title: 'DC Site ID',
        field: 'SITE_ID',
      },
      {
        title: 'DC Site',
        field: 'SITE_NAME',
      },
    //   {
    //     title: 'Full Address',
    //     field: 'FULL_ADDRESS',
    //   },
    //   {
    //     title: 'Postcode',
    //     field: 'ADDE_POSTCODE',
    //   },
    //   {
    //     title: 'State',
    //     field: 'ADDE_STATE',
    //   },
    //   {
    //     title: 'Total Space',
    //     field: 'SITE_TOTAL_SPACE_CAP',
    //   },
    //   {
    //     title: 'Total Power',
    //     field: 'SITE_TOTAL_POWER_CAP',
    //   },
      {
        title: 'Status',
        field: 'SITE_STATUS',
      },
      {
        title: 'Description',
        field: 'SITE_DESC',
      },
      {
        title: 'Approved',
        field: 'SITE_VERIFIED_TAG',
      },
      {
        title: 'Commission Date',
        field: 'SITE_COMM_DT_V',
      },
      {
        title: 'Decommission Date',
        field: 'SITE_DECOMM_DT_V',
      },
    ],
  });

  return (
    <MaterialTable
      title="DC Site"
      hover={true}
      options={{    
          //hover: true,
          filtering: true,
      }}
      icons={{ Filter: () => <div /> }} 
      columns={state.columns}
      data={props.data}
    />
  );
}