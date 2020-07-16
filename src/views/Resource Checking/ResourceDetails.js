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
  Row,Progress
} from 'reactstrap';
import TableRack from '../Inventory/Rack/TableRack';
import TableSpace from '../Inventory/Rack/TableRack';
import TableNetwork from '../Inventory/Network Port/TableNTWPort';
import { connect } from "react-redux";

class ResourceDetails extends Component {
    constructor(props) {
        super(props);
        //this.handleInputChange = this.handleInputChange.bind(this);
        this.state={
            formValues: '',
            open: false,
            message: '',
            data: [],
          }
        
      }
    
      componentDidMount(){
      
        this.props.fetchRack();
        this.props.fetchPort();
    
      }
    
     
    render(){
        const rack = this.state.rack
        const port = this.state.port
    return(
        <div className="animated fadeIn" >
            <Row>
                <Card>
                    <CardHeader>
                        <strong>Rack Details</strong>
                        {/* <small> Form</small> */}
                    </CardHeader>
                    <CardBody>
                        <TableRack data={rack} />
                    </CardBody>
                </Card>
            </Row>
            <Row>
                <Card>
                    <CardHeader>
                        <strong>Space Details</strong>
                        {/* <small> Form</small> */}
                    </CardHeader>
                    <CardBody>
                        <TableSpace data={rack} />
                    </CardBody>
                </Card>
            </Row>
            <Row>
                <Card>
                    <CardHeader>
                        <strong>Network Details</strong>
                        {/* <small> Form</small> */}
                    </CardHeader>
                    <CardBody>
                        <TableNetwork data={port} />
                    </CardBody>
                </Card>
            </Row>
            </div>
        );
    }
    }
    
    const mapStateToProps = state => {
        return {
          rack: state.rack,
          port:  state.port
        };
      };
      
      const mapDispachToProps = dispatch => {
        return {
      
          fetchRack: () => dispatch({ type: "FETCH_RACK"}),
          fetchPort: () => dispatch({ type: "FETCH_PORT"}),
        
        };
      };
export default connect(mapStateToProps,mapDispachToProps)(ResourceDetails);
