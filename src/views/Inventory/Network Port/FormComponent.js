import React, { Component, useEffect, useState } from 'react';
import { Badge,Button,Card, CardBody, CardFooter,Form, CardHeader, Col, Input, Label,Row} from 'reactstrap';
import { connect } from "react-redux";
import { FormGroup } from '@material-ui/core';
import '../css/style.css';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker } from '@material-ui/pickers';



const FormNtwPort = (props)=> {
     
  const [backgcolor, setbackgcolor] = useState("#b3d9ff");
  const [actionForm, setactionForm] = useState(props.actionForm);
  const [actionCreateBtn, setActionCreateBtn] = useState(false);
  const [actionSaveBtn, setActionSaveBtn] = useState(false);
  const [selectedCommDate, setSelectedCommDate] = useState(null)
  const [selectedDecommDate, setSelectedDecommDate] = useState(null)
  const [NtwIDFlag, setNtwIDFlag] = useState(true);
  const [dcSite, setDcsite] = useState([]);
  const [PortData, setPortData] = useState({});

  useEffect(() => {

  
    if (actionForm == 'CREATE') {
        setActionSaveBtn(true);
    }
    if (actionForm == 'EDIT') {

        setActionCreateBtn(true);
        setNtwIDFlag(props.setNtwIDFlag);
        setPortData(props.dataPort);
        setSelectedCommDate(props.dataPort.PORT_COMM_DT);
        setSelectedDecommDate(props.dataPort.PORT_DECOMM_DT);
        if(props.onChangeFlag === true){
          setPortData(props.values.values);
          setSelectedCommDate(props.values.values.PORT_COMM_DT);
          setSelectedDecommDate(props.values.values.PORT_DECOMM_DT);
        }
    }

    var siteExist = Object.values(props.site).filter((site)=> site.SITE_VERIFIED_TAG === 'Y')
    setDcsite(siteExist)


 }, [props]);
 
useEffect(()=>{

  console.log('propsForLocation', props);

  props.fetchSite();
  var siteExist = Object.values(props.site).filter((site)=> site.SITE_VERIFIED_TAG === 'Y')
  setDcsite(siteExist)

},[])
const handleBackBtn =() =>{
    window.history.back();
  }

return(
        <div className="animated fadeIn">
        <Row>
          <Col xs ='12'>
            <Form id="formNTWPort" onSubmit={props.onSubmit}>
          <Card>
            <CardHeader>Network Port<strong>({actionForm})</strong></CardHeader>
            <CardBody>
              <Card>
              <CardBody>
              <Row style={{marginLeft: '30px'}}>
                <Col xs='3'>
                <FormGroup>
                <Label >DC Site</Label>
                <Input type="select" onChange={props.onChange} name="SITE_NAME" id="SITE_NAME" style={{background: backgcolor}}>
                {    dcSite ? 
                        dcSite.map(function(lov,index) {
                        return <option key={index} value={lov.SITE_NAME}>{lov.SITE_NAME}</option>
                        })
                        :
                        <option key='id' value={PortData.SITE_NAME}>{PortData.SITE_NAME}</option>
                                   
                  }  
                </Input>
                <Label >Network Name</Label>
                <Input type="select" onChange={props.onChange} value={PortData.NTW_NAME} name="NTW_NAME" id="NTW_NAME"  style={{background: backgcolor}}>
                        <option value="">Please select</option>
                        <option value="E-LAN LINK 1GB">E-LAN LINK 1GB</option>
                </Input>
                </FormGroup>
                <FormGroup hidden={NtwIDFlag}>
                <Label>Port Ref ID</Label>
                <Input type="text"  onChange={props.onChange} value={PortData.PORT_ID}  id="PORT_ID" name="PORT_ID"  style={{background: backgcolor}}/>
                </FormGroup>
                <Label>Port No</Label>
                <Input type="text" onChange={props.onChange} value={PortData.PORT_NO}  id="PORT_NO" name="PORT_NO"  style={{background: backgcolor}}/>
                <Label>Data Cable Pre-Laid</Label>
                <Input type="select" name="PORT_CAB_PRELAID" value={PortData.PORT_CAB_PRELAID}  id="PORT_CAB_PRELAID"  style={{background: backgcolor}}>
                        <option value="">Please select</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                </Input>
                <Label>Switch Name</Label>
                <Input type="text" onChange={props.onChange} value={PortData.PORT_SWITCH_NAME}  id="PORT_SWITCH_NAME" name="PORT_SWITCH_NAME"  style={{background: backgcolor}}/>
                </Col>
                <Row style={{marginLeft: '100px'}}></Row>
                <Col xs='3'>
                <Label>Network Type</Label>
                <Input type="select" onChange={props.onChange} value={PortData.PORT_NTW_TYPE}  name="PORT_NTW_TYPE" id="PORT_NTW_TYPE"  style={{background: backgcolor}}> 
                        <option value="">Please select</option>
                        <option value="DCI">DCI</option>
                        <option value="MetroE Connect">MetroE Connect</option>
                </Input>
                <Label>Status</Label>
                <Input type="select" onChange={props.onChange} value={PortData.PORT_STATUS}  name="PORT_STATUS" id="PORT_STATUS" style={{background: backgcolor}}>
                <option value="">Please select</option>
                        <option value="Active">Active</option>
                        <option value="Not Active">Not Active</option>
                        <option value="KIV3">KIV</option>
                </Input>
                <Col xs='4'></Col>
                <Label>Description</Label>
                <Input type="textarea" onChange={props.onChange} value={PortData.PORT_DESC}  size='6' id="PORT_DESC" name="PORT_DESC" style={{background: backgcolor}}/>
                <FormGroup>
                <Label>Commission Date</Label>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                    helperText={''}
                    id="PORT_COMM_DT" 
                    name="PORT_COMM_DT"
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
                </FormGroup>
                <FormGroup hidden={props.hiddenDecomm}>
                <Label>Decommission Date</Label>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                    helperText={''}
                    id="PORT_DECOMM_DT" 
                    name="PORT_DECOMM_DT"
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
              </Card>
            </CardBody>
          </Card>
          </Form>
          </Col>
        </Row>
      </div>
    );
}

const mapStateToProps = state => {
  return {
    site: state.site,
    port: state.port
  };
};

const mapDispachToProps = dispatch => {
  return {

    fetchSite: () => dispatch({ type: "FETCH_DCSITE"}),
    fetchPort: () => dispatch({ type: "FETCH_PORT"}),
  
  };
};
  
export default connect(mapStateToProps,mapDispachToProps)(FormNtwPort);