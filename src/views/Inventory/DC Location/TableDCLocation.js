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
        title: 'Are you sure to delete this DC Location id ' + row.LOCN_NAME + '?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.value) {

            axios.post('/claritybqm/reportFetchJ/?scriptName=DC_LOCATION_DELETE', row
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
        title: 'DC Location ID',
        field: 'LOCN_ID',
      },
      {
        title: 'DC Location',
        field: 'LOCN_NAME',
      },
      {
        title: 'DC Site',
        field: 'SITE_NAME',
      },
      {
        title: 'DC Type',
        field: 'LOCN_TYPE',
      },
      // {
      //   title: 'State',
      //   field: 'LOCN_STATE',
      // },
      {
        title: 'Status',
        field: 'LOCN_STATUS',
      },

      {
        title: 'Commission Date',
        field: 'LOCN_COMM_DT_V',
      },
      {
        title: 'Decommission Date',
        field: 'LOCN_DECOMM_DT_V',
      },
    ],
  });

  return (
    <MaterialTable
      title='DC Location'
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
            return(<Link to={"/ViewLocation/" + props.data.LOCN_ID}>
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
            if( props.action.icon == 'edit'){    
                if(props.data.LOCN_STATUS !== 'Not Active' && props.data.LOCN_DECOMM_DT_V === "" || props.data.LOCN_DECOMM_DT_V === 'null' || props.data.LOCN_DECOMM_DT_V === null){                           
                return(<Link to={"/EditDCLocation/" + props.data.LOCN_ID} >
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
                }else{
                  return(
                 // <Link to={"/EditDCLocation/" + props.data.LOCN_ID} >
                  <Tooltip title="Edit" >
                  <Icon
                    //onClick={ }
                    color="disabled"
                    variant="contained"
                    //style={{textTransform: 'none', tooltip: 'Edit'}}
                    size="small"
                  >
                    edit
                  </Icon>
                  </Tooltip>
                  //</Link>
                  )
                }
            }
        //     if( props.action.icon == 'delete'){
        //         return(
        //         <Tooltip title="Delete" >
        //         <Icon
        //           onClick={() => handleDelete(props.data)}
        //           color="primary"
        //           variant="contained"
        //           //style={{textTransform: 'none', tooltip: 'Delete'}}
        //           size="small"
        //         >
        //           delete
        //         </Icon>
        //         </Tooltip>)
        //     }
          
         }
      }}
    />
  );
}