import React, { Component } from 'react';
import { Badge,Button,Card, CardBody, CardFooter, CardHeader, Col, Input, Label,} from 'reactstrap';

class DCSite extends Component {
  constructor(props) {
    super(props);
    //this.handleInputChange = this.handleInputChange.bind(this);
    this.state={
        formValues: '',
        open: false,
        message: '',
        userData: [],
        data: [],
        SiteOption : {},
        options: [{
            text: '',
            value: ''
        }],
        currentUser: "DCOADMIN",
        
      }
    
  }

  componentDidMount(){
    this.LOVsite();

  }

  LOVsite(){

    fetch('/claritybqm/reportFetch/?scriptName=DC_LOV&type=SITE')
    .then(response => response.json())
    .then((site) => 
    {
        console.log('site',site)
        this.setState({ SiteOption : site})          
       
    }
    );
   
  }

render(){
    //console.log('data',this.state.data);
    const options = this.state.options
return(
    <div className="animated fadeIn" >
        <Row>
        <Col xs="12">
            <Card>
                <CardHeader>
                    <strong>DC Site</strong>
                    {/* <small> Form</small> */}
                </CardHeader>
                <CardBody>
                 <Card>
                <CardBody>
                <Row>
                    <Col xs="4">
                    <Label>DC Site ID :</Label>
                    <Input type="text" id="dcSiteID" name="dcSiteID" value={this.state.autoOrderId} onChange={this.handleInputChange} />
                    <Label>DC Site :</Label>
                    <Input type="text" id="dcSite" name="dcSite" onChange={this.handleInputChange}/>
                    <Label>Address :</Label>
                    <Input type="textarea" rows="4" id="address" name="address" onChange={this.handleInputChange}/>
                    <Label>Postcode :</Label>
                    <Input type="text" id="postcode" name="postcode" onChange={this.handleInputChange}/>
                    <Label>State :</Label>
                    <Input type="text" id="state" name="state" onChange={this.handleInputChange}/>
                </Col>
                <Col xs="4">
                    <Label>Total Space Capacity :</Label>
                    <Input type="text" id="capacity" name="capacity" onChange={this.handleInputChange}/>
                    <Label>Total Power Capacity :</Label>
                    <Input type="text" id="powerCap" name="powerCap" onChange={this.handleInputChange}/>
                    <Label>DC Manager :</Label>
                    <Input type="text" id="dcManager" name="dcManager" value={this.state.todayDate} onChange={this.handleInputChange} />
                    <Label>Telephone No. :</Label>
                    <Input type="text" id="telNo" name="telNo" value={this.state.todayDate} onChange={this.handleInputChange} />
                    <Label> Commission Date </Label>
                    <Input type="date" id="date-input" name="date-input" placeholder="date" />
                    <Label> Decommission Date </Label>
                    <Input type="date" id="date-input" name="date-input" placeholder="date" />
                </Col>
                <Col xs="4">
                    <Label>Status :</Label>
                    <Input type="select" name="select" id="select">
                        <option value="0">Please select</option>
                        <option value="1">Active</option>
                        <option value="2">Not Active</option>
                        <option value="3">KIV</option>
                      </Input>
                    <Label>Description :</Label>
                    <Input type="textarea" rows="4" id="description" name="description" onChange={this.handleInputChange}/>
                    <Label>Verified By :</Label>
                    <Input type="text" id="verifiedBy" name="dverifiedBy" onChange={this.handleInputChange}/>
                </Col>
             </Row> 
                </CardBody>
                 </Card>
                </CardBody>
                <CardFooter>
                <Button type="save" color="primary"> Save</Button>
                <Button type="submit" color="success"> Submit</Button>
                <Button type="reset" color="danger"> Reset</Button>
              </CardFooter>
            </Card>
        </Col>
        </Row>
        </div>
    );
}
}

export default DCSite;