import React from 'react';
import { Route, Redirect, Link } from "react-router-dom";
import MaterialTable, { MTableToolbar } from 'material-table';
import { Button, Tooltip } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import Swal from 'sweetalert2';
import axios from 'axios';

export default function TableDCLocation(props) {
  //console.log('table',props);

  //to handle delete row function
  const handleDelete = (row) => {
    //console.log('handlDelete',row);

    Swal.fire({
        title: 'Are you sure to delete this Network Bandwidth ' + row.NTW_NAME + '?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.value) {

            axios.post('/claritybqm/reportFetchJ/?scriptName=DC_NETWORK_BANDWIDTH_DELETE', row
            ).then((res) => {

                if (res.data === "success") {
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
        title: 'Network Ref ID',
        field: 'NTW_ID',
      },
      {
        title: 'Network Name',
        field: 'NTW_NAME',
      },
      {
        title: 'Bandwidth',
        field: 'NTW_BANDWIDTH',
      },
      {
        title: 'DC Site',
        field: 'SITE_NAME',
      },
      {
        title: 'Status',
        field: 'NTW_STATUS',
      },
      {
        title: 'Description',
        field: 'NTW_DESC',
      },
      {
        title: 'Commision Date',
        field: 'NTW_COMM_DT_V',
      },
      {
        title: 'Decommision Date',
        field: 'NTW_DECOMM_DT_V',
      },
    ],
  });

  return (
    <MaterialTable
      title='Network Bandwidth'
      icons={{ Filter: () => <div /> }} 
      options={{    
        //hover: true,
        filtering: true,
        pageSize: 10,
    }}
      columns={state.columns}
      data={props.data}
      actions={[
        {
          icon: 'view',
          tooltip: 'View data',
          onClick: (event, rowData) => console.log(rowData)
          //(event, rowData) => alert("You saved " + rowData.LOCN_ID)
        },
        {
          icon: 'edit',
          tooltip: 'Edit data',
          onClick: (event, rowData) => console.log(rowData)
          //(event, rowData) => alert("You saved " + rowData.LOCN_ID)
        },
      //   {
      //     icon: 'delete',
      //     tooltip: 'Delete data',
      //     onClick: (event, rowData) => console.log('delete',rowData)
      //     //(event, rowData) => alert("You saved " + rowData.LOCN_ID)
      //  }
      ]}
      components={{
        Action: (props) => {
           //console.log('propsaction',props.data);
           if( props.action.icon === 'view'){                               
            return(<Link to={"/ViewNetworkBand/" + props.data.NTW_ID}>
            <Tooltip title="View" >
            <Icon
              //onClick={ }
              color="primary"
              variant="contained"
              //style={{textTransform: 'none', tooltip: 'Edit'}}
              size="small"
            >
              visibilityRound
            </Icon>
            </Tooltip>
            </Link>)
           }
            //display button based on action edit/delete
            if( props.action.icon === 'edit'){                               
                return(<Link to={"/EditBandwidth/" + props.data.NTW_ID} >
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
            // if( props.action.icon === 'delete'){
            //     return(
            //     <Tooltip title="Delete" >
            //     <Icon
            //       onClick={() => handleDelete(props.data)}
            //       color="primary"
            //       variant="contained"
            //       //style={{textTransform: 'none', tooltip: 'Delete'}}
            //       size="small"
            //     >
            //       delete
            //     </Icon>
            //     </Tooltip>)
            // }
          
        }
      }}
    />
  );
}