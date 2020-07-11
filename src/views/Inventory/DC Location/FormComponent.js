import React, { Component, useState, useEffect } from 'react';
import { Badge, Button, Card, CardBody, CardFooter, CardHeader, Col, Form, FormGroup, Label, Row, Input } from 'reactstrap';
import '../css/style.css';
import $ from 'jquery';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker } from '@material-ui/pickers';
import { connect } from "react-redux";
import { makeStyles, useTheme, FormHelperText, Select, MenuItem, Chip,FormControl, InputLabel } from '@material-ui/core';
import { DropzoneArea } from 'material-ui-dropzone';

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

const FormLocation = (props) => {
       
  //props.fetchSite(); //fetch site from saga

  const [backgcolor, setbackgcolor] = useState("#b3d9ff");
  const [actionForm, setactionForm] = useState(props.actionForm);
  const [actionCreateBtn, setActionCreateBtn] = useState(false);
  const [actionSaveBtn, setActionSaveBtn] = useState(false);
  const [LocIDFlag, setLocIDFlag] = useState(true);
  const [dataLocID, setdataLocID] = useState({});
  const [dcSite, setDCSite] = React.useState([]);
  const [selectedCommDate, setSelectedCommDate] = useState(null)
  const [selectedDecommDate, setSelectedDecommDate] = useState(null)
  const [imagePriviewFloor, setImagePreviewFloor] = useState(null);
  const [imagePriviewRack, setImagePreviewRack] = useState(null);
  const classes = useStyles();
  const theme = useTheme();
 
  useEffect(() => {

      console.log('FormLocation', props);

      if (actionForm == 'CREATE') {
          setActionSaveBtn(true);
          setImagePreviewFloor(props.imgPreviewFloor);
          setImagePreviewRack(props.imgPreviewRack);
      }
      if (actionForm == 'EDIT') {
          setActionCreateBtn(true);
          setLocIDFlag(false);
          if(imagePriviewFloor === null || imagePriviewRack === null){
            fetch('/claritybqm/reportFetch/?scriptName=DC_LOCATION&locn_id=' + props.locId)
              .then(response => response.json())
              .then((location) => 
              {  
                  console.log('loc',location);
                  setdataLocID(location[0]);    
                  setDCSite([location[0].SITE_NAME]);
                  setImagePreviewFloor(location[0].FLOOR_PLAN);
                  setImagePreviewRack(location[0].RACK_UTILIZATION);     
                  setSelectedCommDate(location[0].LOCN_COMM_DT);
                  setSelectedDecommDate(location[0].LOCN_DECOMM_DT);       
                  //document.getElementById("LOCN_FLOOR_PLAN").value = "";
                  //document.getElementById("LOCN_RACK_UTILIZATION").value = "";
              }
              );
            }
              if(props.changeFlag === true){
                setdataLocID(props.data.values)
              }
          }

  }, [props]);

  const handleBackBtn =() =>{
      window.history.back();
  }

  
const handleDeleteImg = (e) =>{
 //var input = document.getElementById('LOCN_FLOOR_PLAN').value;
  //console.log('LOCN_FLOOR_PLAN',e);
  if(e === 'floor'){
    document.getElementById("LOCN_FLOOR_PLAN").value = "";
    setImagePreviewFloor(null);
  }
  if(e === 'rack'){
    document.getElementById("LOCN_RACK_UTILIZATION").value = "";
    setImagePreviewRack(null);
  }
  
}
const handleChangeSite = (e) =>{
  setDCSite([e.target.value]);
}
const handleChange = (e) =>{
  console.log('e',e);
  
}
const handleClickFloorImg=(e) =>{
  document.getElementById('LOCN_FLOOR_PLAN').click();
}
const handleClickRackImg=(e) =>{
  document.getElementById('LOCN_RACK_UTILIZATION').click();
}
return(
    <div className="animated fadeIn" >
        <Row>
        <Col xs="12">
            <Card>
            <Form id="formLocation" onSubmit={props.onSubmit}>
                <CardHeader>
                    <strong>DC Location ({actionForm})</strong>
                    {/* <small> Form</small> */}
                </CardHeader>
                <CardBody>
                 <Card>
                <CardBody>
                <Row>
                    <Col xs="4">
                      <FormControl className={classes.formControl} error={props.hasError1}>
                      <InputLabel id="demo-controlled-open-select-label">DC Site</InputLabel>
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
                    <FormGroup className={classes.formControl}  error={props.hasError2}>
                    <Label>Served DC Location</Label>
                    <Input id='LOCN_NAME' name='LOCN_NAME' value={dataLocID.LOCN_NAME} onChange={props.onChange} style={{ backgroundColor : backgcolor}} />
                        {props.hasError2 && <FormHelperText style={{color: 'red'}}>This is required!</FormHelperText>}
                    </FormGroup>
                    <FormGroup  hidden={LocIDFlag}>
                    <Label>DC Location ID :</Label>
                    <Input type="text" id="LOCN_ID" name="LOCN_ID" value={props.locId} onChange={props.onChange} style={{ backgroundColor : backgcolor}} />
                    </FormGroup>
                    <FormGroup>
                    <Label>DC Location Type :</Label>
                    <Input type="select"  id="LOCN_TYPE" name="LOCN_TYPE" value={dataLocID.LOCN_TYPE} style={{ backgroundColor : backgcolor}} >
                        <option value="">Please select</option>
                        <option value="Premium">Premium</option>
                        <option value="Option2">Option #2</option>
                        <option value="Option3">Option #3</option>
                      </Input>
                    </FormGroup>
                </Col>
                <Col xs="4">
                    <Label>Space Capacity (sqft) :</Label>
                    <Input type="text" id="LOCN_SPACE_CAPACITY" value={dataLocID.LOCN_SPACE_CAPACITY} name="LOCN_SPACE_CAPACITY" onChange={props.onChange} style={{ backgroundColor : backgcolor}} />
                    <Label>Floor Plan :</Label>
                    <Card body style={{borderColor: 'blue'}}>
                    { imagePriviewFloor ? <div><img src={imagePriviewFloor} alt='' style={{width: 'auto', height: '150px'}} /><Button type="button" color="danger" className="btn btn-pill" onClick={()=>handleDeleteImg('floor')}><span><i className="fa fa-trash" ></i></span></Button></div> : "" }
                    <Button color="primary" onClick={handleClickFloorImg}>
                        Upload a file
                    </Button>
                    <Input type="file" id="LOCN_FLOOR_PLAN" name="LOCN_FLOOR_PLAN" style={{ backgroundColor : backgcolor, display: 'none'}} onChange={props.onChange} />
                    </Card>
                    <Label>Rack Utilization :</Label>
                    <Card body style={{borderColor: 'blue'}}>
                    <Button color="primary" onClick={handleClickRackImg}>
                        Upload a file
                    </Button>
                    { imagePriviewRack ? <div><img src={imagePriviewRack} alt='Rack Util' style={{width: 'auto', height: '150px'}} /><Button type="button" color="danger" className="btn btn-pill" onClick={()=>handleDeleteImg('rack')}><span><i className="fa fa-trash" ></i></span></Button></div> : "" }
                    <Input type="file" id="LOCN_RACK_UTILIZATION" name="LOCN_RACK_UTILIZATION" onChange={props.onChange} style={{ backgroundColor : backgcolor, display: 'none'}} />   
                    </Card>
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
                    <Input type="select" name="LOCN_STATUS" id="LOCN_STATUS" value={dataLocID.LOCN_STATUS}  style={{ backgroundColor : backgcolor}} >
                        <option value="">Please select</option>
                        <option value="Active">Active</option>
                        <option value="Not Active">Not Active</option>
                        <option value="KIV">KIV</option>
                      </Input>
                    <Label>Description :</Label>
                    <Input type="textarea" rows="4" id="LOCN_DESC" name="LOCN_DESC" value={dataLocID.LOCN_DESC} onChange={props.onChange} style={{ backgroundColor : backgcolor}} />
                </Col>
             </Row> 
                </CardBody>
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
                </Form>
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