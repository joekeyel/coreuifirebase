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
  Modal, ModalHeader, ModalBody, ModalFooter,
  Row, Table
} from 'reactstrap';
//import {Snackbar,IconButton } from '@material-ui/core';
//import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
//import CloseIcon from '@material-ui/icons/Close';

class DCLocation extends Component {
  constructor(props) {
    super(props);
    //this.handleInputChange = this.handleInputChange.bind(this);
    this.state={
        formValues: '',
        open: false,
        message: '',
        userData: [],
        data: [],
        options: [{
            text: '',
            value: ''
        }],
        currentUser: "DCOADMIN",
        
      }
    
  }

  componentDidMount(){
  
    this.getUserRoles();
        
  }

  getUserRoles(){
      
    fetch('/claritybqm/reportFetch/?scriptName=DC_ROLES&userid='+ this.state.currentUser)
    .then(res => res.json())
    .then((dcApprover) =>  { console.log(dcApprover) 
       // this.createUSerRole(dcApprover);
        this.setState({
            userData: dcApprover
        })
    });

  }

render(){
    //console.log('data',this.state.data);
    const options = this.state.options
return(
    <div className="animated fadeIn" >
        <Row>
        <Col xs="12">
            <Card>
                <CardHeader>
                    <strong>DC Location</strong>
                    {/* <small> Form</small> */}
                </CardHeader>
                <CardBody>
                 <Card>
                 
                <CardBody>
                <Row>
                    <Col xs="4">
                    <Label>DC Site :</Label>
                    <Input type="text" id="dcSite" name="dcSite" value={this.state.autoOrderId} onChange={this.handleInputChange} />
                    <Label>DC Location ID :</Label>
                    <Input type="text" id="dcLocationID" name="cLocationID" onChange={this.handleInputChange}/>
                    <Label>DC Location :</Label>
                    <Input type="text" id="dcLocation" name="dcLocation" onChange={this.handleInputChange}/>
                    <Label>DC Type :</Label>
                    <Input type="select" name="select" id="select">
                        <option value="0">Please select</option>
                        <option value="1">Premium</option>
                        <option value="2">Option #2</option>
                        <option value="3">Option #3</option>
                      </Input>
                </Col>
                <Col xs="4">
                    <Label>Space Capacity (sqft) :</Label>
                    <Input type="text" id="capacity" name="capacity" onChange={this.handleInputChange}/>
                    <Label>Floor Plan :</Label>
                    <Input type="file" id="file-input" name="file-input" />
                    <Label>Rack Utilization :</Label>
                    <Input type="file" id="file-input" name="file-input" />
                    <Label> Commission Date </Label>
                    <Input type="date" id="date-input" name="date-input" placeholder="date" />
                    <Label> Decommission Date </Label>
                    <Input type="date" id="date-input" name="date-input" placeholder="date" />
                    
                    
                </Col>
                <Col xs="4">
                    <Label>Status :</Label>
                    <Input type="select" name="select" id="select">
                        <option value="0">Please select</option>
                        <option value="1">Active</option>
                        <option value="2">Not Active</option>
                        <option value="3">KIV</option>
                      </Input>
                    <Label>Description :</Label>
                    <Input type="textarea" rows="4" id="description" name="description" onChange={this.handleInputChange}/>

                </Col>
             </Row> 
                </CardBody>
                 </Card>
                </CardBody>
                <CardFooter>
                <Button type="save" color="primary"> Save</Button>
                <Button type="submit" color="success"> Submit</Button>
                <Button type="reset" color="danger"> Reset</Button>
              </CardFooter>
            </Card>
        </Col>
        </Row>
        </div>
    );
}
}

export default DCLocation;