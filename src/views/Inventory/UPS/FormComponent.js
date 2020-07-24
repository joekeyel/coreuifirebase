import React, { Component, useEffect, useState } from 'react';
import { Badge,Button,Card, CardBody, CardFooter, CardHeader, Col, Input, Label,Row, Form ,FormGroup,} from 'reactstrap';
import { connect } from "react-redux";
import '../css/style.css';
import TableMaintenance from '../Maintenance/TableMaintenance';
import { makeStyles, useTheme, FormHelperText, Select, MenuItem, Chip,FormControl, InputLabel } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker } from '@material-ui/pickers';

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

const FormUPS = (props) =>  {
  //props.fetchSite();
  const [backgcolor, setbackgcolor] = useState("#b3d9ff");
  const [actionForm, setactionForm] = useState(props.actionForm);
  const [actionCreateBtn, setactionCreateBtn] = useState(false);
  const [actionSaveBtn, setactionSaveBtn] = useState(false);
  const classes = useStyles();
  const [locationData, setlocationData] = useState([]);
  const [dcSiteList, setDCSiteList] = React.useState([]);
  const [dcSite, setDCSite] = React.useState([]);
  const [optionLocation, setoptionLocation] = useState([]);
  const [selectedCommDate, setSelectedCommDate] = useState(null)
  const [selectedDecommDate, setSelectedDecommDate] = useState(null)
  const [flagUPSid, setFlagUPSid] = useState(true);
  const [flagDecommDate, setflagDecommDate] = useState(true);
  const [UPSdata, setUPSdata] = useState({});
  const theme = useTheme();

  useEffect(()=> {

    if(actionForm === 'CREATE'){
      setactionSaveBtn(true);
    }

    if(actionForm === 'EDIT'){
      setactionCreateBtn(true);
      setFlagUPSid(false);
      setflagDecommDate(false);
      setDCSite([props.dcSite]);
      if(props.changeFlag == true){
        setUPSdata(props.values.values)
      }
         
      if(props.upsID != "" && dcSite == ""){

        setDCSite([props.UPSdata.SITE_NAME]);
        setUPSdata(props.UPSdata);
        /* split location name in edit screen */
        setSelectedCommDate(props.UPSdata.UPS_COMM_DT);
        setSelectedDecommDate(props.UPSdata.UPS_DECOMM_DT);
        if(props.UPSdata.LOCATION_NAME){
          var splitLocn = props.UPSdata.LOCATION_NAME.split(',');
          setoptionLocation(splitLocn);     
        }
        // fetch('/claritybqm/reportFetch/?scriptName=DC_UPS&id='+id)
        // .then(response => response.json())
        // .then((ups) => 
        // {  
        //   //var filterUPS = Object.values(ups).filter((ups)=> ups.UPS_ID == id);
        //   //var siteName = filterUPS[0].SITE_NAME;
        //   setDCSite([ups.ups]);
        //   setUPSdata(ups.ups);
        //   /* split location name in edit screen */
        //   var splitLocn = ups.ups.LOCATION_NAME.split(',');
        //   setoptionLocation(splitLocn);    
        //   setSelectedCommDate(ups.ups.UPS_COMM_DT);
        //   setSelectedDecommDate(ups.ups.UPS_DECOMM_DT);
        //   //console.log('filterUPS',filterUPS);                 
        // }
        // );
      }


    }

    var siteExist = Object.values(props.site).filter((site)=> site.SITE_VERIFIED_TAG === 'Y')
    setDCSiteList(siteExist);

  },[props]);
  
  useEffect(()=>{
    //console.log('props',props);

    props.fetchSite();
    var siteExist = Object.values(props.site).filter((site)=> site.SITE_VERIFIED_TAG === 'Y')
    //console.log('siteExist',siteExist);
      setDCSiteList(siteExist);

  },[]);

 const  handleBackBtn =() =>{
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
      //console.log('loc',location);
      setlocationData(location)                   
  }
  );
}

const handleLocationChange = (event) => {
  setoptionLocation(event.target.value);    
};

