import React, { Component } from 'react';
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardText,
  CardTitle,
  Col,
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Fade,
  Form,
  FormGroup,
  FormText,
  FormFeedback,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupButtonDropdown,
  InputGroupText,
  Label,
  Row, Progress,Table,Alert,
} from 'reactstrap';
import { makeStyles, useTheme, FormHelperText, Select, MenuItem, Chip,FormControl, InputLabel } from '@material-ui/core';
import Swal from 'sweetalert2';
import '../Inventory/css/style.css';

class ResourceCheck extends Component {
  constructor(props) {
    super(props);

    this.resourceSummary = this.resourceSummary.bind(this);
    this.handleChangeSite = this.handleChangeSite.bind(this);
    this.handleChangeLocation = this.handleChangeLocation.bind(this);
    this.state = {
      SiteOption: {},
      selectedSite: {},
      openContainer: false,
      rack_util: {},
      allData: '',
      space_util: '',
      power_util: '',
      network_util: '',
      bandwidth_util: '',
      colorBadge: "",
      alertFlag: true,
      dcLocation: {},
      selectedLocation: {},
      imageFloorPlan: {},
      imageRackUtil: {},
    };
  }

  componentDidMount(){
    this.LOVsite();

  }

  handleChangeSite(e){
      
    this.setState({
        selectedSite: e.target.value
    })
    
    
    var siteSelected = e.target.value
    if(siteSelected !== ""){

        fetch('/claritybqm/reportFetch/?scriptName=DC_LOCATION')
        .then(response => response.json())
        .then((loc) => 
        {
            //console.log('site',JSON.stringify(site))
            
            var LocFilter = loc.filter(loc => loc.SITE_NAME == siteSelected);
            this.setState({ dcLocation : LocFilter})  

            //console.log('site',LocFilter)

        }
        );

    }

  }
  handleChangeLocation(e){
      //console.log('handleChangeLocation',e.target.value);
    var location = this.state.dcLocation
    var LocFilter = Object.values(location).filter(loc => loc.LOCN_NAME == e.target.value);
    //console.log('LocFilterssd',LocFilter);

    this.setState({
        selectedLocation: e.target.value
    })

    
    fetch('/claritybqm/reportFetch/?scriptName=DC_LOCATION&locn_id=' + LocFilter[0].LOCN_ID)
    .then(response => response.json())
    .then((location) => 
    {  
        //console.log('loc',location);
      
        this.setState({
            imageFloorPlan: location[0].FLOOR_PLAN,
            imageRackUtil: location[0].RACK_UTILIZATION,
        })
    }
    );
  }

