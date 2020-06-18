import React, { Component } from 'react';
import { Badge, Button, Card, CardBody, CardFooter, CardHeader, Col, Form, FormGroup, Label, Row,Input } from 'reactstrap';
import '../css/style.css';
import Snackbar from '@material-ui/core/Snackbar'; 
import Alert from '@material-ui/lab/Alert';
import $ from 'jquery';
import auth from '../../../../src/auth';
import axios from 'axios';
import { connect } from "react-redux";

class RackForm extends Component {
  constructor(props) {
    super(props);
    this.handleCreataData = this.handleCreataData.bind(this)
    this.handleUpdateData = this.handleUpdateData.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleOnChange = this.handleOnChange.bind(this)
    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300,
      data: [],
      backgcolor: "#b3d9ff",
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
        RACK_INSERT_BY: auth.authenticated.username.toUpperCase(),
      },
      SiteOption : {},
      dcLocation: {},
      openSnackBar : false,
      alertMsg: '',
      rackID: "",
      cardHeaderTitle : '',
    };
  }

  componentDidMount(){
    console.log('componDId', this.props);
    this.props.fetchRack();
    if(this.props.rackValues){
      this.getRackDetail(this.props);
    }

    fetch('/claritybqm/reportFetch/?scriptName=DC_SITE')
    .then(response => response.json())
    .then((site) => 
    {  
        this.setState({ SiteOption : site})                   
    }
    );

  }

  componentWillReceiveProps(){

    this.setState({ cardHeaderTitle: this.props.header}) 

    if(this.props.rackValues){
      this.setState({ rackID : this.props.rackValues.match.params.id,}) 
    }
    
  }

  getRackDetail(props){

    console.log('getRackDetail',props);
    
      var id = props.rackValues.match.params.id;
      var data = props.rack;
     
      if(id){
        
        if(data){
  
          var filter = Object.values(data).filter(rack => rack.RACK_ID == id);
          console.log('FilterRack',filter);
  
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
             this.setState({ SiteOption : FilterRack.SITE_NAME, dcLocation: FilterRack.LOCATION_NAME})     
  
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
   
  handleOnChange(e){
    //console.log('handleOnChange',e.target.value);
    var $inputs = $('#formRack :input');
    
    var values = {};
    $inputs.each(function () {
        if ($(this).is(':radio') == true || $(this).is(':checkbox') == true){
          values[this.name] = $('input[name=' + $(this).attr('name') + ']:checked').val() == undefined ? "" : $('input[name=' + $(this).attr('name') + ']:checked').val();
              } 
              else {
          values[this.name] = $(this).val() == undefined ? "" : $(this).val();
        }
     });

          if(this.state.cardHeaderTitle == 'CREATE'){
            var rackid = values.RACK_ID;
          }
          else{
            var rackid = this.state.rackID;
          }
       
          this.setState({
            formValues: {
              SITE_NAME : values.SITE_NAME, 
              LOCN_NAME : values.LOCN_NAME,
              RACK_ROOM : values.RACK_ROOM,
              RACK_ID : rackid,
              RACK_NO : values.RACK_NO,
              RACK_TYPE : values.RACK_TYPE,
              RACK_SIZE : values.RACK_SIZE,
              RACK_POWER_DENSITY : values.RACK_POWER_DENSITY,
              RACK_BREAKER_TYPE : values.RACK_BREAKER_TYPE,
              RACK_POWER_PHASE : values.RACK_POWER_PHASE,
              RACK_CABLE_ID : values.RACK_CABLE_ID,
              RACK_PDU_A : values.RACK_PDU_A,
              RACK_PDU_B : values.RACK_PDU_B,
              RACK_SOURCE_A : values.RACK_SOURCE_A,
              RACK_SOURCE_B : values.RACK_SOURCE_B,
              RACK_POWER_PRELAID : values.RACK_POWER_PRELAID,
              RACK_CABLING_PRELAID : values.RACK_CABLING_PRELAID,
              RACK_STATUS : values.RACK_STATUS,
              RACK_DESC : values.RACK_DESC,
              RACK_CONTRACTUAL_POWER: '',
              RACK_INSERT_BY: auth.authenticated.username.toUpperCase(),
            }
          });



    if(e.target.name == "SITE_NAME"){
        
        fetch('/claritybqm/reportFetch/?scriptName=DC_LOCATION&site='+ e.target.value)
        .then(response => response.json())
        .then((loc) => 
        {
            
            this.setState({ dcLocation : loc})          
           
        }
        );

    }

    
  }
  handleCreataData(e) {

    e.preventDefault();

            axios.post('/claritybqm/reportFetchJ/?scriptName=DC_RACK_CREATE', this.state.formValues
              ).then((res) => {
                //console.log('success to save : ', res.data);   
                  if(res.data == "success"){
                    this.setState({ openSnackBar: true, alertMsg: 'Data has been Crerated.' });
                  }

              })
              .catch((err) => {
                console.log('failed to save : ', err);
              });
        
  }

  handleUpdateData(e) {
    
    e.preventDefault();
  
            axios.post('/claritybqm/reportFetchJ/?scriptName=DC_RACK_UPDATE', this.state.formValues
              ).then((res) => {
                //console.log('success to save : ', res.data);   
                  if(res.data == "success"){
                    this.setState({ openSnackBar: true, alertMsg: 'Data has been save.' });
                  }
              })
              .catch((err) => {
                console.log('failed to save : ', err);
              });
        
 
  }

  handleBackBtn(){
    window.history.back();
  }

  handleClose(event, reason){

    //console.log('close',event, reason);
    
  
    if (reason === 'clickaway') {
      return;
    }
  
     this.setState({ openSnackBar: false })
  
  };
  
  render(){
    console.log('rackForm-render',this.state);

    var SITE_NAME = this.state.formValues.SITE_NAME;
    var LOCN_NAME = this.state.formValues.LOCN_NAME;
    var RACK_ROOM= this.state.formValues.RACK_ROOM;
    var RACK_ID= this.state.formValues.RACK_ID;
    var RACK_NO= this.state.formValues.RACK_NO;
    var RACK_TYPE= this.state.formValues.RACK_TYPE;
    var RACK_SIZE= this.state.formValues.RACK_SIZE;
    var RACK_POWER_DENSITY= this.state.formValues.RACK_POWER_DENSITY;
    var RACK_BREAKER_TYPE= this.state.formValues.RACK_BREAKER_TYPE;
    var RACK_POWER_PHASE= this.state.formValues.RACK_POWER_PHASE;
    var RACK_CABLE_ID= this.state.formValues.RACK_CABLE_ID;
    var RACK_PDU_A= this.state.formValues.RACK_PDU_A;
    var RACK_PDU_B= this.state.formValues.RACK_PDU_B;
    var RACK_SOURCE_A= this.state.formValues.RACK_SOURCE_A;
    var RACK_SOURCE_B= this.state.formValues.RACK_SOURCE_B;
    var RACK_POWER_PRELAID= this.state.formValues.RACK_POWER_PRELAID;
    var RACK_CABLING_PRELAID= this.state.formValues.RACK_CABLING_PRELAID;
    var RACK_STATUS= this.state.formValues.RACK_STATUS;
    var RACK_DESC = this.state.formValues.RACK_DESC;
    var open = this.state.openSnackBar;
    var disableAddBtn = true;
    var disableSaveBtn = true;
    var alert_message = this.state.alertMsg;

    if( this.props.disableAddBtn == false){
        disableAddBtn = false;
    }
    if( this.props.disableSaveBtn == false){
      disableSaveBtn = false;
    }
     var title = this.state.cardHeaderTitle
     return (
       <div className="animated fadeIn">
         <Row>
           <Col xs ='12'>
           <Card>
           <CardHeader>Rack <strong>({title})</strong></CardHeader>
           <Form name="formRack" id="formRack" /*onSubmit={this.handleSubmit}*/>
             <CardBody>
               <Row style={{marginLeft: '250px'}}>
               <Col xs='4'>
               <FormGroup>
                 <Label >DC Site</Label>
                 <Input type="select" name="SITE_NAME" id="SITE_NAME" onChange={this.handleOnChange} style={{ backgroundColor :this.state.backgcolor}} >
                             {
                                    Object.values(this.state.SiteOption).map(function(lov,index) {
        
                                         return <option key={index} value={lov.SITE_NAME}>{lov.SITE_NAME}</option>
                            
                                    })
                              }
                            
                 </Input>
                 <Label >DC Location</Label>
                 <Input type="select" name="LOCN_NAME" id="LOCN_NAME" onChange={this.handleOnChange} style={{ backgroundColor: this.state.backgcolor}}>
                               {

                                    Object.values(this.state.dcLocation).map(function(lov,index) {
                                    
                                        return <option key={lov.LOCN_NAME} value={lov.LOCN_NAME}>{lov.LOCN_NAME}</option>
                                                                            
                                    })
                                }
                 </Input>
                 </FormGroup>
               </Col>
               <Col xs='4'>
               <Label>Room</Label>
               <Input type="text" id="RACK_ROOM"name="RACK_ROOM"  value={RACK_ROOM} onChange={this.handleOnChange} style={{ backgroundColor :this.state.backgcolor}}/>
               </Col>
               </Row>
               <Card>
                 <CardBody>
               <Row>
                 <Col xs='3'>
                 <Label>Rack ID</Label>
                 <Input type="text" value={RACK_ID} readOnly/>
                 <Label>Rack No</Label>
                 <Input type="text" id="RACK_NO" name="RACK_NO"  value={RACK_NO} onChange={this.handleOnChange} style={{ backgroundColor :this.state.backgcolor}}/>
                 <Label>Rack Type</Label>
                 <Input type="text" id="RACK_TYPE" name="RACK_TYPE"  value={RACK_TYPE} onChange={this.handleOnChange} style={{ backgroundColor :this.state.backgcolor}}/>
                 <Label>Rack Size</Label>
                 <Input type="text" id="RACK_SIZE" name="RACK_SIZE"  value={RACK_SIZE} onChange={this.handleOnChange} style={{ backgroundColor :this.state.backgcolor}}/>
                 </Col>
                 <Col xs='3'>
                 <Label>Power Density</Label>
                 <Input type="select" name="RACK_POWER_DENSITY" id="RACK_POWER_DENSITY" value={RACK_POWER_DENSITY} onChange={this.handleOnChange} style={{ backgroundColor :this.state.backgcolor}}>
                         <option value="1.5">1.5</option>
                         <option value="3.0">3.0</option>
                         <option value="5.0">5.0</option>
                         <option value="7.0">7.0</option>
                         <option value="10.0">10.0</option>
                         <option value="">NULL</option>
                 </Input>
                 <Label>Breaker Type</Label>
                 <Input type="select" name="RACK_BREAKER_TYPE" id="RACK_BREAKER_TYPE" value={RACK_BREAKER_TYPE} onChange={this.handleOnChange} style={{ backgroundColor :this.state.backgcolor}}>
                           <option value="16">16</option>
                 </Input>
                 <Label>Power Phase</Label>
                 <Input type="select" name="RACK_POWER_PHASE" id="RACK_POWER_PHASE" value={RACK_POWER_PHASE} onChange={this.handleOnChange} style={{ backgroundColor :this.state.backgcolor}}>
                         <option value="Single">Single</option>
                         <option value="">Null</option>
                 </Input>
                 <Label>Cable ID</Label>
                 <Input type="text" id="RACK_CABLE_ID" name="RACK_CABLE_ID" value={RACK_CABLE_ID} onChange={this.handleOnChange} style={{ backgroundColor :this.state.backgcolor}}/>
                 </Col>
                 <Col xs='3'>
                 <Label>PDU A</Label>
                 <Input type="text" id="RACK_PDU_A" name="RACK_PDU_A" value={RACK_PDU_A} onChange={this.handleOnChange} style={{ backgroundColor :this.state.backgcolor}}/>
                 <Label>PDU B</Label>
                 <Input type="text" id="RACK_PDU_B" name="RACK_PDU_B" value={RACK_PDU_B} onChange={this.handleOnChange} style={{ backgroundColor :this.state.backgcolor}}/>
                 <Label>Source A</Label>
                 <Input type="text" id="RACK_SOURCE_A" name="RACK_SOURCE_A" value={RACK_SOURCE_A} onChange={this.handleOnChange} style={{ backgroundColor :this.state.backgcolor}}/>
                 <Label>Source B</Label>
                 <Input type="text" id="RACK_SOURCE_B" name="RACK_SOURCE_B" value={RACK_SOURCE_B} onChange={this.handleOnChange} style={{ backgroundColor :this.state.backgcolor}}/>
                 <Label>Power Pre-Laid</Label>
                 <Input type="select" name="RACK_POWER_PRELAID" id="RACK_POWER_PRELAID" value={RACK_POWER_PRELAID} onChange={this.handleOnChange} style={{ backgroundColor :this.state.backgcolor}}>
                         <option value="0">Please select</option>
                         <option value="Yes">Yes</option>
                         <option value="No">No</option>
                 </Input>
                 <Label>Cabling Pre-Laid</Label>
                 <Input type="select" name="RACK_CABLING_PRELAID" id="RACK_CABLING_PRELAID" value={RACK_CABLING_PRELAID} onChange={this.handleOnChange} style={{ backgroundColor :this.state.backgcolor}}>
                         <option value="0">Please select</option>
                         <option value="Yes">Yes</option>
                         <option value="No">No</option>
                 </Input>
                 </Col>
                 <Col xs='3'>
                 <Label>Status</Label>
                 <Input type="select" name="RACK_STATUS" id="RACK_STATUS" value={RACK_STATUS} onChange={this.handleOnChange} style={{ backgroundColor :this.state.backgcolor}}>
                 <option value="0">Please select</option>
                         <option value="">Null</option>
                         <option value="Registered">Registered</option>
                         <option value="Unoccupied">Unoccupied</option>
                 </Input>
                 <Label>Description</Label>
                 <Input type="textarea" size="6" id="RACK_DESC" name="RACK_DESC" value={RACK_DESC} onChange={this.handleOnChange} style={{ backgroundColor :this.state.backgcolor}}/>
                 </Col> 
               </Row>
               </CardBody>
               </Card>
             </CardBody>
              <div className="form-button">
                <Row style={{marginBottom: '20px'}}>
                    <Col>
                    <Button color="info" onClick={this.handleBackBtn}>
                      <i className="fa fa-history"></i>&nbsp; Back
                    </Button>&nbsp;&nbsp;&nbsp;
                    {/* </Col>
                    <Col> */}
                    <Button color="primary" hidden={disableAddBtn} onClick={this.handleCreataData}>
                      <i className="fa fa-plus"></i>&nbsp; Create
                    </Button>&nbsp;
                    <Button color="primary" hidden={disableSaveBtn} onClick={this.handleUpdateData} >
                      <i className="fa fa-save"></i>&nbsp; Save
                    </Button>&nbsp;
                    <Button color="success" type="submit">
                      <i className="fa fa-send"></i>&nbsp; Submit
                    </Button>
                    </Col>
                  </Row>
                  </div>
             </Form>
               <Snackbar
                   open={open} autoHideDuration={1500} onClose={this.handleClose} 
                   anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                     <Alert variant="filled"  onClose={this.handleClose} severity="success" >
                       {alert_message}
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
    rack: state.rack
  };
};

const mapDispachToProps = dispatch => {
  return {

    fetchRack: () => dispatch({ type: "FETCH_RACK"}),
  
  };
};
  
export default connect(mapStateToProps,mapDispachToProps)(RackForm);