return(
    <div className="animated fadeIn">
      <Row>
              <Col xs='12'>
              <Card>
              <Form id="formUPS" onSubmit={props.onSubmit}>
                <CardHeader>UPS <strong>({actionForm})</strong>
                <small><font color="red"> ( * ) is mandatoy field</font></small>
                </CardHeader>
                  <CardBody>
                    <Row style={{marginLeft: "50px"}}>
                        <Col xs="4">
                        <FormControl className={classes.formControl} error={props.hasError1}>
                        <InputLabel id="demo-controlled-open-select-label">DC Site<font color="red">*</font></InputLabel>
                          <Select
                            labelId="demo-controlled-open-select-label"
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
                        <Col xs='4'>
                        <FormGroup className={classes.formControl}  error={props.hasError2}>
                        <InputLabel >Served DC Location<font color="red">*</font></InputLabel>
                            <Select
                                    required
                                   // labelId="demo-controlled-open-select-label"
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
                         <FormGroup hidden={flagUPSid}>
                            <Label>UPS Ref ID</Label>
                            <Input bsSize="sm"  type="text" id="UPS_ID" name="UPS_ID" value={props.upsID} onChange={props.onChange}  style={{ backgroundColor : backgcolor, textTransform: 'uppercase'}} readOnly/>
                          </FormGroup>
                            <FormGroup  error={props.hasError3}>
                            <Label>UPS Name</Label><font color="red">*</font>
                            <Input bsSize="sm"  type="text" id="UPS_NAME" name="UPS_NAME" upper value={UPSdata.UPS_NAME} onChange={props.onChange}  style={{ backgroundColor : backgcolor, textTransform: 'uppercase'}}/>
                            {props.hasError3 && <FormHelperText style={{color: 'red'}}>This is required!</FormHelperText>}
                            </FormGroup>
                            <Label>Power Capacity(kW)</Label>
                            <Input bsSize="sm"  type="number" id="UPS_POWER_CAPACITY" name="UPS_POWER_CAPACITY" value={UPSdata.UPS_POWER_CAPACITY} onChange={props.onChange}  style={{ backgroundColor : backgcolor, textTransform: 'uppercase', maxLength: '5' }} />
                            <Label>Brand</Label>
                            <Input bsSize="sm"  type="text" id="UPS_BRAND" name="UPS_BRAND" value={UPSdata.UPS_BRAND} onChange={props.onChange}  style={{ backgroundColor : backgcolor, textTransform: 'uppercase'}} />
                            <Label>Model</Label>
                            <Input bsSize="sm"  type="text" id="UPS_MODEL" name="UPS_MODEL" value={UPSdata.UPS_MODEL} onChange={props.onChange}  style={{ backgroundColor : backgcolor, textTransform: 'uppercase'}} />
                            <Label>Status</Label>
                            <Input bsSize="sm"  type="select" id="UPS_STATUS" name="UPS_STATUS" value={UPSdata.UPS_STATUS} onChange={props.onChange}  style={{ backgroundColor : backgcolor, textTransform: 'uppercase'}} >
                                    <option value="">Please select</option>
                                    <option value="ACTIVE">Active</option>
                                    <option value="NOT ACTIVE">Not Active</option>
                                    <option value="KIV">KIV</option>              
                            </Input>
                          </Col>
                        <Col xs='5'>
                           <Label>Description</Label>
                            <Input bsSize="sm"  type="textarea" id="UPS_DESC" name="UPS_DESC" rows="6" value={UPSdata.UPS_DESC} onChange={props.onChange}  style={{ backgroundColor : backgcolor, textTransform: 'uppercase'}} />
                           {/* <FormControl hidden={props.MaintenanceFlag}>
                            <Label>Maintenance Update</Label>
                            <Input bsSize="sm" type="textarea" id="UPS_MAINTENANCE_UPD" name="UPS_MAINTENANCE_UPD" value={UPSdata.UPS_MAINTENANCE_UPD} rows="6" onChange={props.onChange}  style={{ backgroundColor : backgcolor, textTransform: 'uppercase'}} />
                            </FormControl> */}
                        <Label>Commission Date</Label><font color="red">*</font>
                        <FormGroup error={props.hasError4}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                id="UPS_COMM_DT" 
                                name="UPS_COMM_DT"
                                margin="normal"
                                //id="date-picker-dialog"
                                //disablePast={true}
                                //shouldDisableDate={date => date.getDay() === 0 && date.getDay() === 6
                                //date => console.log('date',date.getDay()) 
                                //date.getDay() !== 6 && date.getDay() !== 0
                                // }
                                placeholder="dd/mm/yyyy"
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
                            <Label>Decommission Date</Label>
                            <FormGroup hidden={flagDecommDate}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                id="UPS_DECOMM_DT" 
                                name="UPS_DECOMM_DT"
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
                    </Row>
                    <Row style={{marginLeft: "50px"}}>
                      <Col xs='4'>
                        <FormGroup hidden={props.MaintenanceFlag}>
                        <Label>Maintenance Update</Label>
                        <Input type="textarea" id="UPS_MAINTENANCE_UPD" name="UPS_MAINTENANCE_UPD" value={UPSdata.UPS_MAINTENANCE_UPD} rows="6" onChange={props.onChange}  style={{ backgroundColor : backgcolor, textTransform: 'uppercase'}} />
                        </FormGroup>
                    </Col>
                    <Col xs='8'>
                    <Card hidden={props.MaintenanceFlag}>
                            <CardHeader>Maintenance Update History:</CardHeader>
                                <CardBody>
                                     <TableMaintenance data={props.UPSJournal ? props.UPSJournal : ''}/>
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
                  </CardBody>
              </Form>
              </Card>
              </Col>
          </Row>
        </div>
    );
}

const mapStateToProps = state => {
  return {
    site: state.site,
    ups: state.ups,
  };
};

const mapDispachToProps = dispatch => {
  return {

    fetchSite: () => dispatch({ type: "FETCH_DCSITE"}),
    fetchUPS: () => dispatch({ type: "FETCH_UPS"}),
  };
};


export default connect(mapStateToProps,mapDispachToProps)(FormUPS);