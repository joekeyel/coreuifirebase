import React, { Component, useEffect, useState } from 'react';
import { Badge,Button,Card, CardBody, CardFooter, CardHeader, Col, Input, Label,Row, Form,FormGroup} from 'reactstrap';
import { connect } from "react-redux";
import '../css/style.css';
import { makeStyles, useTheme, FormHelperText, Select, MenuItem, Chip,FormControl, InputLabel } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker } from '@material-ui/pickers';
import TableMaintenance from '../Maintenance/TableMaintenance';

const useStyles = makeStyles((theme) => ({
 
    formControl: {
      margin: theme.spacing(1),
      minWidth: 250,
    }, 
    chips: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    chip: {
      margin: 2,
    },
    selected: {
      //backgroundColor: "turquoise",
      color: "blue",
      fontWeight: 600
  },
  
  }));
  
  function getStyles(siteName, dcSite, theme) {
    return {
      fontWeight:
      dcSite.indexOf(siteName) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }
  
  function getStyles2(locName, optionSite, theme) {
    return {
      fontWeight:
      optionSite.indexOf(locName) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

const FormCRAC =(props) =>{

  const [backgcolor, setbackgcolor] = useState("#b3d9ff");
  const [actionForm, setactionForm] = useState(props.actionForm);
  const [actionCreateBtn, setactionCreateBtn] = useState(false);
  const [actionSaveBtn, setactionSaveBtn] = useState(false);
  const [actionDeleteBtn, setActionDeleteBtn] = useState(false);
  const [locationData, setlocationData] = useState([]);
  const [dcSite, setDCSite] = React.useState([]);
  const [dcSiteList, setDCSiteList] = React.useState([]);
  const [optionLocation, setoptionLocation] = useState([]);
  const [selectedCommDate, setSelectedCommDate] = useState(null)
  const [selectedDecommDate, setSelectedDecommDate] = useState(null)
  const [flagDecommDate, setflagDecommDate] = useState(true);
  const [flagCRACid, setflagCRACid] = useState(true);
  const [CRACdata, setCRACdata] = useState({});
  const classes = useStyles();
  const theme = useTheme();

 //console.log('fromPDU',props);
 
  useEffect(()=> {
    //console.log('props',props);
    
    if(actionForm === 'VIEW'){
      setactionSaveBtn(true);
      setactionCreateBtn(true);
      setActionDeleteBtn(true);
    }
    if(actionForm === 'CREATE'){
      setactionSaveBtn(true);
      setActionDeleteBtn(true);
    }
         
    if(actionForm === 'EDIT'){
      setactionCreateBtn(true);

      if(props.changeFlag === true){
        setCRACdata(props.values.values)
      }

      if(props.CRACid != "" && dcSite == ""){
        //console.log('propd',props);
        
        setCRACdata(props.CRACdata);
        setflagCRACid(false);
        setDCSite([props.CRACdata.SITE_NAME]);
        setSelectedCommDate(props.CRACdata.CRAC_COMM_DT);
        setSelectedDecommDate(props.CRACdata.CRAC_DECOMM_DT);
        setflagDecommDate(false);
        //console.log('props',props.CRACdata[0]);
        //console.log('props',props.CRACdata.LOCATION_NAME);
        if(props.CRACdata.LOCATION_NAME){
          var splitLocn = props.CRACdata.LOCATION_NAME.split(',');
          setoptionLocation(splitLocn);  
        }
        
     }
     
    }
    var siteExist = Object.values(props.site).filter((site)=> site.SITE_VERIFIED_TAG === 'Y')
    //console.log('siteExist',siteExist);
      setDCSiteList(siteExist);

  },[props]);
  
  useEffect(()=>{

    props.fetchSite();
    var siteExist = Object.values(props.site).filter((site)=> site.SITE_VERIFIED_TAG === 'Y')
    //console.log('siteExist',siteExist);
      setDCSiteList(siteExist);

  },[]);
  
 const handleBackBtn =() =>{
    window.history.back();
  }
  
 /** to handle value locatioin when site change */
 const  handleChangeSite =(e) =>{
    
    setDCSite([e.target.value])
    /** reset existing location in edit screen */
    setoptionLocation([]);    

    fetch('/claritybqm/reportFetch/?scriptName=DC_LOCATION&site=' + e.target.value)
    .then(response => response.json())
    .then((location) => 
    {  
       // console.log('loc',location);
        setlocationData(location)                   
    }
    );
  }

  const handleLocationChange = (event) => {
    setoptionLocation(event.target.value);    
};

return(
    <div className="animated fadeIn" >
       <Row>
              <Col xs='12'>
              <Card>
                  <CardHeader>CRAC<strong>({actionForm})</strong>
                  <small><font color="red"> ( * ) is mandatoy field</font></small>
                  </CardHeader>
                  <CardBody>
                    <Form id="formCRAC" onSubmit={props.onSubmit}>
                    <Row style={{marginLeft: "50px"}}>
                        <Col xs="4">
                        <FormControl className={classes.formControl} error={props.hasError1}>
                          <Label>DC Site<font color="red">*</font></Label>
                                <Input bsSize="sm"  type="select" name="SITE_NAME" id="SITE_NAME" onChange={handleChangeSite} style={{ backgroundColor : backgcolor}} >
                                {/*loop Dc site*/}
                                {    actionForm === 'CREATE' ? 
                                        dcSiteList.map(function(lov,index) {
                                        return <option key={index} value={lov.SITE_NAME}>{lov.SITE_NAME}</option>
                                        })
                                        :
                                        // dataRack.site.map(function(lov,index) {
                                        //   return <option key={index} value={dataRack.SITE_NAME}>{dataRack.SITE_NAME}</option>
                                        // })
                                      <option key='id' value={CRACdata.SITE_NAME}>{CRACdata.SITE_NAME}</option>
                                      
                                }  
                                </Input>
                          {props.hasError1 && <FormHelperText style={{color: 'red'}}>This is required!</FormHelperText>}
                        </FormControl>
                        <Col></Col>
                        <FormGroup className={classes.formControl} error={props.hasError2}>
                        <Label>Served DC Location: <font color="red">*</font></Label>
                                <Input bsSize="sm"  type="select" name="SITE_NAME" id="SITE_NAME" onChange={handleLocationChange} style={{ backgroundColor : backgcolor}} >
                                {/*loop Dc site*/}
                                {    actionForm === 'CREATE' && dcSiteList ? 
                                        Object.values(locationData).map(function(lov,index) {
                                        return <option key={index} value={lov.LOCN_NAME}>{lov.LOCN_NAME}</option>
                                        })
                                        :
                                        // dataRack.site.map(function(lov,index) {
                                        //   return <option key={index} value={dataRack.SITE_NAME}>{dataRack.SITE_NAME}</option>
                                        // })
                                      <option key='id' value={CRACdata.LOCN_NAME}>{CRACdata.LOCN_NAME}</option>
                                      
                                }  
                                </Input>
                                {props.hasError2 && <FormHelperText style={{color: 'red'}}>This is required!</FormHelperText>}
                            </FormGroup>
                        </Col>
                    <Col>
                    <Label>Commission Date :</Label><font color="red">*</font>
                    <FormGroup>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                        id="CRAC_COMM_DT" 
                        name="CRAC_COMM_DT"
                        //id="date-picker-dialog"
                        //filterDate={date => date.getDay() !== 6 && date.getDay() !== 0}
                        //label="Commission Date"
                        format="dd/MM/yyyy"
                        margin="normal"
                        placeholder="dd/mm/yyyy"
                        value={selectedCommDate}
                        onChange={date => setSelectedCommDate(date)}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                        />
                    </MuiPickersUtilsProvider>
                    </FormGroup>
                    </Col>
                    <Col>
                    <Label>Decommission Date :</Label>
                    <FormGroup  hidden={props.flagDecommDate}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                        id="CRAC_DECOMM_DT" 
                        name="CRAC_DECOMM_DT"
                        margin="normal"
                        //id="date-picker-dialog"
                        //label="Decommission Date"
                        format="dd/MM/yyyy"
                        margin="normal"
                        placeholder="dd/mm/yyyy"
                        value={selectedDecommDate}
                        onChange={date => setSelectedDecommDate(date)}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                        />
                    </MuiPickersUtilsProvider>
                    </FormGroup>
                     </Col>
                    </Row>
                    <Row  style={{marginLeft: "50px", marginTop: "10px"}}>
                        <Col xs='2'>
                            <FormGroup hidden={flagCRACid}>
                            <Label>CRAC Ref ID</Label>
                            <Input bsSize="sm"  type="text" id="CRAC_ID" name="CRAC_ID" value={CRACdata.CRAC_ID} onChange={props.onChange} style={{ backgroundColor : backgcolor, textTransform: 'uppercase'}} readOnly/>
                            </FormGroup>
                            <FormGroup  error={props.hasError3}>
                            <Label>CRAC Name</Label>
                            <Input bsSize="sm"  type="text" id="CRAC_NAME" name="CRAC_NAME" value={CRACdata.CRAC_NAME} onChange={props.onChange} style={{ backgroundColor : backgcolor, textTransform: 'uppercase'}} />
                            {props.hasError3 && <FormHelperText style={{color: 'red'}}>This is required!</FormHelperText>}
                            </FormGroup>
                            <Label>Area/Zone</Label>
                            <Input bsSize="sm"  type="text" id="CRAC_AREA" name="CRAC_AREA" value={CRACdata.CRAC_AREA} onChange={props.onChange} style={{ backgroundColor : backgcolor, textTransform: 'uppercase'}} />
                            <Label>kW/Unit</Label>
                            <Input bsSize="sm"  type="number" id="CRAC_KW" name="CRAC_KW" value={CRACdata.CRAC_KW} onChange={props.onChange} style={{ backgroundColor : backgcolor, textTransform: 'uppercase'}} />
                            <Label>Quantity</Label>
                            <Input bsSize="sm"  type="number" id="CRAC_QUANTITY" name="CRAC_QUANTITY" value={CRACdata.CRAC_QUANTITY} onChange={props.onChange} style={{ backgroundColor : backgcolor, textTransform: 'uppercase'}} />
                            <Label>Cooling Capacity(kW)</Label>
                            <Input bsSize="sm"  type="number" id="CRAC_COOL_CAPACITY" name="CRAC_COOL_CAPACITY" value={CRACdata.CRAC_COOL_CAPACITY} onChange={props.onChange} style={{ backgroundColor : backgcolor, textTransform: 'uppercase'}} />
                        </Col>
                        <Col xs='4'>
                            <Label>Brand</Label>
                            <Input bsSize="sm"  type="text" id="CRAC_BRAND" name="CRAC_BRAND" value={CRACdata.CRAC_BRAND} onChange={props.onChange} style={{ backgroundColor : backgcolor, textTransform: 'uppercase'}} />
                            <Label>Type</Label>
                            <Input bsSize="sm"  type="text" id="CRAC_TYPE" name="CRAC_TYPE" value={CRACdata.CRAC_TYPE} onChange={props.onChange} style={{ backgroundColor : backgcolor, textTransform: 'uppercase'}} />
                            <Label>Status</Label>
                            <Input bsSize="sm"  type="select" id="CRAC_STATUS" name="CRAC_STATUS" value={CRACdata.CRAC_STATUS} onChange={props.onChange} style={{ backgroundColor : backgcolor, textTransform: 'uppercase'}} >
                                <option value=''>Please Select</option>
                                <option value='ACTIVE'>ACTIVE</option>
                                <option value='INACTIVE'>INACTIVE</option>
                                <option value='STANDBY'>STANDBY</option>
                            </Input>
                            <Label>Description</Label>
                            <Input bsSize="sm"  type="textarea" id="CRAC_DESC" name="CRAC_DESC" value={CRACdata.CRAC_DESC} rows="6" onChange={props.onChange} style={{ backgroundColor : backgcolor,}} />
                        </Col>
                        <Col xs='6'>
                          <FormGroup>
                            <Label>Maintenance Update</Label>
                            <Input bsSize="sm"  disabled={props.MaintenanceFlag} type="textarea" id="CRAC_MAINTENANCE_UPD" name="CRAC_MAINTENANCE_UPD"  rows="6" onChange={props.onChange}  style={{ backgroundColor : backgcolor}} />
                          </FormGroup>
                        <Card hidden={props.MaintenanceFlag}>
                            <CardHeader>Maintenance Update History:</CardHeader>
                                <CardBody>
                                     <TableMaintenance data={props.CRACJurnal ? props.CRACJurnal : ""}/>
                                </CardBody>
                          </Card>
                         </Col>
                    </Row>
                    <div className="form-button" style={{ marginTop: '20px' }}>
                            <Row >
                                <Col>
                                    <Button color="info" onClick={handleBackBtn}>
                                        <i className="fa fa-history"></i>&nbsp; Back
                        </Button>&nbsp;&nbsp;&nbsp;
                                    <Button color="success" type="submit" hidden={actionCreateBtn}>
                                        <i className="fa fa-send"></i>&nbsp; Submit
                        </Button>&nbsp;
                        <Button color="success" type="submit" hidden={actionSaveBtn}>
                                        <i className="fa fa-save"></i>&nbsp; Save
                        </Button>&nbsp;
                        <Button color="danger" type="submit" id="delete" 
                        onClick={(e)=> props.onSubmit(e,'delete')}
                        hidden={actionDeleteBtn}>
                            <i className="fa fa-trash"></i>&nbsp; Delete
                        </Button>&nbsp;
                        <Button color="warning" type='reset' hidden={props.btnReset}>
                          <i className="fa fa-refresh"></i>&nbsp; Reset
                        </Button>
                                </Col>
                            </Row>
                        </div>
                    </Form>
                  </CardBody>
              </Card>
              </Col>
          </Row>
          </div>
    );
}


const mapStateToProps = state => {
  return {
    site: state.site
  };
};

const mapDispachToProps = dispatch => {
  return {

    fetchSite: () => dispatch({ type: "FETCH_DCSITE"}),
  
  };
};
  
export default connect(mapStateToProps,mapDispachToProps)(FormCRAC);