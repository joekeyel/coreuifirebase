import React, { Component, useState, useEffect } from 'react';
import { Badge, Button, Card, CardBody, CardFooter, CardHeader, Col, Form, FormGroup, Label, Row, Input } from 'reactstrap';
import '../css/style.css';
import $ from 'jquery';
import auth from '../../../auth';
import { connect } from "react-redux";

const FormLocation = (props) => {

  const [backgcolor, setbackgcolor] = useState("#b3d9ff");
  const [actionForm, setactionForm] = useState(props.actionForm);
  const [actionCreateBtn, setActionCreateBtn] = useState(false);
  const [actionSaveBtn, setActionSaveBtn] = useState(false);
  const [LocIDFlag, setLocIDFlag] = useState(true);
  const [optionSite, setOptionSite] = useState({});
  const [optionLocation, setoptionLocation] = useState({});
  const [borderColor, setBorderColor] = useState("");
  const [siteErrorMsg, setSiteErrorMsg]= useState("");
  const [locErrorMsg, setLocErrorMsg]= useState("");
  const [RackNoErrorMsg, setRackNoErrorMsg] = useState("");
  const [dataRack, setdataRack] = useState({});
 

  useEffect(() => {
      console.log('propsFormComponent', props);

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
    //console.log('data',props.state.data);
    //const options = props.state.options
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
                    <FormGroup>
                    <Label>DC Site :</Label>
                    <Input type="text" id="SITE_NAME" name="SITE_NAME" value={props.location.SITE_NAME} onChange={props.onChange} style={{ backgroundColor : backgcolor}} />
                    </FormGroup>
                    <FormGroup  hidden={LocIDFlag}>
                    <Label>DC Location ID :</Label>
                    <Input type="text" id="LOCN_ID" name="LOCN_ID" value={props.locId} onChange={props.onChange} style={{ backgroundColor : backgcolor}} />
                    </FormGroup>
                    <FormGroup>
                    <Label>DC Location :</Label>
                    <Input type="text" id="LOCN_NAME" name="LOCN_NAME" value={props.location.LOCN_NAME}  onChange={props.onChange} style={{ backgroundColor : backgcolor}} />
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
                    <Input type="file" id="LOCN_FLOOR_PLAN" value={props.location.LOCN_FLOOR_PLAN} name="LOCN_FLOOR_PLAN" style={{ backgroundColor : backgcolor}} />
                    <Label>Rack Utilization :</Label>
                    <Input type="file" id="LOCN_RACK_UTILIZATION" value={props.location.LOCN_RACK_UTILIZATION} name="LOCN_RACK_UTILIZATION" style={{ backgroundColor : backgcolor}} />
                    <Label> Commission Date </Label>
                    <Input type="date" id="LOCN_COMM_DT" value={props.location.LOCN_COMM_DT} name="LOCN_COMM_DT" placeholder="date" style={{ backgroundColor : backgcolor}} />
                    <Label> Decommission Date </Label>
                    <Input type="date" id="LOCN_DECOMM_DT" value={props.location.LOCN_DECOMM_DT} name="LOCN_DECOMM_DT" placeholder="date" style={{ backgroundColor : backgcolor}} />
                    
                    
                </Col>
                <Col xs="4">
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


export default FormLocation;