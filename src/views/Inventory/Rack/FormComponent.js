import React, { Component, useState, useEffect } from 'react';
import { Badge, Button, Card, CardBody, CardFooter, CardHeader, Col, Form, FormGroup, Label, Row, Input } from 'reactstrap';
import '../css/style.css';
import { connect } from "react-redux";
import 'date-fns';
import CableRack from './addCableid';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker } from '@material-ui/pickers';
import { makeStyles, useTheme, FormHelperText, Select, MenuItem, Chip,FormControl, InputLabel } from '@material-ui/core';

const FormRack = (props) => {

    const [backgcolor, setbackgcolor] = useState("#b3d9ff");
    const [actionForm, setactionForm] = useState(props.actionForm);
    const [actionCreateBtn, setactionCreateBtn] = useState(false);
    const [actionSaveBtn, setactionSaveBtn] = useState(false);
    const [RackIdFlag, setRackIdFlag] = useState(true);
    const [optionSite, setOptionSite] = useState([]);
    const [optionLocation, setoptionLocation] = useState({});
    const [borderColor, setBorderColor] = useState("");
    const [siteErrorMsg, setSiteErrorMsg]= useState("");
    const [locErrorMsg, setLocErrorMsg]= useState("");
    const [RackNoErrorMsg, setRackNoErrorMsg] = useState("");
    const [dataRack, setdataRack] = useState({});
    const [selectedCommDate, setSelectedCommDate] = useState(null)
    const [selectedDecommDate, setSelectedDecommDate] = useState(null)

  
    useEffect(() => {
        console.log('propsForm', props);

        var siteExist = Object.values(props.site).filter((site)=> site.SITE_VERIFIED_TAG === 'Y')
        //console.log('siteExist',siteExist);
        setOptionSite(siteExist)


        if (actionForm == 'CREATE') {
            setactionSaveBtn(true);
            setoptionLocation(props.optionLocation)
        }
        if (actionForm == 'EDIT') {

            setactionCreateBtn(true);
            setRackIdFlag(false);
            setdataRack(props.dataRack);
            if(props.dataRack){
                setSelectedCommDate(props.dataRack.RACK_COMM_DT);
            }
            if(props.dataRack){
                setSelectedDecommDate(props.dataRack.RACK_DECOMM_DT);
            }
           
            //getRackDetail();
        }

            

    }, [props]);

    useEffect(()=>{

        props.fetchSite();
        var siteExist = Object.values(props.site).filter((site)=> site.SITE_VERIFIED_TAG === 'Y')
        //console.log('siteExist',siteExist);
        setOptionSite(siteExist)

    },[]);

    const handleBackBtn =() =>{
        window.history.back();
    }

   

    return (<div className="animated fadeIn">
      <Row>
<Col xs='12'>
    <Card>
        <CardHeader>Rack <strong>({actionForm})</strong></CardHeader>
        <Form name="formRack" id="formRack" onSubmit={props.onSubmit}>
            <CardBody>
                <Row style={{ marginLeft: '250px' }}>
                    <Col xs='4'>
                        <FormGroup  error={props.hasError1}>
                            <Label >DC Site</Label>
                            <Input type="select" name="SITE_NAME" id="SITE_NAME" onChange={props.onChange} style={{ backgroundColor : backgcolor, border: borderColor}} >
                            {/* <option value="">Please select</option> */}
                            {/*loop Dc site*/}
                            {    optionSite ? 
                                    optionSite.map(function(lov,index) {
                                    return <option key={index} value={lov.SITE_NAME}>{lov.SITE_NAME}</option>
                                    })
                                    :
                                    // dataRack.site.map(function(lov,index) {
                                    //   return <option key={index} value={dataRack.SITE_NAME}>{dataRack.SITE_NAME}</option>
                                    // })
                                    <option key='id' value={dataRack.SITE_NAME}>{dataRack.SITE_NAME}</option>
                                   
                            }  
                            </Input>
                            {props.hasError1 && <FormHelperText style={{color: 'red'}}>This is required!</FormHelperText>}
                            </FormGroup>
                            <FormGroup  error={props.hasError2}>
                            <Label >DC Location</Label>
                            <Input type="select" name="LOCN_NAME" id="LOCN_NAME" onChange={props.onChange} style={{ backgroundColor:  backgcolor, border: borderColor}}>
                            {/* <option value="">Please select</option> */}
                             {/*loop Dc Loction based on selected dc site*/}
                            {    optionLocation.loc ? 
                                    optionLocation.loc.map(function(lov,index) {
                                    return <option key={index} value={lov.LOCN_NAME}>{lov.LOCN_NAME}</option>
                                    })
                                    : 
                                    // dataRack.map(function(lov,index) {
                                    //     return <option key={index} value={lov.LOCATION_NAME}>{lov.LOCATION_NAME}</option>
                                    //     })
                                    <option key='id' value={dataRack.LOCATION_NAME}>{dataRack.LOCATION_NAME}</option>
                                    
                            }  
                            </Input>
                            {props.hasError2 && <FormHelperText style={{color: 'red'}}>This is required!</FormHelperText>}
                        </FormGroup>
                    </Col>
                    <Col xs='4'>
                        <FormGroup  error={props.hasError3}>
                        <Label>Room</Label>
                        <Input type="text" id="RACK_ROOM" name="RACK_ROOM" value={dataRack.RACK_ROOM} onChange={props.onChange} style={{ backgroundColor: backgcolor, border: borderColor  }} />
                        {props.hasError3 && <FormHelperText style={{color: 'red'}}>This is required!</FormHelperText>}
                      </FormGroup>
                    </Col>
                </Row>
                <Card>
                    <CardBody>
                        <Row>
                            <Col xs='3'>
                                <FormGroup hidden={props.hideRackID}>
                                <Label>Rack ID</Label>
                                <Input type="text" value={dataRack.RACK_ID} style={{ backgroundColor: backgcolor}}/>
                                </FormGroup>
                                <FormGroup>
                                <Label>Rack No</Label>
                                <Input type="text" id="RACK_NO" name="RACK_NO" value={dataRack.RACK_NO} onChange={props.onChange} style={{ backgroundColor: backgcolor, border: borderColor }} />
                                </FormGroup>
                                <FormGroup>
                                <Label>Rack Type</Label>
                                <Input type="text" id="RACK_TYPE" name="RACK_TYPE" value={dataRack.RACK_TYPE} onChange={props.onChange} style={{ backgroundColor: backgcolor }} />
                                </FormGroup>
                                <FormGroup>
                                <Label>Rack Size</Label>
                                <Input type="text" id="RACK_SIZE" name="RACK_SIZE" value={dataRack.RACK_SIZE} onChange={props.onChange} style={{ backgroundColor: backgcolor }} />
                                </FormGroup>
                            </Col>
                            <Col xs='3'>
                                <Label>Power Density</Label>
                                <Input type="select" name="RACK_POWER_DENSITY" id="RACK_POWER_DENSITY" value={dataRack.RACK_POWER_DENSITY} onChange={props.onChange} style={{ backgroundColor: backgcolor }}>
                                    <option value="">Please select</option>
                                    <option value="1.5">1.5</option>
                                    <option value="3.0">3.0</option>
                                    <option value="5.0">5.0</option>
                                    <option value="7.0">7.0</option>
                                    <option value="10.0">10.0</option>
                                </Input>
                                <Label>Breaker Type</Label>
                                <Input type="select" name="RACK_BREAKER_TYPE" id="RACK_BREAKER_TYPE" value={dataRack.RACK_BREAKER_TYPE} onChange={props.onChange} style={{ backgroundColor: backgcolor }}>
                                    <option value="">Please select</option>
                                    <option value="16">16</option>
                                </Input>
                                <Label>Power Phase</Label>
                                <Input type="select" name="RACK_POWER_PHASE" id="RACK_POWER_PHASE" value={dataRack.RACK_POWER_PHASE} onChange={props.onChange} style={{ backgroundColor: backgcolor }}>
                                    <option value="">Please select</option>
                                    <option value="Single">Single</option>
                                </Input>
                                <CableRack value={dataRack.RACK_CABLE_ID} actionType={actionForm}/>
                            </Col>
                            <Col xs='3'>
                                <Label>PDU A</Label>
                                <Input type="text" id="RACK_PDU_A" name="RACK_PDU_A" value={dataRack.RACK_PDU_A} onChange={props.onChange} style={{ backgroundColor: backgcolor }} />
                                <Label>PDU B</Label>
                                <Input type="text" id="RACK_PDU_B" name="RACK_PDU_B" value={dataRack.RACK_PDU_B} onChange={props.onChange} style={{ backgroundColor: backgcolor }} />
                                <Label>Source A</Label>
                                <Input type="text" id="RACK_SOURCE_A" name="RACK_SOURCE_A" value={dataRack.RACK_SOURCE_A} onChange={props.onChange} style={{ backgroundColor: backgcolor }} />
                                <Label>Source B</Label>
                                <Input type="text" id="RACK_SOURCE_B" name="RACK_SOURCE_B" value={dataRack.RACK_SOURCE_B} onChange={props.onChange} style={{ backgroundColor: backgcolor }} />
                                <Label>Power Pre-Laid</Label>
                                <Input type="select" name="RACK_POWER_PRELAID" id="RACK_POWER_PRELAID" value={dataRack.RACK_POWER_PRELAID} onChange={props.onChange} style={{ backgroundColor: backgcolor }}>
                                    <option value="">Please select</option>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                </Input>
                                <Label>Cabling Pre-Laid</Label>
                                <Input type="select" name="RACK_CABLING_PRELAID" id="RACK_CABLING_PRELAID" value={dataRack.RACK_CABLING_PRELAID} onChange={props.onChange} style={{ backgroundColor: backgcolor }}>
                                    <option value="">Please select</option>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                </Input>
                            </Col>
                            <Col xs='3'>
                                <Label>Status</Label>
                                <Input type="select" name="RACK_STATUS" id="RACK_STATUS" value={dataRack.RACK_STATUS} onChange={props.onChange} style={{ backgroundColor: backgcolor }}>
                                    <option value="">Please select</option>
                                    <option value="Registered">Registered</option>
                                    <option value="Unoccupied">Unoccupied</option>
                                </Input>
                                <Label>Description</Label>
                                <Input type="textarea" size="6" id="RACK_DESC" name="RACK_DESC" value={dataRack.RACK_DESC} onChange={props.onChange} style={{ backgroundColor: backgcolor }} />
                                <Label>Commission Date :</Label>
                                <FormGroup  error={props.hasError4}>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    helperText={''} 
                                    id="RACK_COMM_DT" 
                                    name="RACK_COMM_DT"
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
                                {props.hasError4 && <FormHelperText style={{color: 'red'}}>This is required!</FormHelperText>}
                                </FormGroup>
                                <FormGroup  hidden={props.flagDecommDate}>
                                <Label>Decommission Date :</Label>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    helperText={''} 
                                    id="RACK_DECOMM_DT" 
                                    name="RACK_DECOMM_DT"
                                    margin="normal"
                                    //id="date-picker-dialog"
                                    //label="Decommission Date"
                                    margin="normal"
                                    placeholder="dd/mm/yyyy"
                                    format="dd/MM/yyyy"
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
                    </CardBody>
                </Card>
            </CardBody>
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
                        <Button color="warning" type='reset' hidden={props.btnReset}>
                            <i className="fa fa-refresh"></i>&nbsp; Reset
                        </Button>
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
  
        fetchSite: () => dispatch({ type: "FETCH_DCSITE"}),
    
    };
  };
export default connect(mapStateToProps,mapDispachToProps)(FormRack);