  LOVsite(){

    fetch('/claritybqm/reportFetch/?scriptName=DC_SITE')
    .then(response => response.json())
    .then((site) => 
    {
        //console.log('site',JSON.stringify(site))
        var siteExist = site.filter((site)=> site.SITE_VERIFIED_TAG === 'Y')
        this.setState({ SiteOption : siteExist})          
       
    }
    );
       
  }
  resourceSummary(e){
    
    //this.setState({openContainer : true})
    fetch('/claritybqm/reportFetch/?scriptName=DC_DASHBOARD_INFO&site=' + this.state.selectedSite +'&location='+this.state.selectedLocation)
    .then(response => response.json())
    .then((util) => 
    {
        console.log('util',util)
        if(util.length){
            this.setState({ allData : util})    
            Object.values(util).map((d)=>
            {
                this.setState({ rack_util : d.RACK_UTILIZATION,
                                space_util : '80%',//d.SPACE_UTILIZATION, 
                                power_util: d.POWER_UTILIZATION,
                                network_util: '',
                                bandwidth_util: d.POWER_UTILIZATION, })    
            })
            this.setState({openContainer : true})
            this.createSummaryPanel(this.state.openContainer);
        }
        else{
            Swal.fire({
                icon: 'error',
                text: 'No record found',
              })
              this.setState({openContainer : false})
        }
       
    }
    );
    
  }
  createSummaryPanel(){
    var alertShow = this.state.alertFlag
    if(this.state.openContainer == true){
        if(this.state.rack_util.length){
            if(this.state.rack_util >= "80%" ){
               var color = "danger"
            }
            if(this.state.rack_util  < "80%"){
                var color = "primary"
             }
             if(this.state.space_util  >= "70%" && alertShow == true){
                var colorSpace = "danger";
                alertShow = false
             }
            return(<div>
            <Card outline color="primary">
                <CardHeader>
                    <Row>
                      <div><h5> Summary: <strong>{this.state.selectedSite} - ( {this.state.selectedLocation} )</strong></h5></div>
                    </Row>

                </CardHeader>
                    <CardBody>
                    <Row>
                      <Col xs="4" sm="6" md="4">
                        <Card>
                            <CardHeader>
                                Rack
                                <div className="card-header-actions">
                                  <h4><Badge pill color={color} className="float-right">Rack Utilization: {this.state.rack_util}</Badge></h4>
                                </div>
                            </CardHeader>
                            <CardBody>
                               <Row>
                                   <Col>
                                        {
                                            Object.values(this.state.allData).map((d)=>
                                            {
                                                return(<div>
                                                    <CardBody>
                                                        <h5>
                                                        <Row>
                                                            <Label>Rack Utilized : <Badge pill color="warning" >  {d.RACK_UTILIZED}</Badge></Label>
                                                        </Row>
                                                        <Row>
                                                            <Label>Rack Available : <Badge pill color="success">  {d.RACK_AVAILABLE}</Badge></Label>
                                                        </Row>
                                                        <Row>
                                                            <Label>Total Rack Capacity : <Badge pill color="primary" > {d.RACK_CAPACITY}</Badge></Label>
                                                        </Row>
                                                        </h5>
                                                    </CardBody>
                                                    </div>)
                                            })
                                        }
                                   </Col>
                               </Row>
                            </CardBody>
                            </Card>
                        </Col>
                        <Col xs="4" sm="6" md="4">
                        <Card>
                            <CardHeader color={colorSpace} >
                                Space
                                <div className="card-header-actions">
                                  <h4><Badge pill color={colorSpace} className="float-right">Space Utilization: {this.state.space_util}</Badge></h4>
                                </div>
                            </CardHeader>
                            <Card body  color={colorSpace} style={{marginBottom: '0px'}}>
                               <Row>
                                   <Col>
                                        {
                                            Object.values(this.state.allData).map((d)=>
                                            {
                                                return(<div>
                                                    <CardBody>
                                                        <h5>
                                                        <Row>
                                                            <Label>Space Utilized : <Badge pill color="warning" >  {d.SPACE_UTILIZED} sqft</Badge></Label>
                                                        </Row>
                                                        <Row>
                                                             <Label>Space Available : <Badge pill color="success">  {d.SPACE_AVAILABLE} sqft</Badge></Label>
                                                        </Row>
                                                        <Row>
                                                             <Label>Total Space Capacity : <Badge pill color="primary" >  {d.SPACE_CAPACITY} sqft</Badge></Label>
                                                        </Row>
                                                        </h5>
                                                    </CardBody>
                                                    </div>)
                                            })
                                        }
                                   </Col>
                               </Row>
                            </Card>
                         </Card>
                        </Col>
                        <Col xs="4" sm="6" md="4">
                        <Card>
                            <CardHeader>
                                Power
                                <div className="card-header-actions">
                                  <h4><Badge pill color={color} className="float-right">Power Utilization: {this.state.power_util}</Badge></h4>
                                </div>
                            </CardHeader>
                            <CardBody>
                               <Row>
                                   <Col>
                                        {
                                            Object.values(this.state.allData).map((d)=>
                                            {
                                                return(<div>
                                                    <CardBody>
                                                        <h5>
                                                        <Row>
                                                            <Label>Power Utilized : <Badge pill color="warning" >  {d.POWER_UTILIZED} KW</Badge></Label>
                                                        </Row>
                                                        <Row>
                                                            <Label>Power Available : <Badge pill color="success">  {d.POWER_AVAILABLE} KW</Badge></Label>
                                                        </Row>
                                                        <Row>
                                                             <Label>Total Power Capacity : <Badge pill color="primary" >  {d.POWER_CAPACITY} KW</Badge></Label>
                                                        </Row>
                                                        </h5>
                                                    </CardBody>
                                                    </div>)
                                            })
                                        }
                                   </Col>
                               </Row>
                            </CardBody>
                            </Card>
                        </Col>
                     </Row>
                     <Row>
                      <Col xs="4" sm="6" md="4">
                        <Card>
                            <CardHeader>
                                Network Port
                                <div className="card-header-actions">
                                <h4><Badge pill color={color} className="float-right">Network Port Utilization: {this.state.total_util}</Badge></h4>
                                </div>
                            </CardHeader>
                            <CardBody>
                               <Row>
                                   <Col>
                                        {
                                            Object.values(this.state.allData).map((d)=>
                                            {
                                                return(<div>
                                                    <CardBody>
                                                        <h5>
                                                        <Row>
                                                            <Label>Network Port Utilized : <Badge pill color="warning" >  {d.RACK_UTILIZED}</Badge></Label>
                                                       </Row>
                                                        <Row>
                                                            <Label>Network Port Available : <Badge pill color="success">  {d.RACK_AVAILABLE}</Badge></Label>
                                                        </Row>
                                                        <Row>
                                                            <Label>Total Network Port Capacity : <Badge pill color="primary" >  {d.TOTAL_RACK}</Badge></Label>
                                                        </Row>
                                                        </h5>
                                                    </CardBody>
                                                    </div>)
                                            })
                                        }
                                   </Col>
                               </Row>
                            </CardBody>
                            </Card>
                        </Col>
                        <Col xs="4" sm="6" md="4">
                        <Card>
                            <CardHeader>
                                Bandwidth
                                <div className="card-header-actions">
                                  <h4><Badge pill color={color} className="float-right">Bandwidth Utilization: {this.state.bandwidth_util}</Badge></h4>
                                </div>
                            </CardHeader>
                            <CardBody>
                               <Row>
                                   <Col>
                                        {
                                            Object.values(this.state.allData).map((d)=>
                                            {
                                                return(<div>
                                                     <CardBody>
                                                      <h5>
                                                        <Row>
                                                            <Label>Bandwidth Utilized : <Badge pill color="warning" >  {d.BANDWIDTH_UTILIZED} MB</Badge></Label>
                                                        </Row>
                                                        <Row>
                                                            <Label>Bandwidth Available : <Badge pill color="success">  {d.RACK_AVAILABLE} MB</Badge></Label>
                                                        </Row>
                                                        <Row>
                                                            <Label>Total Bandwidth Capacity : <Badge pill color="primary" >  {d.BANDWIDTH_CAPACITY} MB</Badge></Label>
                                                          </Row>
                                                          </h5>
                                                        </CardBody>
                                                   </div>)
                                            })
                                        }
                                   </Col>
                               </Row>
                            </CardBody>
                            </Card>
                        </Col>
                     </Row>
                     <Alert id='alertMsg' color="danger" hidden={alertShow}>
                        {/*eslint-disable-next-line*/}
                        Space Utilization more than 70%, please contact <a href={"mailto:azura.abubakar@tm.com.my?subject=Space Utilization more than 70%"} target='_blank' className="alert-link"> DC Manager</a> to confirm availability.
                    </Alert>
                    <hr/>
                        <Row>
                            <Col xs='3'>
                                <Button block color="info" className="btn-pill" href={"#/resourceDetails/"+this.state.selectedSite}> Resource Details</Button>
                            </Col>
                        </Row>
                    </CardBody>
                    <CardFooter>
                     <h4>ATTACHMENT: </h4>
                        <div>
                            <Row>
                                <Col>
                                 <h6>Floor Plan:</h6>
                                    { this.state.imageFloorPlan ?
                                    <img id="imgView" src={this.state.imageFloorPlan} style={{width: '100%', height: '350px'}}/>
                                    :
                                    <h6>No Image Found</h6>
                                    }
                                    </Col>
                                <Col>
                                 <h6>Rack Utilization:</h6>
                                 {
                                     this.state.imageRackUtil ?
                                     <img id="imgView2" src={this.state.imageRackUtil} style={{width: '100%', height: '350px'}}/>
                                     :
                                     <h6>No Image Found</h6>
                                }  
                                </Col>
                            </Row>
                        </div>
                    </CardFooter>
                 </Card></div>)
        }
        else{
            Swal.fire({
                icon: 'error',
                text: 'No record found',
            })
            this.setState({openContainer : false})   
        }
    }
   
  }
  render() {
   console.log('RACK_UTILIZATION',this.state);
   
    return (
      <div className="animated fadeIn">
          <Row>
              <Col xs='12'>
              <Card>
                  <CardHeader>Resource Check</CardHeader>
                  <CardBody>
                    <Row style={{marginLeft: "50px"}}>
                        <Col xs="4">
                            <Label>DC Site</Label>
                            <Input  type="select" name="lovSite" id="lovSite" onChange={this.handleChangeSite}>
                            <option value="">Please Select Location</option>
                                {
                                    this.state.SiteOption ? 
                                    Object.values(this.state.SiteOption).map(function(lov) {
                                     //console.log('lov',lov);
                                      return <option key={lov.SITE_ID} value={lov.SITE_NAME}>{lov.SITE_NAME}</option>
                                    })
                                    :
                                    <option value="">Please Select Location</option>
                                }
                            </Input>
                        </Col>
                        <Col xs="4">
                            <Label>DC Location</Label>
                            <Input type="select" name="lovLoc" id="lovLoc"  onChange={this.handleChangeLocation}>
                            <option  value="">Please Select Location</option>
                                {
                                        this.state.dcLocation ?
                                        Object.values(this.state.dcLocation).map(function(lov) {
                                        // console.log('lov',lov);
                                           return <option key={lov.LOCN_ID} value={lov.LOCN_NAME}>{lov.LOCN_NAME}</option>
                                        })
                                        :
                                    <option  value="">No Location found for site {this.state.selectedSite}</option>
                                }
                            </Input>
                        </Col>
                        <Col xs='2'>
                            <div style={{marginTop: '26px'}}>
                            <Button outline color="primary" onClick={this.resourceSummary}> Check Resource</Button>
                            </div>
                        </Col>
                    </Row>
                    <Row style={{marginLeft: "50px", marginTop: "10px"}}>
                        <Col>
                             {this.createSummaryPanel(this.state.openContainer)}
                        </Col> 
                    </Row>
                  </CardBody>
              </Card>
              </Col>
          </Row>
      </div>
    );
  }
}

export default ResourceCheck;
