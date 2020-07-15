import React, { Component, useState, useEffect } from 'react';
import { Badge, Button, Card, CardBody, CardFooter, CardHeader, Col, Form, FormGroup, Label, Row, Input } from 'reactstrap';
import '../css/style.css';
import $, { data } from 'jquery';
import auth from '../../../auth';
import { connect } from "react-redux";

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
    const [cableID, setCablelID] = useState([{}]);
  
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
            //getRackDetail();
        }

        fetch('/claritybqm/reportFetch/?scriptName=DC_RACK')
            .then(response => response.json())
            .then((rack) => 
            {  
                
                if(props.rackid){
                    var filter = Object.values(rack).filter(rack => rack.RACK_ID == props.rackid);
                    setdataRack(filter[0]);
            
                    console.log('filter',filter);     
                }
            }
            );
            

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

    const InputValidation = (e) => {
 
        let formIsValid = true;
       
        var $inputs = $('#formRack :input');//get form values
  
        var values = {};
        $inputs.each(function () {
            if ($(this).is(':radio') == true || $(this).is(':checkbox') == true){
              values[this.name] = $('input[name=' + $(this).attr('name') + ']:checked').val() == undefined ? "" : $('input[name=' + $(this).attr('name') + ']:checked').val();
                  } 
                  else {
              values[this.name] = $(this).val() == undefined ? "" : $(this).val();
            }
            values['RACK_ID'] = '';
            values['RACK_CONTRACTUAL_POWER'] = '';
            values['RACK_INSERT_BY'] = auth.authenticated.username ? auth.authenticated.username.toUpperCase() : "TMIMS_FORM";
  
         });
  
         console.log('handleValidation', values );
  
        //SITE_NAME
        if(values.SITE_NAME == ""){
          formIsValid = false;
          setSiteErrorMsg("Please select DC Site");
          setBorderColor("solid red");
       }if(values.SITE_NAME){
           formIsValid = true;
           setSiteErrorMsg("");
           setBorderColor("");
       }
  
       //LOCN_NAME
       if(values.LOCN_NAME == ""){
           formIsValid = false;
           setLocErrorMsg("Please select DC Location");
           setBorderColor("solid red");
        }if(values.LOCN_NAME){
            formIsValid = true;
            setLocErrorMsg("");
            setBorderColor("");
        }
  
          //RACK_ROOM
       if(values.RACK_ROOM == ""){
        formIsValid = false;
        setRackNoErrorMsg("Cannot be empty");
        setBorderColor("solid red");
       }if(values.RACK_ROOM){
         formIsValid = true;
         setRackNoErrorMsg("");
         setBorderColor("");
      }
  
  
        //RACK_NO
        if(values.RACK_NO == ""){
           formIsValid = false;
           setRackNoErrorMsg("Cannot be empty");
           setBorderColor("solid red");
        }if(values.RACK_NO){
            formIsValid = true;
            setRackNoErrorMsg("");
            setBorderColor("");
        }

    return formIsValid;
}

const addCableID = () =>{
    setCablelID([{cableID: [...cableID, '']}])
}

const handleCableChange = (e,index) =>{
    cableID[index] = e.target.value;
    setCablelID([{cableID: cableID}]);
    console.log('cableID',cableID);
    
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
                        <FormGroup>
                            <Label >DC Site</Label>
                            <Input type="select" name="SITE_NAME" id="SITE_NAME" onChange={props.onChange} style={{ backgroundColor : backgcolor, border: borderColor}} >
                            <option value="">Please select</option>
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
                            <span style={{color: "red"}}>{siteErrorMsg}</span>  
                            </FormGroup>
                            <FormGroup>
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
                            <span style={{color: "red"}}>{locErrorMsg}</span>  
                        </FormGroup>
                    </Col>
                    <Col xs='4'>
                        <FormGroup>
                        <Label>Room</Label>
                        <Input type="text" id="RACK_ROOM" name="RACK_ROOM" value={dataRack.RACK_ROOM} onChange={props.onChange} style={{ backgroundColor: backgcolor, border: borderColor  }} />
                        <span style={{color: "red"}}>{RackNoErrorMsg}</span>
                      </FormGroup>
                    </Col>
                </Row>
                <Card>
                    <CardBody>
                        <Row>
                            <Col xs='3'>
                                <FormGroup hidden={RackIdFlag}>
                                <Label>Rack ID</Label>
                                <Input type="text" value={dataRack.RACK_ID} readOnly/>
                                </FormGroup>
                                <FormGroup>
                                <Label>Rack No</Label>
                                <Input type="text" id="RACK_NO" name="RACK_NO" value={dataRack.RACK_NO} onChange={props.onChange} style={{ backgroundColor: backgcolor, border: borderColor }} />
                                <span style={{color: "red"}}>{RackNoErrorMsg}</span>
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
                                    <option value="">Null</option>
                                </Input>
                                <Label>Cable ID</Label>
                                <FormGroup>
                                {
                                    cableID.map((cable,index)=>{
                                        return(<div key={index} >
                                            <Input 
                                            type="text" 
                                            id="RACK_CABLE_ID" 
                                            name="RACK_CABLE_ID" 
                                            value={cable} 
                                            onChange={(e)=> handleCableChange(e,index)} 
                                            style={{ backgroundColor: backgcolor}}  
                                            className="input-icons"/>
                                            <Button color='default' ><i className="fa fa-close"/></Button>
                                        </div>)
                                    })
                                }
                                <hr/>
                                <Button color="primary" onClick={()=> addCableID()}>Add Cable ID</Button>
                                </FormGroup>
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
                                    <option value="0">Please select</option>
                                    <option value="">Null</option>
                                    <option value="Registered">Registered</option>
                                    <option value="Unoccupied">Unoccupied</option>
                                </Input>
                                <Label>Description</Label>
                                <Input type="textarea" size="6" id="RACK_DESC" name="RACK_DESC" value={dataRack.RACK_DESC} onChange={props.onChange} style={{ backgroundColor: backgcolor }} />
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