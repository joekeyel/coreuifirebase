import React, { Component, useState, useEffect } from 'react';
import { Badge, Button, Card, CardBody, CardFooter, CardHeader, Col, Form, FormGroup, Label, Row, Input, Collapse, Fade } from 'reactstrap';
import '../css/style.css';
import $ from 'jquery';
import auth from '../../../auth';
import Swal from 'sweetalert2';
import { connect } from "react-redux";
import axios from 'axios';
import { makeStyles, useTheme, TextField, Select, MenuItem, Chip } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker } from '@material-ui/pickers';


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
  
  // verified field option array
  const workgroupOption = [
    'DC PROD',
    'OTM',
    'PM',
    'TM ONE',
  ];
  
  function getStyles(name, optionVerified, theme) {
    return {
      fontWeight:
      optionVerified.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

const FormDCSite = (props) => {

    const [backgcolor, setbackgcolor] = useState("#b3d9ff");
    const [actionForm, setactionForm] = useState(props.actionForm);
    const [actionCreateBtn, setActionCreateBtn] = useState(false);
    const [actionSaveBtn, setActionSaveBtn] = useState(false);
    const [SideIDFlag, setSideIDFlag] = useState(true);
    const [borderColor, setBorderColor] = useState('');
    const [borderColorPostcode, setborderColorPostcode] = useState('');
    const [siteErrorMsg, setSiteErrorMsg] = useState('');
    const [PostcodeErrorMsg, setPostcodeErrorMsg] = useState("");
    const [timeout, setTimeout] = useState(300);
    const [fadeIn, setFadeIn] = useState(true);
    const [collapse, setcollapse] = useState(false);
    const [iconCollapse, setIconCollapse] = useState("icon-arrow-down");
    const [flagSubmit, setflagSubmit] = useState(props.flagSubmit);
    const [selectedCommDate, setSelectedCommDate] = useState(null)
    const [selectedDecommDate, setSelectedDecommDate] = useState(null)
    const [optionVerified, setOptionVerified] = useState([]);
    const classes = useStyles();
    const theme = useTheme();

    useEffect(() => {

        console.log('propsFormComponent', props);
        //console.log('propsFormComponenStatet', PostcodeErrorMsg);

        if (actionForm == 'CREATE') {
            setActionSaveBtn(true);
            if(props.formIsValid === true && flagSubmit === true){
                setcollapse(props.validateStyle.collapse);
                createSite(props.data);
            }
            setBorderColor(props.validateStyle.borderColor);
            setSiteErrorMsg(props.validateStyle.siteErrorMsg);
            setPostcodeErrorMsg(props.validateStyle.PostcodeErrorMsg);
            setborderColorPostcode(props.validateStyle.borderColorPostcode);
        }
        if (actionForm == 'EDIT') {

            setActionCreateBtn(true);
            setSideIDFlag(false);
            //getRackDetail();
        }


    }, [props]);

    const createSite = (formValues) =>{
        //setflagSubmit(false);
        console.log('createSite',formValues);

        Swal.fire({
            text: 'Are you sure to Create this DCSite ' + formValues.SITE_NAME + '?',
        }).then((result) => {

            if(result.value){
                axios.post('/claritybqm/reportFetchJ/?scriptName=DC_SITE_CREATE', formValues
                ).then((res) => {
                  //console.log('success to create : ', res.data);   
                    if(res.data == "success"){
                      this.setState({ openSnackBar: true, alertMsg: 'Data has been Crerated.' });
                    }
        
                })
                .catch((err) => {
                  console.log('failed to create : ', err);
                });
          
            }

        })
        
    }

    const handleBackBtn = () => {
        window.history.back();
    }

    const toggle = ()  =>{
        setcollapse(!collapse);
        if(collapse == true){
            setIconCollapse("icon-arrow-down")
        }
        if(collapse == false){
            setIconCollapse("icon-arrow-up")
        }
        //setIconCollapse("icon-arrow-up")
      }
    
    const handleChange = (event) => {
        setOptionVerified(event.target.value);
        };
    
    return (
        <div className="animated fadeIn" >
            <Row>
                <Col xs="12">
                    <Card>
                        <Form id="formSite" onSubmit={props.onSubmit}>
                            <CardHeader>
                                DC Site(<strong>{actionForm}</strong>)
                    {/* <small> Form</small> */}
                            </CardHeader>
                            <CardBody>
                                <Card>
                                    <CardBody>
                                        <Row>
                                            <Col xs="4">
                                                <FormGroup hidden={SideIDFlag}>
                                                    <Label>DC Site ID :</Label>
                                                    <Input type="text" id="SITE_ID" name="SITE_ID" defaultValue={props.siteID} style={{ backgroundColor: backgcolor }} readOnly/>
                                                </FormGroup>
                                                <FormGroup>
                                                    <Label>DC Site :</Label>
                                                    <Input type="text" id="SITE_NAME" name="SITE_NAME" value={props.data.SITE_NAME} onChange={props.onChange} style={{ backgroundColor: backgcolor, border: borderColor }} />
                                                    <span style={{ color: "red" }}>{siteErrorMsg}</span>
                                                </FormGroup>
                                            <Fade timeout={timeout} in={fadeIn}>
                                                <Card>
                                                    <CardHeader>Address Details: <font color="red">*</font>
                                                    <div className="card-header-actions">
                                                            {/*eslint-disable-next-line*/}
                                                            <a className="card-header-action btn btn-minimize" data-target="#collapseAddressDetails" onClick={toggle}><i className={iconCollapse}></i></a>
                                                        </div>
                                                    </CardHeader>
                                                    <Collapse isOpen={collapse} id="collapseAddressDetails">
                                                    <CardBody>
                                                        <FormGroup>
                                                            <Label>House No. :</Label>
                                                            <Input type="text" id="ADDE_NO" name="ADDE_NO" value={props.data.ADDE_NO } onChange={props.onChange} style={{ backgroundColor: backgcolor }} />
                                                        </FormGroup>
                                                        <FormGroup>
                                                            <Label>Floor No. :</Label>
                                                            <Input type="text" id="ADDE_FLOOR" name="ADDE_FLOOR" value={props.data.ADDE_FLOOR } onChange={props.onChange} style={{ backgroundColor: backgcolor }} />
                                                        </FormGroup>
                                                        <FormGroup>
                                                            <Label>Building No. :</Label>
                                                            <Input type="text" id="ADDE_BUILDING" name="ADDE_BUILDING" value={props.data.ADDE_BUILDING } onChange={props.onChange} style={{ backgroundColor: backgcolor }} />
                                                        </FormGroup>
                                                        <FormGroup>
                                                            <Label>Street Type :</Label>
                                                            <Input type="text" id="ADDE_STTYPE" name="ADDE_STTYPE" value={props.data.ADDE_STTYPE } onChange={props.onChange} style={{ backgroundColor: backgcolor }} />
                                                        </FormGroup>
                                                        <FormGroup>
                                                            <Label>Street Name :</Label>
                                                            <Input type="text" id="ADDE_STNAME" name="ADDE_STNAME" value={props.data.ADDE_STNAME } onChange={props.onChange} style={{ backgroundColor: backgcolor }} />
                                                        </FormGroup>
                                                        <FormGroup>
                                                            <Label>Section :</Label>
                                                            <Input type="text" id="ADDE_SECTION" name="ADDE_SECTION" value={props.data.ADDE_SECTION} onChange={props.onChange} style={{ backgroundColor: backgcolor }} />
                                                        </FormGroup>
                                                        <FormGroup>
                                                            <Label>Postcode :</Label>
                                                            <Input type="text" id="ADDE_POSTCODE" name="ADDE_POSTCODE" value={props.data.ADDE_POSTCODE} onChange={props.onChange} style={{ backgroundColor: backgcolor,border : borderColorPostcode }} />
                                                            <span style={{ color: "red" }}>{PostcodeErrorMsg}</span>
                                                        </FormGroup>
                                                        <FormGroup>
                                                            <Label>City  :</Label>
                                                            <Input type="text" id="ADDE_CITY" name="ADDE_CITY" value={props.data.ADDE_CITY } onChange={props.onChange} style={{ backgroundColor: backgcolor }} />
                                                        </FormGroup>
                                                        <FormGroup>
                                                            <Label>State :</Label>
                                                            <Input type="text" id="ADDE_STATE" name="ADDE_STATE" value={props.data.ADDE_STATE } onChange={props.onChange} style={{ backgroundColor: backgcolor }} />
                                                        </FormGroup>
                                                    </CardBody>
                                                    </Collapse>
                                                </Card>
                                                </Fade>
                                            </Col>
                                            <Col xs="4">
                                                <Label>Total Space Capacity :</Label>
                                                <Input type="text" id="SITE_TOTAL_SPACE_CAP" name="SITE_TOTAL_SPACE_CAP" value={props.data.SITE_TOTAL_SPACE_CAP } onChange={props.onChange} style={{ backgroundColor: backgcolor }} />
                                                <Label>Total Power Capacity :</Label>
                                                <Input type="text" id="SITE_TOTAL_POWER_CAP" name="SITE_TOTAL_POWER_CAP" value={props.data.SITE_TOTAL_POWER_CAP } onChange={props.onChange} style={{ backgroundColor: backgcolor }} />
                                                <Label>DC Manager :</Label>
                                                <Input type="text" id="SITE_MGR" name="SITE_MGR" value={props.data.SITE_MGR } onChange={props.onChange} style={{ backgroundColor: backgcolor }} />
                                                <Label>Telephone No. :</Label>
                                                <Input type="text" id="SITE_MGR_NO" name="SITE_MGR_NO" value={props.data.SITE_MGR_NO} onChange={props.onChange} style={{ backgroundColor: backgcolor }} />
                                                <FormGroup>
                                                   <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                    <KeyboardDatePicker
                                                        id="SITE_COMM_DT" 
                                                        name="SITE_COMM_DT"
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
                                                        id="SITE_DECOMM_DT" 
                                                        name="SITE_DECOMM_DT"
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
                                            </Col>
                                            <Col xs="4">
                                                <Label>Status :</Label>
                                                <Input type="select" name="SITE_STATUS" id="SITE_STATUS" value={props.data.SITE_STATUS } onChange={props.onChange} style={{ backgroundColor: backgcolor }} >
                                                    <option value="">Please select</option>
                                                    <option value="Active">Active</option>
                                                    <option value="Not Active">Not Active</option>
                                                    <option value="KIV">KIV</option>
                                                </Input>
                                                <Label>Description :</Label>
                                                <Input type="textarea" rows="4" id="SITE_DESC" name="SITE_DESC" value={props.data.SITE_DESC } onChange={props.onChange} style={{ backgroundColor: backgcolor }} />
                                                <Label>Verified By (workgroup):</Label><br/>
                                                {/* <Input type="text" id="SITE_VERIFIED_BY" name="SITE_VERIFIED_BY" value={props.data.SITE_VERIFIED_BY } onChange={props.onChange} style={{ backgroundColor: backgcolor }} /> */}
                                                <FormGroup className={classes.formControl}>
                                                    <Select
                                                        //labelId="demo-mutiple-name-label"
                                                        id="demo-mutiple-name"
                                                        name="SITE_VERIFIED_BY"
                                                        label="Verified by (workgroup)"
                                                        multiple
                                                        value={optionVerified}
                                                        onChange={handleChange}
                                                        //input={<Input />}
                                                        MenuProps={MenuProps}
                                                        fullWidth
                                                        renderValue={(selected) => (
                                                            <div className={classes.chips}>
                                                              {selected.map((value) => (
                                                                <Chip key={value} label={value} className={classes.chip} />
                                                              ))}
                                                            </div>
                                                          )}
                                                        >
                                                        {workgroupOption.map((name) => (
                                                            <MenuItem key={name} value={name} classes={{ selected: classes.selected }} style={getStyles(name, optionVerified, theme)}>
                                                            {name}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                    </CardBody>
                                </Card>
                            </CardBody>
                            <div className="form-button">
                                <Row style={{ marginBottom: '20px' }}>
                                    <Col>
                                        <Button color="info" onClick={handleBackBtn}>
                                            <i className="fa fa-history"></i>&nbsp; Back</Button>
                                        &nbsp;&nbsp;&nbsp;
                                        <Button color="primary" type="submit" hidden={actionCreateBtn}>
                                            <i className="fa fa-plus"></i>&nbsp; Create </Button>
                                        &nbsp;
                                        <Button color="primary" type="submit" hidden={actionSaveBtn}>
                                            <i className="fa fa-save"></i>&nbsp; Save </Button
                                        >&nbsp;
                                        <Button color="success" type="submit" >
                                            <i className="fa fa-send"></i>&nbsp; Submit </Button>
                                    </Col>
                                </Row>
                            </div>
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

        fetchSite: () => dispatch({ type: "FETCH_DCSITE" }),

    };
};


export default connect(mapStateToProps, mapDispachToProps)(FormDCSite);