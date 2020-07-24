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
        title: 'Contractual Space Size (sqft)',
        field: 'CAGE_CONTRACTUAL_SPACE_SIZE',
      },
      {
        title: 'Status',
        field: 'CAGE_STATUS',
      },
      {
        title: 'Service ID',
        field: 'CAGE_SERVICEID',
      },
      {
        title: 'Customer',
        field: 'CUSTOMER_NAME',
      },
      {
        title: 'Cage No',
        field: 'CAGE_NO',
      },
      {
        title: 'Suite No',
        field: 'CAGE_SUITE_NO',
      },

      {
        title: 'Contractual Power',
        field: 'CAGE_CONTRACTUAL_POWER',
      },
      {
        title: 'No of Rack',
        field: 'CAGE_NO_RACK',
      }
    ],
  });

  return (
    <MaterialTable
      title="Space"
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