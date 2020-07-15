import React, { Component, useState, useEffect } from 'react';
import { Badge, Button, Card, CardBody, CardFooter, CardHeader, Col, Form, FormGroup, Label, Row, Input, Collapse, Fade } from 'reactstrap';
import '../css/style.css';
import 'date-fns';
import auth from '../../../auth';
import Swal from 'sweetalert2';
import { connect } from "react-redux";
import axios from 'axios';
import { makeStyles, useTheme, TextField, Select, MenuItem, Chip ,Grid,FormHelperText} from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker } from '@material-ui/pickers';

 
const useStyles = makeStyles((theme) => ({
    // formControl: {
    //   margin: theme.spacing(1),
    //   minWidth: 120,
    //   maxWidth: 300,
    // },
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
    const [selectedCommDate, setSelectedCommDate] = useState(null)
    const [selectedDecommDate, setSelectedDecommDate] = useState(null)
    const [optionVerified, setOptionVerified] = useState([]);
    const [dataUSer, setDataUser] = useState([]);
    const [userWorkgroup, setUserWorkgroup] = useState([]);
    const [approverList, setapproverList] = useState([]);
    const classes = useStyles();
    const theme = useTheme();

    
  useEffect(() => {
    var username = auth.authenticated.username.toUpperCase();

    //get user(creator) detail
    fetch(`/claritybqm/reportFetch/?scriptName=DC_USER&userid=${username}`)
    .then(response => response.json())
    .then((user) => {
        //console.log('workgroup',user);
        getWorkgroup(user);
        
    })

    //get approver detail
    fetch('/claritybqm/reportFetch/?scriptName=DC_USER').
    then(response => response.json()).
    then((user) => {
      
        var approver = Object.values(user.user).filter(u => u.USER_APPROVE === 'Y');
        //console.log('filter',filter); 
        setapproverList(approver);
    })
    

  },[]);

    useEffect(() => {
        console.log('propsFormComponent', props);
        //console.log('propsFormComponenStatet', PostcodeErrorMsg);

        if (actionForm == 'CREATE') {
            setActionSaveBtn(true);
            
        }
        if (actionForm == 'EDIT') {

            setActionCreateBtn(true);
            setSideIDFlag(false);
            //getRackDetail();
        }


    }, [props]);

    const getWorkgroup = (user) => {
        
        if(user){
            console.log('dataUSer',user.workgroups);
        }
        
    }


    const handleBackBtn = () => {
        window.history.back();
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
                                <Grid item>
                                <Card>
                                    <CardBody>
                                         <Row>
                                            <Col xs="4">
                                                <FormGroup hidden={SideIDFlag}>
                                                    <Label>DC Site ID</Label>
                                                    <Input type="text" id="SITE_ID" name="SITE_ID" defaultValue={props.siteID} style={{ backgroundColor: backgcolor }} readOnly/>
                                                </FormGroup>
                                                <FormGroup error={props.hasError1} >
                                                    <Label>DC Site</Label>
                                                    <Input type="text" id="SITE_NAME" name="SITE_NAME" value={props.data.SITE_NAME} onChange={props.onChange} style={{ backgroundColor: backgcolor, border: borderColor }} />
                                                    {props.hasError1 && <FormHelperText style={{color: 'red'}}>This is required!</FormHelperText>}
                                                </FormGroup>
                                                </Col>
                                            </Row>
                                            <Row>
                                            <Col xs="6">
                                            {/* <Fade timeout={timeout} in={fadeIn}> */}
                                                <Card>
                                                    <CardHeader>Address Details: <font color="red">*</font>
                                                    {/* <div className="card-header-actions"> */}
                                                            {/*eslint-disable-next-line*/}
                                                            {/* <a className="card-header-action btn btn-minimize" data-target="#collapseAddressDetails" onClick={toggle}><i className={iconCollapse}></i></a>
                                                        </div> */}
                                                    </CardHeader>
                                                    {/* <Collapse isOpen={collapse} id="collapseAddressDetails"> */}
                                                    <CardBody>
                                                        <Row style={{marginLeft: '5px'}}>
                                                        <Col>
                                                        <FormGroup>
                                                            <Label>House No.</Label>
                                                            <Input type="text" id="ADDE_NO" name="ADDE_NO" value={props.data.ADDE_NO } onChange={props.onChange} style={{ backgroundColor: backgcolor }} />
                                                        </FormGroup>
                                                        </Col>
                                                        <Col>
                                                        <FormGroup>
                                                            <Label>Floor No.</Label>
                                                            <Input type="text" id="ADDE_FLOOR" name="ADDE_FLOOR" value={props.data.ADDE_FLOOR } onChange={props.onChange} style={{ backgroundColor: backgcolor }} />
                                                        </FormGroup>
                                                        </Col>
                                                        <Col>
                                                        <FormGroup>
                                                            <Label>Street Type</Label>
                                                            <Input type="select" 
                                                            id="ADDE_STTYPE" 
                                                            name="ADDE_STTYPE" value={props.data.ADDE_STTYPE } 
                                                            onChange={props.onChange} 
                                                            style={{ backgroundColor: backgcolor }} 
                                                            >
                                                                 <option id="null" value="">Select Street Type</option>
                                                            {
                                                                props.LovStreeType ? props.LovStreeType.map((d)=>{
                                                                     return(<option id={d.LOV_VALUE} value={d.LOV_DESC}>{d.LOV_DESC}</option>)
                                                                })
                                                                :
                                                                <option id="None" value="">None</option>
                                                            }
                                                            </Input>
                                                        </FormGroup>
                                                        </Col>
                                                        </Row>
                                                        <Col>
                                                        <FormGroup>
                                                            <Label>Street Name</Label>
                                                            <Input type="text" id="ADDE_STNAME" name="ADDE_STNAME" value={props.data.ADDE_STNAME } onChange={props.onChange} style={{ backgroundColor: backgcolor }} />
                                                        </FormGroup>
                                                        </Col>
                                                        <Col>
                                                        <FormGroup>
                                                            <Label>Building No.</Label>
                                                            <Input type="text" id="ADDE_BUILDING" name="ADDE_BUILDING" value={props.data.ADDE_BUILDING } onChange={props.onChange} style={{ backgroundColor: backgcolor }} />
                                                        </FormGroup>
                                                        </Col>
                                                        <Col>
                                                        <FormGroup>
                                                            <Label>Section</Label>
                                                            <Input type="text" id="ADDE_SECTION" name="ADDE_SECTION" value={props.data.ADDE_SECTION} onChange={props.onChange} style={{ backgroundColor: backgcolor }} />
                                                        </FormGroup>
                                                        </Col>
                                                        <Row style={{marginLeft: '5px'}}>
                                                        <Col>
                                                        <FormGroup error={props.hasError2} >
                                                            <Label>Postcode</Label>
                                                            <Input type="number" id="ADDE_POSTCODE" name="ADDE_POSTCODE" value={props.data.ADDE_POSTCODE} onChange={props.onChange} style={{ backgroundColor: backgcolor,}} />
                                                            {props.hasError2 && <FormHelperText style={{color: 'red'}}>This is required!</FormHelperText>}
                                                        </FormGroup>
                                                        </Col>
                                                        <Col>
                                                        <FormGroup>
                                                            <Label>City </Label>
                                                            <Input type="text" id="ADDE_CITY" name="ADDE_CITY" value={props.data.ADDE_CITY } onChange={props.onChange} style={{ backgroundColor: backgcolor }} />
                                                        </FormGroup>
                                                        </Col>
                                                        <Col>
                                                        <FormGroup error={props.hasError3} >
                                                            <Label>State</Label>
                                                            <Input type="select" 
                                                            id="ADDE_STATE" 
                                                            name="ADDE_STATE" 
                                                            value={props.data.ADDE_STATE } 
                                                            onChange={props.onChange} 
                                                            style={{ backgroundColor: backgcolor }} 
                                                            >
                                                              <option id="null" value="">Select State</option>
                                                            {
                                                                props.LovState ? props.LovState.map((d)=>{
                                                                     return(<option id={d.LOV_VALUE} value={d.LOV_DESC}>{d.LOV_DESC}</option>)
                                                                })
                                                                :
                                                                <option id="none" value="">None</option>
                                                            }
                                                            </Input>
                                                            {props.hasError3 && <FormHelperText style={{color: 'red'}}>This is required!</FormHelperText>}
                                                        </FormGroup>
                                                        </Col>
                                                        </Row>
                                                    </CardBody>
                                                    {/* </Collapse> */}
                                                </Card>
                                                {/* </Fade> */}
                                            </Col>
                                            <Col xs="2">
                                                <Label>Total Space Capacity</Label>
                                                <Input type="number" id="SITE_TOTAL_SPACE_CAP" name="SITE_TOTAL_SPACE_CAP" value={props.data.SITE_TOTAL_SPACE_CAP } onChange={props.onChange} style={{ backgroundColor: backgcolor }} />
                                                <Label>Total Power Capacity</Label>
                                                <Input type="number" id="SITE_TOTAL_POWER_CAP" name="SITE_TOTAL_POWER_CAP" value={props.data.SITE_TOTAL_POWER_CAP } onChange={props.onChange} style={{ backgroundColor: backgcolor }} />
                                                <Label>DC Manager</Label>
                                                <Input type="text" id="SITE_MGR" name="SITE_MGR" value={props.data.SITE_MGR } onChange={props.onChange} style={{ backgroundColor: backgcolor }} />
                                                <Label>Telephone No.</Label>
                                                <Input type="telephone" id="SITE_MGR_NO" name="SITE_MGR_NO" value={props.data.SITE_MGR_NO} onChange={props.onChange} style={{ backgroundColor: backgcolor }} />
                                                <FormGroup error={props.hasError4} >
                                                <Label>Commission Date</Label>
                                                   <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                    <KeyboardDatePicker
                                                        id="SITE_COMM_DT" 
                                                        name="SITE_COMM_DT"
                                                        margin="normal"
                                                        //id="date-picker-dialog"
                                                        //filterDate={date => date.getDay() !== 6 && date.getDay() !== 0}
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
                                                    {props.hasError4 && <FormHelperText style={{color: 'red'}}>This is required!</FormHelperText>}
                                                 </FormGroup>
                                                 <FormGroup  hidden={props.flagDecommDate}>
                                                 <Label>Decommission Date</Label>
                                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                    <KeyboardDatePicker
                                                        id="SITE_DECOMM_DT" 
                                                        name="SITE_DECOMM_DT"
                                                        margin="normal"
                                                        //id="date-picker-dialog"
                                                       // label="Decommission Date"
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
                                            <Col xs='4'>
                                            <Label>Status</Label>
                                                <Input type="select" name="SITE_STATUS" id="SITE_STATUS" value={props.data.SITE_STATUS } onChange={props.onChange} style={{ backgroundColor: backgcolor }} >
                                                    <option value="">Please select</option>
                                                    <option value="Active">Active</option>
                                                    <option value="Not Active">Not Active</option>
                                                    <option value="KIV">KIV</option>
                                                </Input>
                                                <Label>Description</Label>
                                                <Input type="textarea" rows="4" id="SITE_DESC" name="SITE_DESC" value={props.data.SITE_DESC } onChange={props.onChange} style={{ backgroundColor: backgcolor }} />
                                                <Label>Verified by:</Label><br/>
                                                <FormGroup className={classes.formControl} error={props.hasError5}>
                                                    <Select
                                                        //labelId="demo-mutiple-name-label"
                                                        id="SITE_VERIFIED_BY"
                                                        name="SITE_VERIFIED_BY"
                                                        label="Verified by"
                                                        //multiple
                                                        value={optionVerified}
                                                        onChange={handleChange}
                                                        //input={<Input />}
                                                        MenuProps={MenuProps}
                                                        fullWidth
                                                        renderValue={(selected) => (
                                                            <MenuItem key={selected} value={selected}>{selected}</MenuItem>
                                                          )}
                                                        >
                                                        { approverList ?
                                                            approverList.map((user) => (
                                                            <MenuItem key={user.ID} value={user.ID} classes={{ selected: classes.selected }} style={getStyles(user.NAME, optionVerified, theme)}>
                                                            {user.NAME}
                                                            </MenuItem>
                                                        ))
                                                        :
                                                        <MenuItem key="null" value="null">Select Verified by</MenuItem>
                                                    }
                                                    </Select>
                                                    {props.hasError5 && <FormHelperText style={{color: 'red'}}>This is required!</FormHelperText>}
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                    </CardBody>
                                </Card>
                                </Grid>
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
        site: state.site
    };
};

const mapDispachToProps = dispatch => {
    return {

        fetchSite: () => dispatch({ type: "FETCH_DCSITE" }),

    };
};


export default connect(mapStateToProps, mapDispachToProps)(FormDCSite);