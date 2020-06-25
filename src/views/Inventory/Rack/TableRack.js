import React from 'react';
import { Route, Redirect, Link } from "react-router-dom";
import MaterialTable, { MTableToolbar } from 'material-table';
import { Button, Tooltip } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import Swal from 'sweetalert2';
import axios from 'axios';

export default function TableDCLocation(props) {
  console.log('table',props);

  //to handle delete row function
  const handleDelete = (row) => {
    //console.log('handlDelete',row);

    Swal.fire({
        title: 'Are you sure to delete this Rack No ' + row.RACK_NO + '?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.value) {

            axios.post('/claritybqm/reportFetchJ/?scriptName=DC_RACK_DELETE', row
            ).then((res) => {

                if (res.data == "success") {
                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                    )
                    props.props();
                }

            })
                .catch((err) => {
                    console.log('failed to delete : ', err);
                });

        }
    })

    }

  
  const [state, setState] = React.useState({
    columns: [
      {
        title: '#',
        field: 'row',
        render: (cell) => <p>{cell.tableData.id + 1}</p>
      },
      {
        title: 'Rack ID',
        field: 'RACK_ID',
      },
      {
        title: 'Rack No',
        field: 'RACK_NO',
      },
      {
        title: 'Rack Type',
        field: 'RACK_TYPE',
      },
      {
        title: 'Rack Size',
        field: 'RACK_SIZE',
      },
      {
        title: 'DC Site',
        field: 'SITE_NAME',
      },
      {
        title: 'DC Location',
        field: 'LOCATION_NAME',
      },

      {
        title: 'Power Density',
        field: 'RACK_POWER_DENSITY',
      },
      {
        title: 'Commision Date',
        field: 'RACK_INSERT_DT',
      },
      {
        title: 'Decommision Date',
        field: 'RACK_DECOMM_DT',
      },
      {
        title: 'Customer Name',
        field: 'RACK_CUSTOMER',
      },
      {
        title: 'Service ID',
        field: 'RACK_SERVICEID',
      },
    ],
  });

  return (
    <MaterialTable
      title='Rack'
      hover={true}
      options={{    
        //hover: true,
        filtering: true,
    }}
      columns={state.columns}
      data={props.data}
      actions={[
        {
          icon: 'edit',
          tooltip: 'Edit data',
          onClick: (event, rowData) => console.log(rowData)
          //(event, rowData) => alert("You saved " + rowData.LOCN_ID)
        },
        {
          icon: 'delete',
          tooltip: 'Delete data',
          onClick: (event, rowData) => console.log('delete',rowData)
          //(event, rowData) => alert("You saved " + rowData.LOCN_ID)
       }
      ]}
      components={{
        Action: (props) => {
           //console.log('propsaction',props.data);
            
            //display button based on action edit/delete
            if( props.action.icon == 'edit'){                               
                return(<Link to={"/EditRack/" + props.data.LOCN_ID} >
                <Tooltip title="Edit" >
                <Icon
                  //onClick={ }
                  color="primary"
                  variant="contained"
                  //style={{textTransform: 'none', tooltip: 'Edit'}}
                  size="small"
                >
                  edit
                </Icon>
                </Tooltip>
                </Link>)
            }
            if( props.action.icon == 'delete'){
                return(
                <Tooltip title="Delete" >
                <Icon
                  onClick={() => handleDelete(props.data)}
                  color="primary"
                  variant="contained"
                  //style={{textTransform: 'none', tooltip: 'Delete'}}
                  size="small"
                >
                  delete
                </Icon>
                </Tooltip>)
            }
          
        }
      }}
    />
  );
}