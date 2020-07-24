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

const FormPDU =(props) =>{

  const [backgcolor, setbackgcolor] = useState("#b3d9ff");
  const [actionForm, setactionForm] = useState(props.actionForm);
  const [actionCreateBtn, setactionCreateBtn] = useState(false);
  const [actionSaveBtn, setactionSaveBtn] = useState(false);
  const [locationData, setlocationData] = useState([]);
  const [dcSiteList, setDCSiteList] = React.useState([]);
  const [dcSite, setDCSite] = React.useState([]);
  const [optionLocation, setoptionLocation] = useState([]);
  const [selectedCommDate, setSelectedCommDate] = useState(null)
  const [selectedDecommDate, setSelectedDecommDate] = useState(null)
  const [flagDecommDate, setflagDecommDate] = useState(true);
  const [flagPDUid, setFlagPDUid] = useState(true);
  const [PDUdata, setPDUdata] = useState({});
  const classes = useStyles();
  const theme = useTheme();

 //console.log('fromPDU',props);
 
  useEffect(()=> {
    //console.log('props',props);
    
    if(actionForm === 'VIEW'){
      setactionSaveBtn(true);
      setactionCreateBtn(true);
      setPDUdata(props.PDUdata);
      setFlagPDUid(false);
      setDCSite([props.PDUdata.SITE_NAME]);
      setSelectedCommDate(props.PDUdata.PDU_COMM_DT);
      setSelectedDecommDate(props.PDUdata.PDU_DECOMM_DT);
      if(props.PDUdata.LOCATION_NAME){
        var splitLocn = props.PDUdata.LOCATION_NAME.split(',');
        setoptionLocation(splitLocn);  
      }
    }
    if(actionForm === 'CREATE'){
      setactionSaveBtn(true);
    }
         
    if(actionForm === 'EDIT'){
      setactionCreateBtn(true);
      if(props.changeFlag == true){
        setPDUdata(props.values.values)
      }

      if(props.PDUid != "" && dcSite == ""){
        setPDUdata(props.PDUdata);
        setFlagPDUid(false);
        setDCSite([props.PDUdata.SITE_NAME]);
        setSelectedCommDate(props.PDUdata.PDU_COMM_DT);
        setSelectedDecommDate(props.PDUdata.PDU_DECOMM_DT);
        setflagDecommDate(false);
        //console.log('props',props.PDUdata[0]);
        //console.log('props',props.PDUdata.LOCATION_NAME);
        if(props.PDUdata.LOCATION_NAME){
          var splitLocn = props.PDUdata.LOCATION_NAME.split(',');
          setoptionLocation(splitLocn);  
        }
        
      }
     
    }
  
    var siteExist = Object.values(props.site).filter((site)=> site.SITE_VERIFIED_TAG === 'Y')
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
        console.log('loc',location);
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
                  <CardHeader>PDU<strong>({actionForm})</strong>
                  <small><font color="red"> ( * ) is mandatoy field</font></small>
                  </CardHeader>
                  <CardBody>
                    <Form id="formPDU" onSubmit={props.onSubmit}>
                    <Row style={{marginLeft: "50px"}}>
                        <Col xs="4">
                        <FormControl className={classes.formControl} error={props.hasError1}>
                          <InputLabel>DC Site<font color="red">*</font></InputLabel>
                          <Select
                            //labelId="demo-controlled-open-select-label"
                            id="SITE_NAME"
                            name="SITE_NAME"
                            onClick={() => props.fetchSite()}
                            value={dcSite}
                            onChange={handleChangeSite}
                            fullWidth
                            renderValue={(selected) => (
                              <div>
                                {
                                selected.map((value) => (
                                  <MenuItem key={value} value={value}>{value}</MenuItem>
                                ))}
                              </div>
                            )}
                          >
                            <MenuItem  key="null" value=''/>
                            {
                              dcSiteList.map((site)=>( //console.log('site',site)
                                  <MenuItem key={site.SITE_ID} value={site.SITE_NAME} classes={{ selected: classes.selected }} style={getStyles(site.SITE_NAME, dcSite, theme)}>
                                    {site.SITE_NAME}
                                </MenuItem>
                              ))
                            }
                          </Select>
                          {props.hasError1 && <FormHelperText style={{color: 'red'}}>This is required!</FormHelperText>}
                        </FormControl>
                        </Col>
                        <Col xs="6">
                        <FormGroup className={classes.formControl} error={props.hasError2}>
                            <InputLabel >Served DC Location<font color="red">*</font></InputLabel>
                            <Select
                                    required
                                    //labelId="demo-controlled-open-select-label"
                                    id="LOCN_NAME"
                                    name="LOCN_NAME"
                                    multiple
                                    value={optionLocation}
                                    onChange={handleLocationChange}
                                    fullWidth
                                    renderValue={(selected) => (
                                      <div className={classes.chips}>
                                        {
                                        selected.map((value) => (
                                          <Chip key={value} label={value} className={classes.chip} />
                                        ))}
                                      </div>
                                    )}
                                    >
                                    <MenuItem value="" />
                                    {   locationData ? 
                                        Object.values(locationData).map((d) => ( //console.log('d',d.SITE_NAME)
                                        <MenuItem key={d.LOCN_ID} value={d.LOCN_NAME} classes={{ selected: classes.selected }} style={getStyles2(d.LOCN_NAME, optionLocation, theme)}>
                                        {d.LOCN_NAME}
                                        </MenuItem>
                                    ))
                                    :
                                    <MenuItem value="" />
                                  }
                                </Select>
                                {props.hasError2 && <FormHelperText style={{color: 'red'}}>This is required!</FormHelperText>}
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row  style={{marginLeft: "50px", marginTop: "10px"}}>
                        <Col xs='3'>
                            <FormGroup hidden={flagPDUid}>
                            <Label>PDU Ref ID</Label>
                            <Input bsSize="sm"  type="text" id="PDU_ID" name="PDU_ID" value={props.PDUid} onChange={props.onChange} style={{ backgroundColor : backgcolor, textTransform: 'uppercase'}} readOnly/>
                            </FormGroup>
                            <FormGroup  error={props.hasError3}>
                            <Label>PDU Name</Label><font color="red">*</font>
                            <Input bsSize="sm"  type="text" id="PDU_NAME" name="PDU_NAME" value={PDUdata.PDU_NAME} onChange={props.onChange} style={{ backgroundColor : backgcolor, textTransform: 'uppercase'}} />
                            {props.hasError3 && <FormHelperText style={{color: 'red'}}>This is required!</FormHelperText>}
                            </FormGroup>
                            <Label>Code</Label>
                            <Input bsSize="sm"  type="text" id="PDU_CODE" name="PDU_CODE" value={PDUdata.PDU_CODE} onChange={props.onChange} style={{ backgroundColor : backgcolor, textTransform: 'uppercase'}} />
                            <Label>Fuse</Label>
                            <Input bsSize="sm"  type="text" id="PDU_FUSE" name="PDU_FUSE" value={PDUdata.PDU_FUSE} onChange={props.onChange} style={{ backgroundColor : backgcolor, textTransform: 'uppercase'}} />
                            <Label>User/Rack</Label>
                            <Input bsSize="sm"  type="text" id="PDU_USER_RACK" name="PDU_USER_RACK" value={PDUdata.PDU_USER_RACK} onChange={props.onChange} style={{ backgroundColor : backgcolor, textTransform: 'uppercase'}} />
                            <FormGroup error={props.hasError4}>
                            <Label>Commission Date</Label><font color="red">*</font>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                helperText={''}
                                id="PDU_COMM_DT" 
                                name="PDU_COMM_DT"
                                margin="normal"
                                //id="date-picker-dialog"
                                //disablePast={true}
                                //shouldDisableDate={date => date.getDay() === 0 && date.getDay() === 6
                                //date => console.log('date',date.getDay()) 
                                //date.getDay() !== 6 && date.getDay() !== 0
                                // }
                                //label="Commission Date"
                                format="dd/MM/yyyy"
                                margin="normal"
                                value={selectedCommDate}
                                onChange={date => setSelectedCommDate(date)}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                                />
                            </MuiPickersUtilsProvider>
                            {props.hasError4 && <FormHelperText style={{color: 'red'}}> This is required!</FormHelperText>}
                            </FormGroup>
                            <FormGroup hidden={flagDecommDate}>
                            <Label>Decommission Date</Label>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                helperText={''}
                                id="PDU_DECOMM_DT" 
                                name="PDU_DECOMM_DT"
                                margin="normal"
                                //id="date-picker-dialog"
                                //label="Decommission Date"
                                format="dd/MM/yyyy"
                                margin="normal"
                                placeholder="dd/mm/yyyy"
                                value={selectedDecommDate}
                                //disablePast={true}
                                onChange={date => setSelectedDecommDate(date)}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                                />
                            </MuiPickersUtilsProvider>
                            </FormGroup>
                        </Col>
                        <Col xs='4'>
                            <Label>Status</Label>
                            <Input bsSize="sm"  type="select" id="PDU_STATUS" name="PDU_STATUS" value={PDUdata.PDU_STATUS} onChange={props.onChange} style={{ backgroundColor : backgcolor, textTransform: 'uppercase'}} >
                                <option value=''>Please Select</option>
                                <option value='ACTIVE'>ACTIVE</option>
                                <option value='NOT ACTIVE'>NOT ACTIVE</option>
                            </Input>
                            <Label>Description</Label>
                            <Input bsSize="sm"  type="textarea" id="PDU_DESC" name="PDU_DESC" value={PDUdata.PDU_DESC} rows="6" onChange={props.onChange} style={{ backgroundColor : backgcolor, textTransform: 'uppercase'}} />
                            <FormGroup  hidden={props.MaintenanceFlag}>
                            <Label>Maintenance Update</Label>
                            <Input bsSize="sm"  type="textarea" id="PDU_MAINTENANCE_UPD" name="PDU_MAINTENANCE_UPD"  rows="6" onChange={props.onChange}  style={{ backgroundColor : backgcolor, textTransform: 'uppercase'}} />
                            </FormGroup>
                        </Col>
                        <Col xs='5'>
                        <Card hidden={props.MaintenanceFlag}>
                            <CardHeader>Maintenance Update History:</CardHeader>
                                <CardBody>
                                     <TableMaintenance data={props.PDUJournal ? props.PDUJournal : ""}/>
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
    site: state.site,
    pdu: state.pdu
  };
};

const mapDispachToProps = dispatch => {
  return {

    fetchSite: () => dispatch({ type: "FETCH_DCSITE"}),
    fetchPDU: () => dispatch({ type: "FETCH_PDU"}),
  
  };
};
  
export default connect(mapStateToProps,mapDispachToProps)(FormPDU);