import React, { Component, useEffect, useState } from 'react';
import { Badge,Button,Card, CardBody, CardFooter, CardHeader, Col, Input, Label,Row} from 'reactstrap';
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

  useEffect(() => {

    //console.log('propsForLocation', props);

    if (actionForm == 'CREATE') {
        setActionSaveBtn(true);
    }
    if (actionForm == 'EDIT') {

        setActionCreateBtn(true);
        setNtwIDFlag(props.setNtwIDFlag);
    }

 }, [props]);
 
  
const handleBackBtn =() =>{
    window.history.back();
  }

return(
        <div className="animated fadeIn">
        <Row>
          <Col xs ='12'>
          <Card>
            <CardHeader>Network Port<strong>({actionForm})</strong></CardHeader>
            <CardBody>
              <Card>
              <CardBody>
              <Row style={{marginLeft: '30px'}}>
                <Col xs='3'>
                <FormGroup>
                <Label >DC Site</Label>
                <Input type="select" name="SITE_NAME" id="SITE_NAME" style={{background: backgcolor}}>
                        <option value="0">Please select</option>
                        <option value="1">Option #1</option>
                        <option value="2">Option #2</option>
                        <option value="3">Option #3</option>
                </Input>
                <Label >Network Name</Label>
                <Input type="select" name="NTW_NAME" id="NTW_NAME"  style={{background: backgcolor}}>
                        <option value="0">Please select</option>
                        <option value="1">Option #1</option>
                        <option value="2">Option #2</option>
                        <option value="3">Option #3</option>
                </Input>
                </FormGroup>
                <Label>Port Ref ID</Label>
                <Input type="text" id="PORT_ID" name="PORT_ID"  style={{background: backgcolor}}/>
                <Label>Port No</Label>
                <Input type="text" id="PORT_NO" name="PORT_NO"  style={{background: backgcolor}}/>
                <Label>Data Cable Pre-Laid</Label>
                <Input type="select" name="PORT_CAB_PRELAID" id="PORT_CAB_PRELAID"  style={{background: backgcolor}}>
                        <option value="0">Please select</option>
                        <option value="1">Option #1</option>
                        <option value="2">Option #2</option>
                        <option value="3">Option #3</option>
                </Input>
                <Label>Switch Name</Label>
                <Input type="text" id="switch" name="switch"  style={{background: backgcolor}}/>
                </Col>
                <Row style={{marginLeft: '100px'}}></Row>
                <Col xs='3'>
                <Label>Network Type</Label>
                <Input type="select" name="PORT_NTW_TYPE" id="PORT_NTW_TYPE"  style={{background: backgcolor}}> 
                        <option value="0">Please select</option>
                        <option value="1">Option #1</option>
                        <option value="2">Option #2</option>
                        <option value="3">Option #3</option>
                </Input>
                <Label>Status</Label>
                <Input type="select" name="PORT_STATUS" id="PORT_STATUS" style={{background: backgcolor}}>
                <option value="0">Please select</option>
                        <option value="1">Option #1</option>
                        <option value="2">Option #2</option>
                        <option value="3">Option #3</option>
                </Input>
                <Col xs='4'></Col>
                <Label>Description</Label>
                <Input type="text" id="PORT_DESC" name="PORT_DESC" style={{background: backgcolor}}/>
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
                </Col> 
              </Row>
              </CardBody>
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
              </Card>
            </CardBody>
          </Card>
          </Col>
        </Row>
      </div>
    );
}

const mapStateToProps = state => {
  return {
    port: state.port
  };
};

const mapDispachToProps = dispatch => {
  return {

    fetchPort: () => dispatch({ type: "FETCH_PORT"}),
  
  };
};
  
export default connect(mapStateToProps,mapDispachToProps)(FormNtwPort);