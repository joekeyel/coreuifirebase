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
  Row,
} from 'reactstrap';
import '../css/style.css';
import { connect } from "react-redux";
import ReactSwipeButton from 'react-swipe-button';
import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar'; 
import Alert from '@material-ui/lab/Alert';


class Rack extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleClose = this.handleClose.bind(this);
    //this.handleSubmitForm = this.handleSubmitForm.bind(this);
    this.handleAddData = this.handleAddData.bind(this);
    this.handleSaveData = this.handleSaveData.bind(this);
    this.handleSubmitData = this.handleSubmitData.bind(this);
    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300,
      data: [],
      rackID: "",
      formValues: {
        SITE_NAME: '',
        LOCN_NAME: '',
        RACK_ROOM: '',
        RACK_ID: '',
        RACK_NO: '',
        RACK_TYPE: '',
        RACK_SIZE: '',
        RACK_POWER_DENSITY: '',
        RACK_BREAKER_TYPE: '',
        RACK_POWER_PHASE: '',
        RACK_CABLE_ID: '',
        RACK_PDU_A: '',
        RACK_PDU_B: '',
        RACK_SOURCE_A: '',
        RACK_SOURCE_B: '',
        RACK_POWER_PRELAID: '',
        RACK_CABLING_PRELAID: '',
        RACK_STATUS: '',
        RACK_DESC: '',
        RACK_CONTRACTUAL_POWER: '',
        RACK_INSERT_BY: 'AZURA',
      },
      backgcolor: "#b3d9ff",
      unlocked: false,
      headerTilte: 'CREATE',
      openSnackBar : false,
      disableAddForm: false,
      disableSaveForm: true,
    };
  }

  componentDidMount(){
    this.props.fetchRack();
    //console.log('componentDidMount',this.props);
    this.getRackDetail(this.props);

    if(this.state.headerTilte == 'EDIT'){

      this.setState({
         disableAddForm: true,
         disableSaveForm: false,

       })

    }

 }

 getRackDetail(props){

  //console.log('getRackDetail',props);
  
    var id = props.rackID;
    var data = props.rack;
   
    if(id){
      
      if(data){

        var filter = Object.values(data).filter(rack => rack.RACK_ID == id);
        //console.log('FilterRack',filter);

       // var FilterRack = Object.values(filter);
         //console.log('FilterRack',FilterRack);
        filter.map((FilterRack)=> {

          this.setState({ 
            formValues: {
              SITE_NAME: FilterRack.SITE_NAME,
              LOCN_NAME: FilterRack.LOCATION_NAME,
              RACK_ROOM: FilterRack.RACK_ROOM,
              RACK_ID: FilterRack.RACK_ID,
              RACK_NO: FilterRack.RACK_NO,
              RACK_TYPE: FilterRack.RACK_TYPE,
              RACK_SIZE: FilterRack.RACK_SIZE,
              RACK_POWER_DENSITY: FilterRack.RACK_POWER_DENSITY,
              RACK_BREAKER_TYPE: FilterRack.RACK_BREAKER_TYPE,
              RACK_POWER_PHASE: FilterRack.RACK_POWER_PHASE,
              RACK_CABLE_ID: FilterRack.RACK_CABLE_ID,
              RACK_PDU_A: FilterRack.RACK_PDU_A,
              RACK_PDU_B: FilterRack.RACK_PDU_B,
              RACK_SOURCE_A: FilterRack.RACK_SOURCE_A,
              RACK_SOURCE_B: FilterRack.RACK_SOURCE_B,
              RACK_POWER_PRELAID: FilterRack.RACK_POWER_PRELAID,
              RACK_CABLING_PRELAID: FilterRack.RACK_CABLING_PRELAID,
              RACK_STATUS: FilterRack.RACK_STATUS,
              RACK_DESC: FilterRack.RACK_DESC,
              //RACK_INSERT_BY: 'AZURA',
              }
           });
  

        })
        
      }

      if(props.flagEdit == "true"){
        this.setState({
         // backgcolor: '#b3d9ff',
          headerTilte: 'EDIT',
          disableAddForm: true,
          disableSaveForm: false,

        })
      }

    }

 }
 
 handleChange(e){
   e.preventDefault();

   this.setState({ formValues:{
    [e.target.name]: e.target.value}});


   //console.log('handleChange',e.target.value);
   
 }
 handleAddData(e){

  e.preventDefault();

  var dataForm = this.state.formValues;

   //console.log('onFormSubmit : ', JSON.stringify(dataForm)); 

        axios.post('/claritybqm/reportFetchJ/?scriptName=DC_RACK_CREATE', dataForm
        ).then((res) => {
          
           //console.log('success to save : ', res.data);   

            if(res.data == "success"){
              this.setState({ openSnackBar: true });
            }
        })
        .catch((err) => {
          console.log('failed to save : ', err);
        });
  
      
 }

 handleSaveData(e){

  e.preventDefault();

  var dataForm = this.state.formValues;

   console.log('handleSaveData : ', e.target); 

        // axios.post('/claritybqm/reportFetchJ/?scriptName=DC_RACK_UPDATE', dataForm
        // ).then((res) => {
          
        //    //console.log('success to save : ', res.data);   

        //     if(res.data == "success"){
        //       this.setState({ openSnackBar: true });
        //     }
        // })
        // .catch((err) => {
        //   console.log('failed to save : ', err);
        // });
  
      
 }

 handleSubmitData(e){

  e.preventDefault();

  var dataForm = this.state.formValues;

 }

 handleClose(event, reason){

  //console.log('close',event, reason);
  

  if (reason === 'clickaway') {
    return;
  }

   this.setState({ openSnackBar: false })

};

  render(){
   console.log(this.state);
    var open = this.state.openSnackBar;
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs ='12'>
          <Card>
          <CardHeader>Rack <strong>({this.state.headerTilte})</strong></CardHeader>
          {/* <Form action=" onSubmit={this.handleSubmitForm}> */}
            <CardBody>
              <Row style={{marginLeft: '250px'}}>
              <Col xs='4'>
              <FormGroup>
                <Label >DC Site</Label>
                <Input type="select" name="SITE_NAME" id="SITE_NAME" value={this.state.formValues.SITE_NAME}  onChange={this.handleChange} style={{ backgroundColor :this.state.backgcolor}} >
                        <option value="CBJ6">CBJ 6</option>
                        <option value="CBJ8">CBJ 8</option>
                        <option value="">NULL</option>
                </Input>
                <Label >DC Location</Label>
                <Input type="select" name="LOCN_NAME" id="LOCN_NAME"  value={this.state.formValues.LOCN_NAME}  onChange={this.handleChange} style={{ backgroundColor: this.state.backgcolor}}>
                        <option value="CBJ6 GIT (East)">CBJ6 GIT (East)</option>
                        <option value="CBJ8">CBJ 8</option>
                        <option value="">NULL</option>
                </Input>
                </FormGroup>
              </Col>
              <Col xs='4'>
              <Label>Room</Label>
              <Input type="text" id="RACK_ROOM"name="RACK_ROOM"  value={this.state.formValues.RACK_ROOM}  onChange={this.handleChange} style={{ backgroundColor :this.state.backgcolor}}/>
              </Col>
              </Row>
              <Card>
                <CardBody>
              <Row>
                <Col xs='3'>
                <Label>Rack ID</Label>
                <Input type="text" value={this.state.formValues.RACK_ID} style={{ backgroundColor :this.state.backgcolor}} readOnly/>
                <Label>Rack No</Label>
                <Input type="text" id="RACK_NO" name="RACK_NO"  value={this.state.formValues.RACK_NO}  onChange={this.handleChange} style={{ backgroundColor :this.state.backgcolor}}/>
                <Label>Rack Type</Label>
                <Input type="text" id="RACK_TYPE" name="RACK_TYPE"  value={this.state.formValues.RACK_TYPE}  onChange={this.handleChange} style={{ backgroundColor :this.state.backgcolor}}/>
                <Label>Rack Size</Label>
                <Input type="text" id="RACK_SIZE" name="RACK_SIZE"  value={this.state.formValues.RACK_SIZE}  onChange={this.handleChange} style={{ backgroundColor :this.state.backgcolor}}/>
                </Col>
                <Col xs='3'>
                <Label>Power Density</Label>
                <Input type="select" name="RACK_POWER_DENSITY" id="RACK_POWER_DENSITY" value={this.state.formValues.RACK_POWER_DENSITY}  onChange={this.handleChange} style={{ backgroundColor :this.state.backgcolor}}>
                        <option value="1.5">1.5</option>
                        <option value="3.0">3.0</option>
                        <option value="5.0">5.0</option>
                        <option value="7.0">7.0</option>
                        <option value="10.0">10.0</option>
                        <option value="">NULL</option>
                </Input>
                <Label>Breaker Type</Label>
                <Input type="select" name="RACK_BREAKER_TYPE" id="RACK_BREAKER_TYPE" value={this.state.formValues.RACK_BREAKER_TYPE}  onChange={this.handleChange} style={{ backgroundColor :this.state.backgcolor}}>
                          <option value="16">16</option>
                </Input>
                <Label>Power Phase</Label>
                <Input type="select" name="RACK_POWER_PHASE" id="RACK_POWER_PHASE" value={this.state.formValues.RACK_POWER_PHASE}  onChange={this.handleChange} style={{ backgroundColor :this.state.backgcolor}}>
                        <option value="Single">Single</option>
                        <option value="">Null</option>
                </Input>
                <Label>Cable ID</Label>
                <Input type="text" id="RACK_CABLE_ID" name="RACK_CABLE_ID" value={this.state.formValues.RACK_CABLE_ID}  onChange={this.handleChange} style={{ backgroundColor :this.state.backgcolor}}/>
                </Col>
                <Col xs='3'>
                <Label>PDU A</Label>
                <Input type="text" id="RACK_PDU_A" name="RACK_PDU_A" value={this.state.formValues.RACK_PDU_A}  onChange={this.handleChange} style={{ backgroundColor :this.state.backgcolor}}/>
                <Label>PDU B</Label>
                <Input type="text" id="RACK_PDU_B" name="RACK_PDU_B" value={this.state.formValues.RACK_PDU_B}  onChange={this.handleChange} style={{ backgroundColor :this.state.backgcolor}}/>
                <Label>Source A</Label>
                <Input type="text" id="RACK_SOURCE_A" name="RACK_SOURCE_A" value={this.state.formValues.RACK_SOURCE_A}  onChange={this.handleChange} style={{ backgroundColor :this.state.backgcolor}}/>
                <Label>Source B</Label>
                <Input type="text" id="RACK_SOURCE_B" name="RACK_SOURCE_B" value={this.state.formValues.RACK_SOURCE_B}  onChange={this.handleChange} style={{ backgroundColor :this.state.backgcolor}}/>
                <Label>Power Pre-Laid</Label>
                <Input type="select" name="RACK_POWER_PRELAID" id="RACK_POWER_PRELAID" value={this.state.formValues.RACK_POWER_PRELAID}  onChange={this.handleChange} style={{ backgroundColor :this.state.backgcolor}}>
                        <option value="0">Please select</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                </Input>
                <Label>Cabling Pre-Laid</Label>
                <Input type="select" name="RACK_CABLING_PRELAID" id="RACK_CABLING_PRELAID" value={this.state.formValues.RACK_CABLING_PRELAID}  onChange={this.handleChange} style={{ backgroundColor :this.state.backgcolor}}>
                        <option value="0">Please select</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                </Input>
                </Col>
                <Col xs='3'>
                <Label>Status</Label>
                <Input type="select" name="RACK_STATUS" id="RACK_STATUS" value={this.state.formValues.RACK_STATUS}  onChange={this.handleChange} style={{ backgroundColor :this.state.backgcolor}}>
                <option value="0">Please select</option>
                        <option value="">Null</option>
                        <option value="Registered">Registered</option>
                        <option value="Unoccupied">Unoccupied</option>
                </Input>
                <Label>Description</Label>
                <Input type="text" id="RACK_DESC" name="RACK_DESC" value={this.state.description}  onChange={this.handleChange} style={{ backgroundColor :this.state.backgcolor}}/>
                </Col> 
              </Row>
              </CardBody>
              </Card>
            </CardBody>
            <div className="form-button">
              <Row style={{marginBottom: '20px'}}>
                  <Col>
                  <Button color="primary" onClick={this.handleAddData} hidden={this.state.disableAddForm}>
                    <i className="fa fa-plus"></i>&nbsp; Add
                  </Button>&nbsp;
                  <Button color="primary" onClick={this.handleSaveData} hidden={this.state.disableSaveForm}>
                    <i className="fa fa-save"></i>&nbsp; Save
                  </Button>&nbsp;
                  <Button color="success" onClick={this.handleSubmitData}>
                    <i className="fa fa-send"></i>&nbsp; Submit
                  </Button>
                  </Col>
                </Row>
                </div>
            {/* </Form> */}
              <Snackbar
                  open={open} autoHideDuration={3000} onClose={this.handleClose} 
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                    <Alert variant="filled"  onClose={this.handleClose} severity="success" >
                       Data has been Saved.
                    </Alert>
              </Snackbar>
          </Card>
          </Col>
        </Row>
      </div>
    );
  }

}

const mapStateToProps = state => {
  return {
    rack: state.rack,
  };
};

const mapDispachToProps = dispatch => {
  return {

    fetchRack: () => dispatch({ type: "FETCH_RACK"}),
  
  };
};
export default connect(mapStateToProps,mapDispachToProps)(Rack);
