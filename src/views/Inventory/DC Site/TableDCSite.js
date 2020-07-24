import React from 'react';
import { Route, Redirect, Link } from "react-router-dom";
import MaterialTable, { MTableToolbar } from 'material-table';
import { Button, Tooltip, createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import Swal from 'sweetalert2';
import axios from 'axios';

export default function TableDCSite(props) {
  //console.log('table',props);


  //to handle delete row function
  const handleDelete = (row) => {
    //console.log('handlDelete',row);

    Swal.fire({
        title: 'Are you sure to delete this DCSite no ' + row.SITE_NAME + '?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.value) {

            axios.post('/claritybqm/reportFetchJ/?scriptName=DC_SITE_DELETE', row
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
                    console.log('failed to save : ', err);
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
        title: 'DC Site ID',
        field: 'SITE_ID',
      },
      {
        title: 'DC Site',
        field: 'SITE_NAME',
      },
      {
        title: 'Full Address',
        field: 'FULL_ADDRESS',
      },
      {
        title: 'Postcode',
        field: 'ADDE_POSTCODE',
      },
      {
        title: 'State',
        field: 'ADDE_STATE',
      },
      {
        title: 'Total Space',
        field: 'SITE_TOTAL_SPACE_CAP',
      },
      {
        title: 'Total Power',
        field: 'SITE_TOTAL_POWER_CAP',
      },
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
    <div style={{ fontSize: '1em'}}>
    <MaterialTable
      title="DC Site"
      options={{    
          //hover: true,
          filtering: true,
          pageSize: 10,
      }}
      icons={{ Filter: () => <div /> }} 
      columns={state.columns}
      data={props.data}
      actions={[
        {
          icon: 'view',
          tooltip: 'View data',
          onClick: (event, rowData) => console.log('view',rowData)
          //(event, rowData) => alert("You saved " + rowData.LOCN_ID)
        },
        {
          icon: 'edit',
          tooltip: 'Edit data',
          onClick: (event, rowData) => console.log('edit',rowData)
          //(event, rowData) => alert("You saved " + rowData.LOCN_ID)
        },
      //   {
      //       icon: 'delete',
      //       tooltip: 'Delete data',
      //       onClick: (event, rowData) => console.log('delete',rowData)
      //       //(event, rowData) => alert("You saved " + rowData.LOCN_ID)
      // }
      ]}
      components={{
        Action: (props) => {
           //console.log('propsaction',props.data);
           if( props.action.icon === 'view'){                               
            return(<Link to={"/ViewSite/" + props.data.SITE_ID}>
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
              if(props.data.SITE_VERIFIED_TAG !== 'Y' && props.data.SITE_DECOMM_DT_V === "" || props.data.SITE_DECOMM_DT_V === 'null' || props.data.SITE_DECOMM_DT_V === null){                                                   
                return(<Link to={"/EditSite/" + props.data.SITE_ID}>
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
                //<Link to={"/EditSite/" + props.data.SITE_ID}>
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
        //     if( props.action.icon === 'delete'){
      
        //        if(props.data.SITE_VERIFIED_TAG === "Y" && props.data.SITE_DECOMM_DT_V !== null){
        //         return(
        //           <Tooltip title="Delete" >
        //           <Icon
        //             //onClick={() => handleDelete(props.data)}
        //             color="disabled"
        //             variant="contained"
        //             //style={{textTransform: 'none', tooltip: 'Delete'}}
        //             size="small"
        //           >
        //             delete
        //           </Icon>
        //           </Tooltip>)
        //        }
        //        else{
        //         return(
        //           <Tooltip title="Delete" >
        //           <Icon
        //             onClick={() => handleDelete(props.data)}
        //             color="primary"
        //             variant="contained"
        //             //style={{textTransform: 'none', tooltip: 'Delete'}}
        //             size="small"
        //           >
        //             delete
        //           </Icon>
        //           </Tooltip>)
        //        }
        //     }
          
        }
      }}
    />
  </div>);
}