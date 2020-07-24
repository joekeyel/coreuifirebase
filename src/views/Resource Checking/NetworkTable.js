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
            render: (cell) => <p>{cell.tableData.id + 1}</p>
          },
          {
            title: 'Port No.',
            field: 'PORT_NO',
          },
          {
            title: 'Network Name',
            field: 'NTW_NAME',
          },
          {
            title: 'DC Site',
            field: 'SITE_NAME',
          },
          {
            title: 'Network Type',
            field: 'PORT_NTW_TYPE',
          },
          {
            title: 'Data Cable Prelaid',
            field: 'PORT_CAB_PRELAID',
          },
          {
            title: 'Status',
            field: 'PORT_STATUS',
          },
          {
            title: 'Description',
            field: 'PORT_DESC',
          },
          {
            title: 'Commision Date',
            field: 'PORT_COMM_DT',
          },
          {
            title: 'Decommision Date',
            field: 'PORT_DECOMM_DT',
          },
          {
            title: 'Customer Name',
            field: 'CUSTOMER_NAME',
          },
        ],
      });

  return (
    <MaterialTable
      title="Network"
      //hover={true}
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