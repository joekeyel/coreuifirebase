import React, { Component, useState, useEffect } from 'react';
import { Badge, Button, Card, CardBody, CardFooter, CardHeader, Col, Form, FormGroup, Label, Row, Input } from 'reactstrap';
import '../css/style.css';
import Upload from './upload';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker } from '@material-ui/pickers';
import UploadDropZone from './dropZone';
import { connect } from "react-redux";
import { makeStyles, useTheme, TextField, Select, MenuItem, Chip } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      maxWidth: 300,
    },
    chips: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    chip: {
      margin: 2,
    },
    noLabel: {
      marginTop: theme.spacing(3),
    },
    selected: {
        //backgroundColor: "turquoise",
        color: "blue",
        fontWeight: 600
    }
  }));
  
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  
  function getStyles(siteName, optionVerified, theme) {
    return {
      fontWeight:
      optionVerified.indexOf(siteName) === -1
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


const FormLocation = (props) => {
       
  props.fetchSite(); //fetch site from saga

  const [backgcolor, setbackgcolor] = useState("#b3d9ff");
  const [actionForm, setactionForm] = useState(props.actionForm);
  const [actionCreateBtn, setActionCreateBtn] = useState(false);
  const [actionSaveBtn, setActionSaveBtn] = useState(false);
  const [LocIDFlag, setLocIDFlag] = useState(true);
  const [optionSite, setOptionSite] = useState([]);
  const [dataLocation, setDataLocation] = useState([]);
  const [optionLocation, setoptionLocation] = useState([]);
  const [borderColor, setBorderColor] = useState("");
  const [siteErrorMsg, setSiteErrorMsg]= useState("");
  const [locErrorMsg, setLocErrorMsg]= useState("");
  const [RackNoErrorMsg, setRackNoErrorMsg] = useState("");
  const [dataRack, setdataRack] = useState({});
  const [selectedCommDate, setSelectedCommDate] = useState(null)
  const [selectedDecommDate, setSelectedDecommDate] = useState(null)
  const classes = useStyles();
  const theme = useTheme();
 
  useEffect(() => {

      //console.log('propsForLocation', props);

      if (actionForm == 'CREATE') {
          setActionSaveBtn(true);
      }
      if (actionForm == 'EDIT') {

          setActionCreateBtn(true);
          setLocIDFlag(false);
      }

  }, [props]);

  const handleBackBtn =() =>{
      window.history.back();
  }

  const handleChange = (event) => {
    setOptionSite(event.target.value);

    fetch('/claritybqm/reportFetch/?scriptName=DC_LOCATION&site=' + event.target.value)
    .then(response => response.json())
    .then((location) => 
    {  
        //console.log('loc',location);
        setDataLocation({location})                   
    }
    );

  
    

};

const handleLocationChange = (event) => {
    setoptionLocation(event.target.value);
};

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
                 <Form id="formLocation" onSubmit={props.onSubmit}>
                <CardBody>
                <Row>
                    <Col xs="4">
                    <FormGroup className={classes.formControl}>
                    <Label>DC Site :</Label>
                    {/* <Input type="text" id="SITE_NAME" name="SITE_NAME" value={props.location.SITE_NAME} onChange={props.onChange} style={{ backgroundColor : backgcolor}} /> */}
                        <Select
                            id="SITE_NAME"
                            name="SITE_NAME"
                            //multiple
                            value={optionSite}
                            onChange={handleChange}
                            fullWidth
                            >
                            <MenuItem key='null' value="">
                                <em>None</em>
                            </MenuItem>
                            {Object.values(props.site).map((d) => ( //console.log('d',d.SITE_NAME)
                                <MenuItem key={d.SITE_ID} value={d.SITE_NAME} classes={{ selected: classes.selected }} style={getStyles(d.SITE_NAME, optionSite, theme)}>
                                {d.SITE_NAME}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormGroup>
                    <FormGroup  hidden={LocIDFlag}>
                    <Label>DC Location ID :</Label>
                    <Input type="text" id="LOCN_ID" name="LOCN_ID" value={props.locId} onChange={props.onChange} style={{ backgroundColor : backgcolor}} />
                    </FormGroup>
                    <FormGroup>
                    <Label>DC Location :</Label>
                    {/* <Input type="text" id="LOCN_NAME" name="LOCN_NAME" value={props.location.LOCN_NAME}  onChange={props.onChange} style={{ backgroundColor : backgcolor}} /> */}
                    <Select
                            id="LOCN_NAME"
                            name="LOCN_NAME"
                            //multiple
                            value={optionLocation}
                            onChange={handleLocationChange}
                            fullWidth
                            >
                            {/* <MenuItem key='null' value="">
                                <em>None</em>
                            </MenuItem>
                            {Object.values(dataLocation).map((d) => ( //console.log('d',d.SITE_NAME)
                                <MenuItem key={d.LOCN_ID} value={d.LOCN_NAME} classes={{ selected: classes.selected }} style={getStyles2(d.LOCN_NAME, optionLocation, theme)}>
                                {d.LOCN_NAME}
                                </MenuItem>
                            ))} */}
                        </Select>
                    </FormGroup>
                    <FormGroup>
                    <Label>DC Type :</Label>
                    <Input type="select"  id="LOCN_TYPE" name="LOCN_TYPE" value={props.location.LOCN_TYPE} style={{ backgroundColor : backgcolor}} >
                        <option value="">Please select</option>
                        <option value="Premium">Premium</option>
                        <option value="Option2">Option #2</option>
                        <option value="Option3">Option #3</option>
                      </Input>
                    </FormGroup>
                </Col>
                <Col xs="4">
                    <Label>Space Capacity (sqft) :</Label>
                    <Input type="text" id="LOCN_SPACE_CAPACITY" value={props.location.LOCN_SPACE_CAPACITY} name="LOCN_SPACE_CAPACITY" onChange={props.onChange} style={{ backgroundColor : backgcolor}} />
                    <Label>Floor Plan :</Label>
                    <Upload />
                    {/* <Input type="file" id="LOCN_FLOOR_PLAN" value={props.location.LOCN_FLOOR_PLAN} name="LOCN_FLOOR_PLAN" style={{ backgroundColor : backgcolor}} /> */}
                    <Label>Rack Utilization :</Label>
                    <UploadDropZone />
                    {/* <Input type="file" id="LOCN_RACK_UTILIZATION" value={props.location.LOCN_RACK_UTILIZATION} name="LOCN_RACK_UTILIZATION" style={{ backgroundColor : backgcolor}} /> */}
                </Col>
                <Col xs="4">
                <FormGroup>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                    id="LOCN_COMM_DT" 
                    name="LOCN_COMM_DT"
                    margin="normal"
                    //id="date-picker-dialog"
                    //filterDate={date => date.getDay() !== 6 && date.getDay() !== 0}
                    label="Commission Date"
                    format="dd/MM/yyyy"
                    margin="normal"
                    value={selectedCommDate}
                    onChange={date => setSelectedCommDate(date)}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                    />
                </MuiPickersUtilsProvider>
                </FormGroup>
                <FormGroup>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                    id="LOCN_DECOMM_DT" 
                    name="LOCN_DECOMM_DT"
                    margin="normal"
                    //id="date-picker-dialog"
                    label="Decommission Date"
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
                    <Label>Status :</Label>
                    <Input type="select" name="LOCN_STATUS" id="LOCN_STATUS" value={props.location.LOCN_STATUS}  style={{ backgroundColor : backgcolor}} >
                        <option value="">Please select</option>
                        <option value="Active">Active</option>
                        <option value="Not Active">Not Active</option>
                        <option value="KIV">KIV</option>
                      </Input>
                    <Label>Description :</Label>
                    <Input type="textarea" rows="4" id="LOCN_DESC" name="LOCN_DESC" value={props.location.LOCN_DESC} onChange={props.onChange} style={{ backgroundColor : backgcolor}} />

                </Col>
             </Row> 
                </CardBody>
                </Form>
                 </Card>
                 <div className="form-button">
                            <Row style={{ marginBottom: '20px' }}>
                                <Col>
                                    <Button color="info" onClick={handleBackBtn}>
                                        <i className="fa fa-history"></i>&nbsp; Back</Button>&nbsp;&nbsp;&nbsp;
                                        <Button color="primary" type="submit" hidden={actionCreateBtn}>
                                        <i className="fa fa-plus"></i>&nbsp; Create </Button>&nbsp;
                                        <Button color="primary" type="submit" hidden={actionSaveBtn}>
                                         <i className="fa fa-save"></i>&nbsp; Save </Button>&nbsp;
                                        <Button color="success" type="submit" >
                                         <i className="fa fa-send"></i>&nbsp; Submit </Button>
                                </Col>
                            </Row>
                        </div>
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

export default connect(mapStateToProps,mapDispachToProps)(FormLocation);