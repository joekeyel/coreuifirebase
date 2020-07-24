import React, { Component, useState, useEffect } from 'react';
import { Badge, Button, Card, CardBody, CardFooter, CardHeader, Col, Form, FormGroup, Label, Row, Input } from 'reactstrap';
import '../css/style.css';
import $ from 'jquery';
import axios from 'axios';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker } from '@material-ui/pickers';
import { connect } from "react-redux";
import { makeStyles, useTheme, FormHelperText, Select, MenuItem, Chip,FormControl, InputLabel } from '@material-ui/core';
import { DropzoneArea } from 'material-ui-dropzone';
import { Link } from 'react-router-dom';

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
  const [actionDeleteBtn, setActionDeleteBtn] = useState(false);
  const [LocIDFlag, setLocIDFlag] = useState(true);
  const [dataLocID, setdataLocID] = useState({});
  const [dcSiteList, setDCSiteList] = React.useState([]);
  const [dcSite, setDCSite] = React.useState([]);
  const [locType, setLocType] = React.useState([]);
  const [selectedCommDate, setSelectedCommDate] = useState(null)
  const [selectedDecommDate, setSelectedDecommDate] = useState(null)
  const [imagePriviewFloor, setImagePreviewFloor] = useState(null);
  const [imagePriviewRack, setImagePreviewRack] = useState(null);
  const [FileNameFloor, setFileNameFloor] = useState(null);
  const [FileNameRack, setFileNameRack] = useState(null);
  const [FileSizeFloor, setFileSizeFloor] = useState(null);
  const [FileSizeRack, setFileSizeRack] = useState(null);

  const classes = useStyles();
  const theme = useTheme();
 
  useEffect(() => {
    var siteExist = Object.values(props.site).filter((site)=> site.SITE_VERIFIED_TAG === 'Y')
    //console.log('siteExist',siteExist);
      setDCSiteList([siteExist]);
    //console.log('FormLocation', props);
    if(actionForm === 'VIEW'){
      setActionSaveBtn(true);
      setActionCreateBtn(true);
      setActionDeleteBtn(true);
      setDCSite(props.dcSite);
      setdataLocID(props.location);    
      setImagePreviewFloor(props.imgPreviewFloor);
      setImagePreviewRack(props.imgPreviewRack);     
      setSelectedCommDate(props.selectedCommDate);
      setSelectedDecommDate(props.selectedDecommDate);       
      setFileNameFloor(props.FileNameFloor); 
      setFileNameRack(props.FileNameRack); 
      setFileSizeFloor(props.FileSizeFloor); 
      setFileSizeRack(props.FileSizeRack); 
    }
      if (actionForm == 'CREATE') {
          setActionSaveBtn(true);
          setActionDeleteBtn(true);
          setImagePreviewFloor(props.imgPreviewFloor);
          setImagePreviewRack(props.imgPreviewRack);
          setFileNameFloor(props.FileNameFloor); 
          setFileNameRack(props.FileNameRack); 
          setFileSizeFloor(props.FileSizeFloor); 
          setFileSizeRack(props.FileSizeRack); 
      }
      if (actionForm == 'EDIT') {
          setActionCreateBtn(true);
          setLocIDFlag(false);
          setdataLocID(props.location);    
          setDCSite(props.dcSite);
          setImagePreviewFloor(props.imgPreviewFloor);
          setImagePreviewRack(props.imgPreviewRack);     
          setSelectedCommDate(props.selectedCommDate);
          setSelectedDecommDate(props.selectedDecommDate);       
          setFileNameFloor(props.FileNameFloor); 
          setFileNameRack(props.FileNameRack); 
          setFileSizeFloor(props.FileSizeFloor); 
          setFileSizeRack(props.FileSizeRack); 
        
          if(props.changeFlag === true){
            setdataLocID(props.data.values)
          }
          }
          var siteExist = Object.values(props.site).filter((site)=> site.SITE_VERIFIED_TAG === 'Y')
          setDCSiteList(siteExist);
          //console.log('siteExist',siteExist);
          

  }, [props]);

  useEffect(()=>{

    props.fetchSite();
    var siteExist = Object.values(props.site).filter((site)=> site.SITE_VERIFIED_TAG === 'Y')
    //console.log('siteExist',siteExist);
      setDCSiteList(siteExist);

      axios.get('/claritybqm/reportFetch/?scriptName=DC_LOV&type=LOCATION_DC_TYPE')
      .then((res) => {
        //console.log('LOCATION_DC_TYPE : ', res.data);   
        setLocType(res.data)
        
        })
          .catch((err) => {
          console.log('error lov loc type : ', err);
          });
 

  },[]);

  const handleBackBtn =() =>{
      window.history.back();
  }

