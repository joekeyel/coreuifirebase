import React, {useState} from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { Route, Redirect,Link } from "react-router-dom";
import ToolkitProvider, { Search, CSVExport } from 'react-bootstrap-table2-toolkit';
import '../css/style.css';
import {
    Badge,
    Button,
    Card,
    CardBody,
    CardFooter,
    Carddatext,
    Col,
    Collapse,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Fade,
   Form,
    FormGroup,
   FormText,
    FormFeedback,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupButtonDropdown,
    InputGroupText,
    Label,
    Modal, ModalHeader, ModalBody, ModalFooter,
    Row, Table, CardHeader, Tooltip, UncontrolledTooltip 
  } from 'reactstrap';
  import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
  import Swal from 'sweetalert2';
  import axios from 'axios';
  import { connect } from "react-redux";
 
const TableRack = (props) =>{
    const [addModal, setaddModal] = useState(false);
    const { SearchBar, ClearSearchButton } = Search;
    
    const handleClick = (row) => {

        console.log('handleClick',row);
        
        Swal.fire({
            title: 'Are you sure to delete this rack no '+ row.RACK_NO +'?',
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
                
                    if(res.data == "success"){
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
            dataField: '',
            text: '#',
            key:'id',
            formatter: (cell,row, rowIndex) => { return(<p key={rowIndex}>{rowIndex + 1}</p>)},
            sort: true,  
        },
        {
            dataField: 'RACK_ID',
            text: 'Rack ID',
            key:'RACK_ID',
            sort: true,  
            filter: textFilter(),
        },
        { 
            dataField: 'RACK_NO',
            text: 'Rack No', 
            key:'RACK_NO',   
            sort: true,
            filter: textFilter(),
        },
        {
            dataField: 'RACK_TYPE', 
            text: 'Rack Type',  
            key:'RACK_TYPE',
            sort: true,
            filter: textFilter(),
          
        },
        {
          dataField: 'RACK_SIZE', 
          text: 'Rack Size',  
          key:'RACK_SIZE',
          sort: true,
          filter: textFilter(),
        
      },
      {
        dataField: 'SITE_NAME', 
        text: 'DC Site',  
        key:'SITE_NAME',
        sort: true,
        filter: textFilter(),
      
        },
        {
        dataField: 'LOCATION_NAME', 
        text: 'DC Location',
        key:'LOCATION_NAME',
        sort: true,  
        filter: textFilter(),
    
        },
        {
        dataField: 'RACK_POWER_DENSITY', 
        text: 'Power Density', 
        key:'RACK_POWER_DENSITY',
        sort: true, 
        filter: textFilter(),
    
        },
        {
        dataField: 'RACK_INSERT_DT', 
        text: 'Commision Date',  
        key:'RACK_INSERT_DT',
        headerStyle: { width: '10%' },
        sort: true,
        filter: textFilter(),
    
        },
        {
        dataField: 'RACK_DECOMM_DT', 
        text: 'Decommision Date',
        key:'RACK_DECOMM_DT',
        headerStyle: { width: '10%' },
        sort: true,  
        filter: textFilter(),
        
        },
        {
        dataField: 'RACK_CUSTOMER', 
        text: 'Customer Name',
        key:'RACK_CUSTOMER',
        sort: true,  
        filter: textFilter(),
        
        },
        {
        dataField: 'RACK_SERVICEID', 
        text: 'Service ID',
        key:'RACK_SERVICEID',
        sort: true,  
        filter: textFilter()
        },
        {
            dataField: 'action',
            text: 'Action',
            key:'Action',
            isDummyField: true,
            formatter: (cell,row)=>{
                    return(<div>
                        <Link  to={"/rackEdit/" + row.RACK_ID} >
                        <Button color="primary" className="btn-pill" size="sm">Edit</Button>
                        </Link>
                        <Button color="danger" className="btn-pill" size="sm"  onClick={() => handleClick(row)}> Delete</Button>
                        </div>)
            },
            //formatExtraData: { hoverIdx: this.state.hoverIdx },
            headerStyle: { width: '10%' },
            // style: { height: '30px' }
        },
    
        ]
// const serachTable = (x) => {

//     var search = x.target.value
//     var filter = props.rack.filter(rack => rack.RACK_NO == search );

//     console.log('search',filter);


// }
const customTotal = (from, to, size) => (
<span className="react-bootstrap-table-pagination-total">
    Showing { from } to { to } of { size } Results
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
    return(
        <div style={{marginLeft: '400px'}}>
            <i key="id" className="fa fa-database"></i>
            <span>&nbsp;No Data Found</span>&nbsp;&nbsp;
        </div>
        
    )
}
 
const MySearch = (props) => {
    let input;
    const handleClick = () => {
      props.onSearch(input.value);
    };
  
    return (
      <div className="form-group has-search">
        <span className="fa fa-search form-control-feedback"></span>
        <input
          className="form-control"
          placeholder="Search"
          //style={ { backgroundColor: 'pink' } }
          onChange={ handleClick }
          ref={ n => input = n }
          type="text"
        />
      </div>
    );
  };
    return(
       
                <ToolkitProvider
                
                keyField="id"
                data={ props.rack }
                columns={ columns }
                search
                >
                {
                    props => (
                    <div> 
                        {/* <h3>Input something at below input field:</h3> */}

                            <MySearch  { ...props.searchProps }/>
                       
                            
                        <hr/>
                        <BootstrapTable
                        bootstrap4
                        { ...props.baseProps }
                        pagination={ paginationFactory(options) }
                        noDataIndication= { noDataFound }
                        filter={ filterFactory() }
                        striped
                        hover
                        condensed
                        responsive
                        size="sm"
                        />
                    </div>
                    )
                }
                </ToolkitProvider>
                )
               {/*<div>
                 <Row className="form-group has-search">
                <Col xs='6'>
                <span class="fa fa-search form-control-feedback"></span><Input onChange={serachTable} placeholder="Search"></Input>
                </Col>
                </Row>
                <SearchBar { ...props.searchProps } />
                <hr/>
                 <BootstrapTable
                        bootstrap4
                        keyField="id"
                        data={ props.rack }
                        columns={ columns }
                        pagination={ paginationFactory(options) }
                        noDataIndication= { noDataFound }
                        filter={ filterFactory() }
                        striped
                        hover
                        condensed
                        responsive
                        size="sm"
                        search
                        /> 
                        </div>)*/}
    
}

const mapStateToProps = state => {
    return {
      rack: state.rack
    };
  };
  
  const mapDispachToProps = dispatch => {
    return {
  
      fetchRack: () => dispatch({ type: "FETCH_RACK"}),
    
    };
  };
  
export default connect(mapStateToProps,mapDispachToProps)(TableRack)