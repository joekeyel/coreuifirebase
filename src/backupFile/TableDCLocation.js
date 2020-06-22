import React, { useState, useEffect } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { Route, Redirect, Link } from "react-router-dom";
import ToolkitProvider, { Search, CSVExport } from 'react-bootstrap-table2-toolkit';
//import '../css/style.css';
import { Badge, Button, Card, CardBody, CardFooter, CardHeader, Col, Form, FormGroup, Label, Row, Input } from 'reactstrap';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import Swal from 'sweetalert2';
import axios from 'axios';
import { connect } from "react-redux";


const TableDCLocation = (props) => {

    // const [ DataDCSite , setDataDCSite ] = useState(props.DCSite);
    console.log('useeffect', props);


    //to handle delete row function
    const handleDelete = (row) => {
        //console.log('handlDelete',row);

        Swal.fire({
            title: 'Are you sure to delete this DCSite no ' + row.DCSite_NO + '?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.value) {

                axios.post('/claritybqm/reportFetchJ/?scriptName=DC_Site_DELETE', row
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

    const columns = [
        {
            dataField: 'id',
            text: '#',
            key: 'id',
            formatter: (cell, row, rowIndex) => { return (<p key={rowIndex}>{rowIndex + 1}</p>) },
            sort: true,
        },
        {
            dataField: 'LOCN_ID',
            text: 'DC Location ID',
            key: 'LOCN_ID',
            sort: true,
            filter: textFilter(),
        },
        {
            dataField: 'LOCN_NAME',
            text: 'DC Location',
            key: 'LOCN_NAME',
            sort: true,
            filter: textFilter(),
        },
        {
            dataField: 'SITE_NAME',
            text: 'DC Site',
            key: 'SITE_NAME',
            sort: true,
            filter: textFilter(),
            // headerStyle: { width: '30%' },
        },
        {
            dataField: 'LOCN_TYPE',
            text: 'DC Type',
            key: 'LOCN_TYPE',
            sort: true,
            filter: textFilter(),

        },
        {
            dataField: 'LOCN_STATE',
            text: 'State',
            key: 'LOCN_STATE',
            sort: true,
            filter: textFilter(),

        },
        {
            dataField: 'LOCN_STATUS',
            text: 'Status',
            key: 'LOCN_STATUS',
            sort: true,
            filter: textFilter(),

        },
        {
            dataField: 'LOCN_CREATED_DT',
            text: 'Commission Date',
            key: 'LOCN_CREATED_DT',
            sort: true,
            filter: textFilter(),

        },
        {
            dataField: 'LOCN_UPDATED_DT',
            text: 'Decommission Date',
            key: 'LOCN_UPDATED_DT',
            sort: true,
            filter: textFilter()
        },
        {
            dataField: 'action',
            text: 'Action',
            key: 'Action',
            isDummyField: true,
            formatter: (cell, row) => {
                return (<div key={row.SITE_ID}>
                    <Link to={"/dcLocationEdit/" + row.SITE_ID} >
                        <Button color="primary" className="btn-pill" size="sm">Edit</Button>
                    </Link>
                    <Button color="danger" className="btn-pill" size="sm" onClick={() => handleDelete(row)}> Delete</Button>
                </div>)
            },
            //formatExtraData: { hoverIdx: this.state.hoverIdx },
            headerStyle: { width: '10%' },
            // style: { height: '30px' }
        },

    ]

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


    const noDataFound = () => {
        return (
            <div id="noDataFound" style={{ marginLeft: '400px' }}>
                <i className="fa fa-database"></i>
                <span>&nbsp;No Data Found</span>&nbsp;&nbsp;
            </div>

        )
    }

    //search filter
    const MySearch = (props) => {
        let input;
        const handleClick = () => {
            props.onSearch(input.value);
        };

        return (
            <div className="form-group has-search">
                <span className="fa fa-search form-control-feedback"></span>
                <input
                    id="search"
                    className="form-control"
                    placeholder="Search"
                    //style={ { backgroundColor: 'pink' } }
                    onChange={handleClick}
                    ref={n => input = n}
                    type="text"
                />
            </div>
        );
    };
    return (

        <ToolkitProvider
            keyField='id'
            data={props.data}
            columns={columns}
            search
        >
            {
                props => (        // console.log('propsddd',...props.baseProps.data)                 
                    <div id='table'>
                        {/* <h3>Input something at below input field:</h3> */}

                        <MySearch key='id' {...props.searchProps} />

                        <hr />
                        <div className="expanded-container">
                        <BootstrapTable
                            bootstrap4
                            //key={props['key']}
                            {...props.baseProps}
                            pagination={paginationFactory(options)}
                            noDataIndication={noDataFound}
                            filter={filterFactory()}
                            striped
                            hover
                            condensed
                            size="sm"
                        />
                    </div>
                    </div>
                )
            }
        </ToolkitProvider>
    )


}

export default (TableDCLocation)