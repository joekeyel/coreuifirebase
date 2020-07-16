import React, { Component, useEffect, useState } from 'react';
import { Badge,Button,Card,Form, CardBody, CardFooter, CardHeader, Col, Input, Label,Row} from 'reactstrap';
import '../css/style.css';
import { connect } from "react-redux";
import { FormGroup } from '@material-ui/core';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker } from '@material-ui/pickers';
import { makeStyles, useTheme, FormHelperText, Select, MenuItem, Chip,FormControl, InputLabel } from '@material-ui/core';

const Bandwidth = (props) => {
  
  const [backgcolor, setbackgcolor] = useState("#b3d9ff");
  const [actionForm, setactionForm] = useState(props.actionForm);
  const [actionCreateBtn, setActionCreateBtn] = useState(false);
  const [actionSaveBtn, setActionSaveBtn] = useState(false);
  const [dcSite, setDcsite] = useState([]);
  const [bandData, setBandData] = useState(false);
  const [selectedCommDate, setSelectedCommDate] = useState(null)
  const [selectedDecommDate, setSelectedDecommDate] = useState(null)
  const [NtwIDFlag, setNtwIDFlag] = useState(true);

  useEffect(() => {

    if (actionForm === 'CREATE') {
        setActionSaveBtn(true);
    }
    if (actionForm === 'EDIT') {

        setActionCreateBtn(true);
        setNtwIDFlag(props.setNtwIDFlag);
        setBandData(props.dataBand);
        setSelectedCommDate(props.dataBand.NTW_COMM_DT);
        setSelectedDecommDate(props.dataBand.NTW_DECOMM_DT);
        if(props.onChangeFlag === true){
          setBandData(props.values.values);
          setSelectedCommDate(props.values.values.NTW_COMM_DT);
          setSelectedDecommDate(props.values.values.NTW_DECOMM_DT);
        }
    }

    var siteExist = Object.values(props.site).filter((site)=> site.SITE_VERIFIED_TAG === 'Y')
    setDcsite(siteExist)

 }, [props]);

 useEffect(()=>{
 //  console.log('propsForLocation', props);
  props.fetchSite();
  var siteExist = Object.values(props.site).filter((site)=> site.SITE_VERIFIED_TAG === 'Y')
  setDcsite(siteExist)

 },[])

 const handleBackBtn =() =>{
    window.history.back();
  }


return(
    <div className="animated fadeIn" >
       <Row>
          <Col xs ='12'>
          <Card>
            <Form id="formNtwBand" onSubmit={props.onSubmit}>
            <CardHeader>Network Bandwith</CardHeader>
            <CardBody>
              <Row style={{marginLeft: '230px'}}>
                <Col xs='3'>
                <FormGroup  error={props.hasError1}>
                <Label >DC Site</Label>
                <Input type="select" name="SITE_NAME" id="SITE_NAME" onChange={props.onChange} style={{background: backgcolor}}>
                {    dcSite ? 
                                    dcSite.map(function(lov,index) {
                                    return <option key={index} value={lov.SITE_NAME}>{lov.SITE_NAME}</option>
                                    })
                                    :
                                    // dataRack.site.map(function(lov,index) {
                                    //   return <option key={index} value={dataRack.SITE_NAME}>{dataRack.SITE_NAME}</option>
                                    // })
                                    <option key='id' value={bandData.SITE_NAME}>{bandData.SITE_NAME}</option>
                                   
                  }  
                </Input>
                {props.hasError1 && <FormHelperText style={{color: 'red'}}>This is required!</FormHelperText>}
                </FormGroup>
                <FormGroup  hidden={NtwIDFlag}>
                <Label>Network Ref ID</Label>
                <Input type="text" value={bandData.NTW_ID} id="NTW_ID" name="NTW_ID" onChange={props.onChange} style={{background: backgcolor}}/>
                </FormGroup>
                <Label>Network Name</Label>
                <Input type="text" value={bandData.NTW_NAME} id="NTW_NAME"name="NTW_NAME" onChange={props.onChange} style={{background: backgcolor}}/>
                <Label>Bandwidth (MB)</Label>
                <Input type="number" value={bandData.NTW_BANDWIDTH} id="NTW_BANDWIDTH" name="NTW_BANDWIDTH" onChange={props.onChange} style={{background: backgcolor}}/>
                </Col>
                <Row style={{marginLeft: '100px'}}></Row>
                <Col xs='3'>
                <FormGroup  error={props.hasError2}>
                <Label>Commission Date</Label>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                    helperText={''}
                    id="NTW_COMM_DT" 
                    name="NTW_COMM_DT"
                    margin="normal"
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
                {props.hasError2 && <FormHelperText style={{color: 'red'}}>This is required!</FormHelperText>}
                </FormGroup>
                <FormGroup hidden={props.hiddenDecomm}>
                <Label>Decommission Date</Label>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                    helperText={''}
                    id="NTW_DECOMM_DT" 
                    name="NTW_DECOMM_DT"
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
                <Label>Status</Label>
                <Input type="select" value={bandData.NTW_STATUS}  name="NTW_STATUS" id="NTW_STATUS" onChange={props.onChange} style={{background: backgcolor}}>
                <option value="0">Please select</option>
                        <option value="Active">Active</option>
                        <option value="Not Active">Not Active</option>
                        <option value="KIV">KIV</option>
                </Input>
                <Label>Description</Label>
                <Input type="textarea" value={bandData.NTW_DESC} id="NTW_DESC" name="NTW_DESC" onChange={props.onChange} style={{background: backgcolor}}/>
                </Col> 
              </Row>
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
    site: state.site,
    bandwidth: state.bandwidth
  };
};

const mapDispachToProps = dispatch => {
  return {

    fetchSite: () => dispatch({ type: "FETCH_DCSITE"}),
    fetchBandwidth: () => dispatch({ type: "FETCH_BANDWIDTH"}),
  
  };
};
  
export default connect(mapStateToProps,mapDispachToProps)(Bandwidth);