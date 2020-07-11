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
  const [locationData, setlocationData] = useState([]);
  const [dcSite, setDCSite] = React.useState([]);
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
    console.log('props',props);
    
    if(actionForm === 'CREATE'){
      setactionSaveBtn(true);
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
  
  },[props]);
  
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
                  <CardHeader>CRAC<strong>({actionForm})</strong></CardHeader>
                  <CardBody>
                    <Form id="formCRAC" onSubmit={props.onSubmit}>
                    <Row style={{marginLeft: "50px"}}>
                        <Col xs="4">
                        <FormControl className={classes.formControl} error={props.hasError1} onClick={() => props.fetchSite()}>
                            <InputLabel id="demo-controlled-open-select-label">DC Site</InputLabel>
                            <Select
                              labelId="demo-controlled-open-select-label"
                              id="SITE_NAME"
                              name="SITE_NAME"
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
                              <MenuItem value=''/>
                              {
                                Object.values(props.site).map((site)=>( //console.log('site',site)
                                   <MenuItem key={site.SITE_ID} value={site.SITE_NAME} classes={{ selected: classes.selected }} style={getStyles(site.SITE_NAME, dcSite, theme)}>
                                     {site.SITE_NAME}
                                  </MenuItem>
                                ))
                              }
                            </Select>
                            {props.hasError1 && <FormHelperText style={{color: 'red'}}>This is required!</FormHelperText>}
                          </FormControl>
                        </Col>
                    </Row>
                    <Row  style={{marginLeft: "50px", marginTop: "10px"}}>
                        <Col xs="4">
                        <FormGroup className={classes.formControl} error={props.hasError2}>
                            <InputLabel id="demo-controlled-open-select-label">Served DC Location</InputLabel>
                            <Select
                                    required
                                    labelId="demo-controlled-open-select-label"
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
                        <Col xs='2'>
                            <FormGroup hidden={flagCRACid}>
                            <Label>CRAC Ref ID</Label>
                            <Input type="text" id="CRAC_ID" name="CRAC_ID" value={props.CRACid} onChange={props.onChange} style={{ backgroundColor : backgcolor, textTransform: 'uppercase'}} readOnly/>
                            </FormGroup>
                            <FormGroup  error={props.hasError3}>
                            <Label>CRAC Name</Label>
                            <Input type="text" id="CRAC_NAME" name="CRAC_NAME" value={CRACdata.CRAC_NAME} onChange={props.onChange} style={{ backgroundColor : backgcolor, textTransform: 'uppercase'}} />
                            {props.hasError3 && <FormHelperText style={{color: 'red'}}>This is required!</FormHelperText>}
                            </FormGroup>
                            <Label>Area/Zone</Label>
                            <Input type="text" id="CRAC_AREA" name="CRAC_AREA" value={CRACdata.CRAC_AREA} onChange={props.onChange} style={{ backgroundColor : backgcolor, textTransform: 'uppercase'}} />
                            <Label>kW/Unit</Label>
                            <Input type="number" id="CRAC_KW" name="CRAC_KW" value={CRACdata.CRAC_KW} onChange={props.onChange} style={{ backgroundColor : backgcolor, textTransform: 'uppercase'}} />
                            <Label>Quantity</Label>
                            <Input type="number" id="CRAC_QUANTITY" name="CRAC_QUANTITY" value={CRACdata.CRAC_QUANTITY} onChange={props.onChange} style={{ backgroundColor : backgcolor, textTransform: 'uppercase'}} />
                            <Label>Cooling Capacity(kW)</Label>
                            <Input type="number" id="CRAC_COOL_CAPACITY" name="CRAC_COOL_CAPACITY" value={CRACdata.CRAC_COOL_CAPACITY} onChange={props.onChange} style={{ backgroundColor : backgcolor, textTransform: 'uppercase'}} />
                        </Col>
                        <Col xs='4'>
                            <Label>Brand</Label>
                            <Input type="text" id="CRAC_BRAND" name="CRAC_BRAND" value={CRACdata.CRAC_BRAND} onChange={props.onChange} style={{ backgroundColor : backgcolor, textTransform: 'uppercase'}} />
                            <Label>Type</Label>
                            <Input type="text" id="CRAC_TYPE" name="CRAC_TYPE" value={CRACdata.CRAC_TYPE} onChange={props.onChange} style={{ backgroundColor : backgcolor, textTransform: 'uppercase'}} />
                            <Label>Status</Label>
                            <Input type="select" id="CRAC_STATUS" name="CRAC_STATUS" value={CRACdata.CRAC_STATUS} onChange={props.onChange} style={{ backgroundColor : backgcolor, textTransform: 'uppercase'}} >
                                <option value=''>Please Select</option>
                                <option value='ACTIVE'>ACTIVE</option>
                                <option value='INACTIVE'>INACTIVE</option>
                                <option value='STANDBY'>STANDBY</option>
                            </Input>
                            <Label>Description</Label>
                            <Input type="textarea" id="CRAC_DESC" name="CRAC_DESC" value={CRACdata.CRAC_DESC} rows="6" onChange={props.onChange} style={{ backgroundColor : backgcolor,}} />
                        </Col>
                        <Col xs='6'>
                          <FormGroup>
                            <Label>Maintenance Update</Label>
                            <Input type="textarea" id="CRAC_MAINTENANCE_UPD" name="CRAC_MAINTENANCE_UPD"  rows="6" onChange={props.onChange}  style={{ backgroundColor : backgcolor}} />
                          </FormGroup>
                        <Card>
                            <CardHeader>Maintenance Update History:</CardHeader>
                                <CardBody>
                                     <TableMaintenance data=''/>
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
    site: state.site
  };
};

const mapDispachToProps = dispatch => {
  return {

    fetchSite: () => dispatch({ type: "FETCH_DCSITE"}),
  
  };
};
  
export default connect(mapStateToProps,mapDispachToProps)(FormCRAC);