const imageFloorPreview = ()=>{

  var fileSize = (FileSizeFloor/ 1024).toFixed(2) + " KB";

  return(<div style={{justifyContent: 'right'}}>
    <Row>
    <Col>
    <img src={imagePriviewFloor} alt='Rack Util' style={{width: '200px', height: '150px'}} />
    <Button type="button" color="danger" className="btn btn-pill" onClick={()=>handleDeleteImg('floor')} hidden={props.uploadBtn}>
    <span><i className="fa fa-trash" ></i></span>
    </Button>
    </Col>
    </Row>
    <Col style={{marginBottom: '0px'}}>
    <Row>
      File Name: {FileNameFloor}
    </Row>
     <Row>
      File Size: {fileSize}
    </Row>         
    </Col>
    </div> )

}

const imageRackPreview = ()=>{

  var fileSize = (FileSizeRack/ 1024).toFixed(2) + " KB";

  return(<div style={{justifyContent: 'right'}}>
    <Row>
    <Col>
    <img src={imagePriviewRack} alt='Rack Util' style={{width: '200px', height: '150px'}} />
    <Button type="button" color="danger" className="btn btn-pill" onClick={()=>handleDeleteImg('rack')} hidden={props.uploadBtn} >
    <span><i className="fa fa-trash" ></i></span>
    </Button>
    </Col>
    </Row>
    <Col style={{marginBottom: '0px'}}>
    <Row>
      File Name: {FileNameRack}
    </Row>
     <Row>
      File Size: {fileSize}
    </Row>         
    </Col>
    </div> )

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
const handleResetData = () => {

  setSelectedCommDate(null);
  setSelectedDecommDate(null);   

}
return(
    <div className="animated fadeIn" >
        <Row>
        <Col xs="12">
            <Card>
            <Form id="formLocation" onSubmit={props.onSubmit}>
                <CardHeader>
                    <strong>DC Location ({actionForm})</strong>
                    <small><font color="red"> ( * ) is mandatoy field</font></small>
                </CardHeader>
                <CardBody>
                 <Card>
                <CardBody>
                <Row>
                    <Col xs="4">
                      <FormControl className={classes.formControl} error={props.hasError1}>
                      <Label>DC Site<font color="red">*</font></Label>
                            <Input bsSize="sm"  type="select" name="SITE_NAME" id="SITE_NAME" onChange={props.onChange} style={{ backgroundColor : backgcolor}} >
                            {/*loop Dc site*/}
                            {    actionForm === 'CREATE' ? 
                                    dcSiteList.map(function(lov,index) {
                                    return <option key={index} value={lov.SITE_NAME}>{lov.SITE_NAME}</option>
                                    })
                                    :
                                    // dataRack.site.map(function(lov,index) {
                                    //   return <option key={index} value={dataRack.SITE_NAME}>{dataRack.SITE_NAME}</option>
                                    // })
                                  <option key='id' value={dataLocID.SITE_NAME}>{dataLocID.SITE_NAME}</option>
                                   
                            }  
                            </Input>
                      {props.hasError1 && <FormHelperText style={{color: 'red'}}>This is required!</FormHelperText>}
                    </FormControl>
                    <FormGroup error={props.hasError2}>
                    <Label>DC Location</Label><font color="red">*</font>
                    <Input bsSize="sm"  type="text" id='LOCN_NAME' name='LOCN_NAME' value={dataLocID.LOCN_NAME} onChange={props.onChange} style={{ backgroundColor : backgcolor}} />
                        {props.hasError2 && <FormHelperText style={{color: 'red'}}>This is required!</FormHelperText>}
                    </FormGroup>
                    <FormGroup  hidden={LocIDFlag}>
                    <Label>DC Location ID :</Label>
                    <Input bsSize="sm"  type="text" id="LOCN_ID" name="LOCN_ID" value={props.locId} onChange={props.onChange} style={{ backgroundColor : backgcolor}} />
                    </FormGroup>
                    <FormGroup>
                    <Label>DC Location Type :</Label>
                    <Input bsSize="sm"  type="select"  id="LOCN_TYPE" name="LOCN_TYPE" value={dataLocID.LOCN_TYPE} onChange={props.onChange} style={{ backgroundColor : backgcolor}} >
                        <option id="null" value="">Please select</option>
                        {
                          Object.values(locType).map((type)=>{
                            return(<>
                              <option id={type.LOV_VALUE} value={type.LOV_VALUE}>{type.LOV_VALUE}</option>
                            </>)
                          })
                        }
                      </Input>
                    </FormGroup>
                    <Label>Space Capacity (sqft) :</Label>
                    <Input bsSize="sm"  type="number" id="LOCN_SPACE_CAPACITY" value={dataLocID.LOCN_SPACE_CAPACITY} name="LOCN_SPACE_CAPACITY" onChange={props.onChange} style={{ backgroundColor : backgcolor}} />
                </Col>
                <Col xs="4">
                   <Label>Floor Plan :</Label>
                    <Card body style={{borderColor: 'blue'}}>
                    { imagePriviewFloor ? imageFloorPreview() : <h6>No image found</h6> }
                    <Button color="primary" onClick={handleClickFloorImg} hidden={props.uploadBtn} >
                        Upload a file
                    </Button>
                    <Input bsSize="sm" type="file" accept="image/*" id="LOCN_FLOOR_PLAN" name="LOCN_FLOOR_PLAN" style={{ backgroundColor : backgcolor, display: 'none'}} onChange={props.onChange} />
                    </Card>
                    <Label>Rack Utilization :</Label>
                    <Card body style={{borderColor: 'blue'}}>
                    { imagePriviewRack ? imageRackPreview() : <h6>No image found</h6> }
                    <Button color="primary" onClick={handleClickRackImg} hidden={props.uploadBtn} >
                        Upload a file
                    </Button>
                    <Input bsSize="sm"  type="file" accept="image/*"  id="LOCN_RACK_UTILIZATION" name="LOCN_RACK_UTILIZATION" onChange={props.onChange} style={{ backgroundColor : backgcolor, display: 'none'}} />   
                    </Card>
                </Col>
                <Col xs="4">
                <Label>Commission Date :</Label><font color="red">*</font>
                <FormGroup>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                    id="LOCN_COMM_DT" 
                    name="LOCN_COMM_DT"
                    //id="date-picker-dialog"
                    //filterDate={date => date.getDay() !== 6 && date.getDay() !== 0}
                    //label="Commission Date"
                    placeholder="dd/mm/yyyy"
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
                <Label>Decommission Date :</Label>
                <FormGroup  hidden={props.flagDecommDate}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                    id="LOCN_DECOMM_DT" 
                    name="LOCN_DECOMM_DT"
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
                    <Label>Status :</Label>
                    <Input bsSize="sm"  type="select" name="LOCN_STATUS" id="LOCN_STATUS" value={dataLocID.LOCN_STATUS}  onChange={props.onChange}   style={{ backgroundColor : backgcolor}} >
                        <option value="">Please select</option>
                        <option value="Active">Active</option>
                        <option value="Not Active">Not Active</option>
                      </Input>
                    <Label>Description :</Label>
                    <Input bsSize="sm"  type="textarea" rows="4" id="LOCN_DESC" name="LOCN_DESC" value={dataLocID.LOCN_DESC} onChange={props.onChange} style={{ backgroundColor : backgcolor}} />
                </Col>
             </Row> 
                </CardBody>
                 </Card>
                 <div className="form-button">
                            <Row style={{ marginBottom: '20px' }}>
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
                                  <Button color="warning" type='reset' hidden={props.btnReset} onClick={handleResetData} >
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
      site: state.site
    };
  };
  
  const mapDispachToProps = dispatch => {
    return {
  
        fetchSite: () => dispatch({ type: "FETCH_DCSITE"}),
    
    };
  };

export default connect(mapStateToProps,mapDispachToProps)(FormLocation);