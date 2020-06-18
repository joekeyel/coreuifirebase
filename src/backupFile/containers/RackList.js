import React, { Component } from 'react';
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
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
  Modal, ModalHeader, ModalBody, ModalFooter,Tooltip, UncontrolledTooltip ,
  Row, Table
} from 'reactstrap';
import {Snackbar,IconButton } from '@material-ui/core';
//import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
//import CloseIcon from '@material-ui/icons/Close';
import TableRack from '../sub-containers/tableRack';
import { connect } from "react-redux";

class RackList extends Component {
  constructor(props) {
    super(props);
    //this.handleInputChange = this.handleInputChange.bind(this);
    //this.toggle = this.toggle.bind(this);
    this.state={
        formValues: '',
        open: false,
        message: '',
        data: [],
        delete: 'false',
      }
    
  }

  componentDidMount(){
    console.log('componentDidMount',this.props);
    this.props.fetchRack();
  }

  componentWillReceiveProps(props){
    console.log('props',props);
    this.setState({
      data: this.props.rack,
    })

  }

 
render(){
    //console.log('render', this.state.action);
    const data =  this.state.data
return(
    <div className="animated fadeIn" >
        <Row>
        <Col xs="12">
            <Card>
                <CardHeader>
                    <strong>Rack List</strong>
                    {/* <small> Form</small> */}
                </CardHeader>
                <CardBody>
                <Card>
                    <CardHeader>
                      <Button color="primary" href="#/rackCreate"><i className="fa fa-plus-square"></i>&nbsp; Add New Rack</Button>
                        </CardHeader>
                        <CardBody>
                              <TableRack data={data} keyField="id" props={()=> this.props.fetchRack()}/>
                          </CardBody>
                      </Card>
                </CardBody>
            </Card>
        </Col>
        </Row>
        </div>
    );
}
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
  
export default connect(mapStateToProps,mapDispachToProps)(RackList);