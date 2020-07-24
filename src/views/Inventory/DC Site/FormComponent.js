import React, { Component, useState, useEffect } from 'react';
import { Badge, Button, Card, CardBody, CardFooter, CardHeader, Col, Form, FormGroup, Label, Row, Input, Collapse, Fade } from 'reactstrap';
import '../css/style.css';
import 'date-fns';
import auth from '../../../auth';
import Swal from 'sweetalert2';
import { connect } from "react-redux";
import axios from 'axios';
import { makeStyles, useTheme, TextField, Select, MenuItem, Chip ,Grid,FormHelperText,Switch,FormControlLabel } from '@material-ui/core';
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
    const [actionApproveBtn, setActionApproveBtn] = useState(false);
    const [actionDeleteBtn, setActionDeleteBtn] = useState(false);
    const [SideIDFlag, setSideIDFlag] = useState(true);
    const [borderColor, setBorderColor] = useState('');
    const [selectedCommDate, setSelectedCommDate] = useState(null)
    const [selectedDecommDate, setSelectedDecommDate] = useState(null)
    const [optionVerified, setOptionVerified] = useState([]);
    const [dataUSer, setDataUser] = useState([]);
    const [dataSite,setDataSite] = useState({});
    const [userWorkgroup, setUserWorkgroup] = useState([]);
    const [approverList, setapproverList] = useState([]);
    const [LovStreeType, setLovStreeType] = useState([]);
    const [LovState, setLovState] = useState([]);
    const classes = useStyles();
    const theme = useTheme();
    const [state, setState] = useState({
        SITE_VERIFIED_TAG: false,
      });
    

    
  useEffect(() => {
    var username = localStorage.getItem('username').toUpperCase();

    //get user(creator) detail
    fetch('/claritybqm/reportFetch/?scriptName=DC_USER&userid=' + username)
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
        //console.log('propsFormLocationComponent', props);
        if (actionForm === 'VIEW') {
            setActionSaveBtn(true);
            setActionCreateBtn(true);
            setActionDeleteBtn(true);
            setDataSite(props.data);
            if(props.approveFlag === false){
                setActionApproveBtn(true);
            }
            if(props.data){
                setSelectedCommDate(props.data.SITE_COMM_DT);
                setSelectedDecommDate(props.data.SITE_DECOMM_DT);   
        }  
        }
        if (actionForm === 'CREATE') {
            setActionSaveBtn(true);
            setActionDeleteBtn(true);
            setLovStreeType(props.LovStreeType);
            setLovState(props.LovState);
            if(props.approveFlag === false){
                setActionApproveBtn(true);
            }
        }
        if (actionForm === 'EDIT') {
            setSideIDFlag(false);
            setActionCreateBtn(true);
           //console.log('approveFlag',props.approveFlag);
            if(props.approveFlag === true){
                setActionSaveBtn(true);
                setActionApproveBtn(false);
            }

            if(props.approveFlag === false){
                setActionApproveBtn(true);
            }
            setDataSite(props.data);
            if(props.data.SITE_VERIFIED_TAG === 'Y' || props.values.SITE_VERIFIED_TAG === 'Y'){
                setState({SITE_VERIFIED_TAG: true})
            }
            if(props.data.SITE_VERIFIED_TAG === 'N' || props.values.SITE_VERIFIED_TAG === 'N'){
                setState({SITE_VERIFIED_TAG: false})
            }
            if(props.onChangeFlag === true){
                //console.log('dataUSer',props.values);
                setDataSite([props.values]);
                if(props.approvedSite === 'Y'){
                    setState({SITE_VERIFIED_TAG: true})
                }
                if(props.approvedSite === 'N'){
                    setState({SITE_VERIFIED_TAG: false})
                }
                
            }
            //console.log('dataUSer',props.data);
            if(props.data){
                    setSelectedCommDate(props.data.SITE_COMM_DT);
                    setSelectedDecommDate(props.data.SITE_DECOMM_DT);   
            }  
               
        }


    }, [props]);

    const getWorkgroup = (user) => {
        
      console.log('dataUSer',user.workgroups);
      setUserWorkgroup(user.workgroups)
        
    }

    const handleBackBtn = () => {
        window.history.back();
    }

    
    const getStreetType = () =>{

        axios.get('/claritybqm/reportFetch/?scriptName=DC_LOV&type=STREET_TYPE'
        ).then((res) => {
            //console.log('STREET_TYPE',res.data);
            setLovStreeType(res.data);
        })
        .catch((err) => {
          console.log('failed to create ', err);
        });

    }
    const getState= () =>{

        axios.get('/claritybqm/reportFetch/?scriptName=DC_LOV&type=STATE'
        ).then((res) => {
            //console.log('STREET_TYPE',res);
            setLovState(res.data);
        })
        .catch((err) => {
          console.log('failed to create ', err);
        });

    }
    const handleResetData = () => {

        setSelectedCommDate(null);
        setSelectedDecommDate(null);   

    }
    return (
        <div className="animated fadeIn" >
            <Row>
                <Col xs="12">
                    <Card>
                        <Form id="formSite" onSubmit={props.onSubmit}>
                            <CardHeader>
                                DC Site(<strong>{actionForm}</strong>)
                                <small><font color="red"> ( * ) is mandatoy field</font></small>
                            </CardHeader>
                            <CardBody>
                                <Grid item>
                                <Card>
                                    <CardBody>
                                         <Row>
                                            <Col xs="4">
                                                <FormGroup hidden={SideIDFlag}>
                                                    <Label>DC Site ID</Label>
                                                    <Input bsSize="sm"  type="text" id="SITE_ID" name="SITE_ID" defaultValue={props.siteID} style={{ backgroundColor: backgcolor }} readOnly/>
                                                </FormGroup>
                                                <FormGroup error={props.hasError1} >
                                                    <Label>DC Site</Label> <font color="red">*</font>
                                                    <Input bsSize="sm"  type="text" id="SITE_NAME" name="SITE_NAME" value={dataSite.SITE_NAME} onChange={props.onChange} style={{ backgroundColor: backgcolor, border: borderColor }} />
                                                    {props.hasError1 && <FormHelperText style={{color: 'red'}}>This is required!</FormHelperText>}
                                                </FormGroup>
                                                </Col>
                                            </Row>
                                            <Row >
                                            <Col xs="6">
                                            {/* <Fade timeout={timeout} in={fadeIn}> */}
                                                <Card>
                                                    <CardHeader>Address Details:
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
                                                            <Input bsSize="sm"  type="text" id="ADDE_NO" name="ADDE_NO" value={dataSite.ADDE_NO } onChange={props.onChange} style={{ backgroundColor: backgcolor }} />
                                                        </FormGroup>
                                                        </Col>
                                                        <Col>
                                                        <FormGroup>
                                                            <Label>Floor No.</Label>
                                                            <Input bsSize="sm"  type="text" id="ADDE_FLOOR" name="ADDE_FLOOR" value={dataSite.ADDE_FLOOR } onChange={props.onChange} style={{ backgroundColor: backgcolor }} />
                                                        </FormGroup>
                                                        </Col>
                                                        <Col>
                                                        <FormGroup onClick={getStreetType}>
                                                            <Label>Street Type</Label>
                                                            <Input bsSize="sm"  type="select" 
                                                            id="ADDE_STTYPE" 
                                                            name="ADDE_STTYPE" value={dataSite.ADDE_STTYPE } 
                                                            onChange={props.onChange} 
                                                            style={{ backgroundColor: backgcolor }} 
                                                            >
                                                                 <option id="null" value="">Select Street Type</option>
                                                            {
                                                                LovStreeType ? LovStreeType.map((d)=>{
                                                                     return(<option id={d.LOV_VALUE} value={d.LOV_DESC}>{d.LOV_DESC}</option>)
                                                                })
                                                                :
                                                                 <option id={props.data.ADDE_STTYPE} value={dataSite.ADDE_STTYPE}>{props.data.ADDE_STTYPE}</option>
                                                            }
                                                            </Input>
                                                        </FormGroup>
                                                        </Col>
                                                        </Row>
                                                        <Col>
                                                        <FormGroup>
                                                            <Label>Street Name</Label>
                                                            <Input bsSize="sm"  type="text" id="ADDE_STNAME" name="ADDE_STNAME" value={dataSite.ADDE_STNAME } onChange={props.onChange} style={{ backgroundColor: backgcolor }} />
                                                        </FormGroup>
                                                        </Col>
                                                        <Col>
                                                        <FormGroup>
                                                            <Label>Building No.</Label>
                                                            <Input bsSize="sm"  type="text" id="ADDE_BUILDING" name="ADDE_BUILDING" value={dataSite.ADDE_BUILDING } onChange={props.onChange} style={{ backgroundColor: backgcolor }} />
                                                        </FormGroup>
                                                        </Col>
                                                        <Col>
                                                        <FormGroup>
                                                            <Label>Section</Label>
                                                            <Input bsSize="sm"  type="text" id="ADDE_SECTION" name="ADDE_SECTION" value={dataSite.ADDE_SECTION} onChange={props.onChange} style={{ backgroundColor: backgcolor }} />
                                                        </FormGroup>
                                                        </Col>
                                                        <Row style={{marginLeft: '5px'}}>
                                                        <Col>
                                                        <FormGroup error={props.hasError2} >
                                                            <Label>Postcode</Label> <font color="red">*</font>
                                                            <Input bsSize="sm"  type="number" id="ADDE_POSTCODE" name="ADDE_POSTCODE" value={dataSite.ADDE_POSTCODE} onChange={props.onChange} style={{ backgroundColor: backgcolor,}} />
                                                            {props.hasError2 && <FormHelperText style={{color: 'red'}}>This is required!</FormHelperText>}
                                                        </FormGroup>
                                                        </Col>
                                                        <Col>
                                                        <FormGroup>
                                                            <Label>City </Label>
                                                            <Input bsSize="sm"  type="text" id="ADDE_CITY" name="ADDE_CITY" value={dataSite.ADDE_CITY } onChange={props.onChange} style={{ backgroundColor: backgcolor }} />
                                                        </FormGroup>
                                                        </Col>
                                                        </Row>
                                                        <Row style={{marginLeft: '5px'}}>
                                                        <Col>
                                                        <FormGroup error={props.hasError3} onClick={getState}>
                                                            <Label>State</Label> <font color="red">*</font>
                                                            <Input bsSize="sm"  
                                                            type="select" 
                                                            id="ADDE_STATE" 
                                                            name="ADDE_STATE" 
                                                            value={dataSite.ADDE_STATE } 
                                                            onChange={props.onChange} 
                                                            style={{ backgroundColor: backgcolor }} 
                                                            >
                                                             <option id={dataSite.ADDE_STATE} value={dataSite.ADDE_STATE}>{dataSite.ADDE_STATE}</option>
            
                                                            {
                                                                LovState ? LovState.map((d)=>{
                                                                     return(<option id={d.LOV_VALUE} value={d.LOV_DESC}>{d.LOV_DESC}</option>)
                                                                })
                                                                :
                                                                <option id="null" value="">Select State</option>
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
                                            <Col xs="3">
                                                <Label>Total Space Capacity</Label>
                                                <Input bsSize="sm"  type="number"  step="any" id="SITE_TOTAL_SPACE_CAP" name="SITE_TOTAL_SPACE_CAP" value={dataSite.SITE_TOTAL_SPACE_CAP } onChange={props.onChange} style={{ backgroundColor: backgcolor }} />
                                                <Label>Total Power Capacity</Label>
                                                <Input bsSize="sm"  type="number"  step="any" id="SITE_TOTAL_POWER_CAP" name="SITE_TOTAL_POWER_CAP" value={dataSite.SITE_TOTAL_POWER_CAP } onChange={props.onChange} style={{ backgroundColor: backgcolor }} />
                                                <Label>DC Manager</Label>
                                                <Input bsSize="sm"  type="text" id="SITE_MGR" name="SITE_MGR" value={dataSite.SITE_MGR } onChange={props.onChange} style={{ backgroundColor: backgcolor }} />
                                                <Label>Telephone No.</Label>
                                                <Input bsSize="sm"  type="telephone" id="SITE_MGR_NO" name="SITE_MGR_NO" value={dataSite.SITE_MGR_NO} onChange={props.onChange} style={{ backgroundColor: backgcolor }} />
                                                <FormGroup error={props.hasError4} >
                                                <Label>Commission Date</Label> <font color="red">*</font>
                                                   <MuiPickersUtilsProvider utils={DateFnsUtils} style={{fontSize: '8px'}}>
                                                    <KeyboardDatePicker
                                                        id="SITE_COMM_DT" 
                                                        name="SITE_COMM_DT"
                                                        margin="normal"
                                                        helperText={''}
                                                        //id="date-picker-dialog"
                                                        //filterDate={date => date.getDay() !== 6 && date.getDay() !== 0}
                                                        //label="Commission Date"
                                                        format="dd/MM/yyyy"
                                                        placeholder="dd/mm/yyyy"
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
                                                        helperText={''}
                                                        size="small"
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
                                            <Col xs='3'>
                                            <Label>Status</Label>
                                                <Input bsSize="sm"  type="select" name="SITE_STATUS" id="SITE_STATUS" value={dataSite.SITE_STATUS } onChange={props.onChange} style={{ backgroundColor: backgcolor }} >
                                                   {
                                                       actionForm === 'CREATE' ?
                                                       <option value="Pending Approval">Pending Approval</option>
                                                        :
                                                        actionForm === 'EDIT' && dataSite.SITE_VERIFIED_TAG === 'Y'  ?
                                                        <option value="Active">Active</option>
                                                        :
                                                        actionForm === 'EDIT' && dataSite.SITE_VERIFIED_TAG === 'N'  ?
                                                        <option value="Pending Approval">Pending Approval</option>
                                                        :
                                                        actionForm === 'EDIT' && dataSite.SITE_VERIFIED_TAG === ''  ?
                                                        <option value="Pending Approval">Pending Approval</option>
                                                        :
                                                        actionForm === 'EDIT' && dataSite.SITE_VERIFIED_TAG === 'Y' &&  dataSite.SITE_DECOMM_DT ?
                                                        <option value="Inactive">Inactive</option>
                                                        :
                                                        <option value="null">null</option>
                                                    }

                                                </Input>
                                                <Label>Description</Label>
                                                <Input bsSize="sm"  type="textarea" rows="4" id="SITE_DESC" name="SITE_DESC" value={dataSite.SITE_DESC} onChange={props.onChange} style={{ backgroundColor: backgcolor }} />
                                                <FormGroup className={classes.formControl} error={props.hasError5}>                                         
                                                <Label>Workgroup :</Label> <font color="red">*</font><br/>
                                                    <Input bsSize="sm"  
                                                     id="SITE_WORKGROUP"
                                                     name="SITE_WORKGROUP"
                                                     type="select"
                                                     style={{ backgroundColor: backgcolor }} 
                                                     onChange={props.onChange}
                                                     value={dataSite.SITE_WORKGROUP}
                                                     > 
                                                     {/* <option key='null' value="">Select Workgroup</option>   */}
                                                     {/* <option key="DCO1" value="DCO1">DCO1</option>
                                                     <option key="DCO2" value="DCO2">DCO2</option>
                                                     <option key="DCO3" value="DCO3">DCO3</option>
                                                     <option key="DCO4" value="DCO4">DCO41</option> */}
                                                     {
                                                         actionForm === 'CREATE' || dataSite.SITE_VERIFIED_TAG === 'N' ? 
                                                         userWorkgroup.map((wrg) => (
                                                            <option key={wrg} value={wrg}>
                                                            {wrg}
                                                            </option>
                                                        ))
                                                        :
                                                        <option key={dataSite.SITE_WORKGROUP} value={dataSite.SITE_WORKGROUP}>{dataSite.SITE_WORKGROUP}</option>
                                                        
                                                     }
                                                     </Input>
                                                     {props.hasError5 && <FormHelperText style={{color: 'red'}}>This is required!</FormHelperText>}
                                                </FormGroup>    
                                               <FormGroup hidden={props.flagVerified}>                                            
                                                <Label>Verified by:</Label>
                                                    <Input bsSize="sm"  
                                                     id="SITE_VERIFIED_BY"
                                                     name="SITE_VERIFIED_BY"
                                                     type="text"
                                                     style={{ backgroundColor: backgcolor }} 
                                                     onChange={props.onChange}
                                                     value={dataSite.SITE_VERIFIED_BY}
                                                     > 
                                                     {/* {
                                                        actionForm === 'CREATE' ?
                                                            approverList.map((user) => (
                                                            <option key={user.ID} value={user.NAME}>
                                                            {user.NAME}
                                                            </option>
                                                        ))
                                                        :
                                                        <option key={dataSite.SITE_VERIFIED_BY} value={dataSite.SITE_VERIFIED_BY}>{dataSite.SITE_VERIFIED_BY}</option>
                                                        
                                                    } */}
                                                     </Input>
                                                </FormGroup>
                                                {/* <FormControlLabel
                                                    hidden={props.flagApprover}
                                                    control={
                                                    <Switch
                                                        checked={state.SITE_VERIFIED_TAG}
                                                        onChange={props.onChange}///{handleChangeApprove}
                                                        id="SITE_VERIFIED_TAG"
                                                        name="SITE_VERIFIED_TAG"
                                                        color="primary"
                                                    />
                                                    }
                                                    label="Approve"
                                                /> */}
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
                                            <Button color="success" type="Approve" hidden={actionApproveBtn} id='SITE_VERIFIED_TAG' name='SITE_VERIFIED_TAG'>
                                                <i className="fa fa-check-circle"></i>&nbsp; Approve
                                            </Button>&nbsp;
                                            <Button color="danger" type="submit" id="delete" 
                                            onClick={(e)=> props.onSubmit(e,'delete')}
                                            hidden={actionDeleteBtn}>
                                                <i className="fa fa-trash"></i>&nbsp; Delete
                                            </Button>&nbsp;
                                            <Button color="warning" type='reset' onClick={handleResetData} 
                                            hidden={props.btnReset}>
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
        user: state.user
    };
};

const mapDispachToProps = dispatch => {
    return {

        fetchSite: () => dispatch({ type: "FETCH_DCSITE" }),

    };
};


export default connect(mapStateToProps, mapDispachToProps)(FormDCSite);