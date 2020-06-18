import React, { Component, useState, useEffect } from 'react';
import { Badge, Button, Card, CardBody, CardFooter, CardHeader, Col, Form, FormGroup, Label, Row, Input } from 'reactstrap';
import '../css/style.css';

const FormRack = (props) => {

  const [backgcolor, setbackgcolor] = useState("#b3d9ff");
  const [action, setAction] = useState(props.action);
  const [actionCreateBtn, setActionCreateBtn] = useState(false);
  const [actionSaveBtn, setActionSaveBtn] = useState(false);


  useEffect(() => {
    console.log('propsForm', props);
    if(action == 'CREATE'){
      setActionSaveBtn(true);
    }
    if(action == 'EDIT'){
      setActionCreateBtn(true);
    }
   
  }, [props]);

  
  return (<div className="animated fadeIn">
    <Row>
      <Col xs='12'>
        <Card>
          <CardHeader>Rack <strong>({action})</strong></CardHeader>
          <Form name="formRack" id="formRack" onSubmit={props.onSubmit}>
            <CardBody>
              <Row style={{ marginLeft: '250px' }}>
                <Col xs='4'>
                  <FormGroup>
                    <Label >DC Site</Label>
                    {/* <Input type="select" name="SITE_NAME" id="SITE_NAME" onChange={props.onChange} style={{ backgroundColor : backgcolor}} >
                                  {
                                         Object.values(this.state.SiteOption).map(function(lov,index) {
             
                                              return <option key={index} value={lov.SITE_NAME}>{lov.SITE_NAME}</option>
                                 
                                         })
                                   }
                                 
                      </Input> */}
                    <Label >DC Location</Label>
                    {/* <Input type="select" name="LOCN_NAME" id="LOCN_NAME" onChange={props.onChange} style={{ backgroundColor:  backgcolor}}>
                                    {
     
                                         Object.values(this.state.dcLocation).map(function(lov,index) {
                                         
                                             return <option key={lov.LOCN_NAME} value={lov.LOCN_NAME}>{lov.LOCN_NAME}</option>
                                                                                 
                                         })
                                     }
                      </Input> */}
                  </FormGroup>
                </Col>
                <Col xs='4'>
                  <Label>Room</Label>
                  <Input type="text" id="RACK_ROOM" name="RACK_ROOM"  onChange={props.onChange} style={{ backgroundColor: backgcolor }} />
                </Col>
              </Row>
              <Card>
                <CardBody>
                  <Row>
                    <Col xs='3'>
                      <Label>Rack ID</Label>
                      <Input type="text" value={props.values.RACK_ID} readOnly />
                      <Label>Rack No</Label>
                      <Input type="text" id="RACK_NO" name="RACK_NO" value={props.values.RACK_NO} onChange={props.onChange} style={{ backgroundColor: backgcolor }} />
                      <Label>Rack Type</Label>
                      <Input type="text" id="RACK_TYPE" name="RACK_TYPE" value={props.values.RACK_TYPE} onChange={props.onChange} style={{ backgroundColor: backgcolor }} />
                      <Label>Rack Size</Label>
                      <Input type="text" id="RACK_SIZE" name="RACK_SIZE" value={props.values.RACK_SIZE} onChange={props.onChange} style={{ backgroundColor: backgcolor }} />
                    </Col>
                    <Col xs='3'>
                      <Label>Power Density</Label>
                      <Input type="select" name="RACK_POWER_DENSITY" id="RACK_POWER_DENSITY" value={props.values.RACK_POWER_DENSITY} onChange={props.onChange} style={{ backgroundColor: backgcolor }}>
                        <option value="1.5">1.5</option>
                        <option value="3.0">3.0</option>
                        <option value="5.0">5.0</option>
                        <option value="7.0">7.0</option>
                        <option value="10.0">10.0</option>
                        <option value="">NULL</option>
                      </Input>
                      <Label>Breaker Type</Label>
                      <Input type="select" name="RACK_BREAKER_TYPE" id="RACK_BREAKER_TYPE" value={props.values.RACK_BREAKER_TYPE} onChange={props.onChange} style={{ backgroundColor: backgcolor }}>
                        <option value="16">16</option>
                      </Input>
                      <Label>Power Phase</Label>
                      <Input type="select" name="RACK_POWER_PHASE" id="RACK_POWER_PHASE" value={props.values.RACK_POWER_PHASE} onChange={props.onChange} style={{ backgroundColor: backgcolor }}>
                        <option value="Single">Single</option>
                        <option value="">Null</option>
                      </Input>
                      <Label>Cable ID</Label>
                      <Input type="text" id="RACK_CABLE_ID" name="RACK_CABLE_ID" value={props.values.RACK_CABLE_ID} onChange={props.onChange} style={{ backgroundColor: backgcolor }} />
                    </Col>
                    <Col xs='3'>
                      <Label>PDU A</Label>
                      <Input type="text" id="RACK_PDU_A" name="RACK_PDU_A" value={props.values.RACK_PDU_A} onChange={props.onChange} style={{ backgroundColor: backgcolor }} />
                      <Label>PDU B</Label>
                      <Input type="text" id="RACK_PDU_B" name="RACK_PDU_B" value={props.values.RACK_PDU_B} onChange={props.onChange} style={{ backgroundColor: backgcolor }} />
                      <Label>Source A</Label>
                      <Input type="text" id="RACK_SOURCE_A" name="RACK_SOURCE_A" value={props.values.RACK_SOURCE_A} onChange={props.onChange} style={{ backgroundColor: backgcolor }} />
                      <Label>Source B</Label>
                      <Input type="text" id="RACK_SOURCE_B" name="RACK_SOURCE_B" value={props.values.RACK_SOURCE_B} onChange={props.onChange} style={{ backgroundColor: backgcolor }} />
                      <Label>Power Pre-Laid</Label>
                      <Input type="select" name="RACK_POWER_PRELAID" id="RACK_POWER_PRELAID" value={props.values.RACK_POWER_PRELAID} onChange={props.onChange} style={{ backgroundColor: backgcolor }}>
                        <option value="">Please select</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </Input>
                      <Label>Cabling Pre-Laid</Label>
                      <Input type="select" name="RACK_CABLING_PRELAID" id="RACK_CABLING_PRELAID" value={props.values.RACK_CABLING_PRELAID} onChange={props.onChange} style={{ backgroundColor: backgcolor }}>
                        <option value="">Please select</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </Input>
                    </Col>
                    <Col xs='3'>
                      <Label>Status</Label>
                      <Input type="select" name="RACK_STATUS" id="RACK_STATUS" value={props.values.RACK_STATUS} onChange={props.onChange} style={{ backgroundColor: backgcolor }}>
                        <option value="0">Please select</option>
                        <option value="">Null</option>
                        <option value="Registered">Registered</option>
                        <option value="Unoccupied">Unoccupied</option>
                      </Input>
                      <Label>Description</Label>
                      <Input type="textarea" size="6" id="RACK_DESC" name="RACK_DESC" value={props.values.RACK_DESC} onChange={props.onChange} style={{ backgroundColor: backgcolor }} />
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </CardBody>
            <div className="form-button">
              <Row style={{ marginBottom: '20px' }}>
                <Col>
                  <Button color="info">
                    <i className="fa fa-history"></i>&nbsp; Back
                         </Button>&nbsp;&nbsp;&nbsp;
                         {/* </Col>
                         <Col> */}
                  <Button color="primary" type="button" hidden={actionCreateBtn}>
                    <i className="fa fa-plus"></i>&nbsp; Create
                         </Button>&nbsp;
                         <Button color="primary" type="button" hidden={actionSaveBtn}>
                    <i className="fa fa-save"></i>&nbsp; Save
                         </Button>&nbsp;
                         <Button color="success" type="button">
                    <i className="fa fa-send"></i>&nbsp; Submit
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
export default FormRack;