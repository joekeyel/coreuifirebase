import React, { Component } from 'react';
import { Badge,Button,Card, CardBody, CardFooter, CardHeader, Col, Input, Label,Row} from 'reactstrap';
import { connect } from "react-redux";
import { FormGroup } from '@material-ui/core';

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
        actionCreateBtn: false,
        actionSaveBtn: false,
        actionForm: "",
        backgcolor:'#b3d9ff',
        DataSite:{},
        hiddenSiteID: true,
      }
    
  }

  componentDidMount(){
    console.log('componentDidmoutn', this.props);
    this.props.fetchSite();

    //handle hidden button based on action (create/edit)
    if(this.props.actionForm == 'CREATE'){
        this.setState({actionSaveBtn: true})
    }
    if(this.props.actionForm == 'EDIT'){
        this.setState({actionCreateBtn: true,hiddenSiteID: false})

    }


  }

  componentWillReceiveProps(props){
    console.log('componentWillReceiveProps', props);
    this.setState({DataSite: props.site})
  }


  
  handleBackBtn =() =>{
    window.history.back();
  }
render(){
    //console.log('data',this.state.data);
    const options = this.state.options
    var title = this.state.actionForm
    var siteIDhide = this.state.hiddenSiteID
return(
    <div className="animated fadeIn" >
        <Row>
        <Col xs="12">
            <Card>
                <CardHeader>
                     DC Site(<strong>{title}</strong>)
                    {/* <small> Form</small> */}
                </CardHeader>
                <CardBody>
                 <Card>
                <CardBody>
                <Row>
                    <Col xs="4">
                    <FormGroup hidden={siteIDhide}>
                    <Label>DC Site ID :</Label>
                    <Input type="text" id="dcSiteID" name="dcSiteID" value={this.state.autoOrderId} onChange={this.handleInputChange} style={{ backgroundColor : this.state.backgcolor}} />
                    </FormGroup>
                    <FormGroup>
                    <Label>DC Site :</Label>
                    <Input type="text" id="dcSite" name="dcSite" onChange={this.handleInputChange} style={{ backgroundColor : this.state.backgcolor}} />
                    </FormGroup>
                    <FormGroup>
                    <Label>Address :</Label>
                    <Input type="textarea" rows="4" id="address" name="address" onChange={this.handleInputChange} style={{ backgroundColor : this.state.backgcolor}} />
                    </FormGroup>
                    <FormGroup>
                    <Label>Postcode :</Label>
                    <Input type="text" id="postcode" name="postcode" onChange={this.handleInputChange} style={{ backgroundColor : this.state.backgcolor}} />
                    </FormGroup>
                    <FormGroup>
                    <Label>State :</Label>
                    <Input type="text" id="state" name="state" onChange={this.handleInputChange} style={{ backgroundColor : this.state.backgcolor}} />
                    </FormGroup>
                </Col>
                <Col xs="4">
                    <Label>Total Space Capacity :</Label>
                    <Input type="text" id="capacity" name="capacity" onChange={this.handleInputChange} style={{ backgroundColor : this.state.backgcolor}} />
                    <Label>Total Power Capacity :</Label>
                    <Input type="text" id="powerCap" name="powerCap" onChange={this.handleInputChange} style={{ backgroundColor : this.state.backgcolor}} />
                    <Label>DC Manager :</Label>
                    <Input type="text" id="dcManager" name="dcManager" value={this.state.todayDate} onChange={this.handleInputChange}  style={{ backgroundColor : this.state.backgcolor}} />
                    <Label>Telephone No. :</Label>
                    <Input type="text" id="telNo" name="telNo" value={this.state.todayDate} onChange={this.handleInputChange} style={{ backgroundColor : this.state.backgcolor}} />
                    <Label> Commission Date </Label>
                    <Input type="date" id="date-input" name="date-input" placeholder="date"  style={{ backgroundColor : this.state.backgcolor}} />
                    <Label> Decommission Date </Label>
                    <Input type="date" id="date-input" name="date-input" placeholder="date"  style={{ backgroundColor : this.state.backgcolor}} />
                </Col>
                <Col xs="4">
                    <Label>Status :</Label>
                    <Input type="select" name="select" id="select"  style={{ backgroundColor : this.state.backgcolor}} >
                        <option value="0">Please select</option>
                        <option value="1">Active</option>
                        <option value="2">Not Active</option>
                        <option value="3">KIV</option>
                      </Input>
                    <Label>Description :</Label>
                    <Input type="textarea" rows="4" id="description" name="description" onChange={this.handleInputChange} style={{ backgroundColor : this.state.backgcolor}} />
                    <Label>Verified By :</Label>
                    <Input type="text" id="verifiedBy" name="dverifiedBy" onChange={this.handleInputChange} style={{ backgroundColor : this.state.backgcolor}} />
                </Col>
             </Row> 
                </CardBody>
                 </Card>
                </CardBody>
                <div className="form-button">
                <Row style={{ marginBottom: '20px' }}>
                    <Col>
                        <Button color="info" onClick={this.handleBackBtn}>
                            <i className="fa fa-history"></i>&nbsp; Back
             </Button>&nbsp;&nbsp;&nbsp;
                        <Button color="primary" type="submit" hidden={this.state.actionCreateBtn}>
                            <i className="fa fa-plus"></i>&nbsp; Create
             </Button>&nbsp;
             <Button color="primary" type="submit" hidden={this.state.actionSaveBtn}>
                            <i className="fa fa-save"></i>&nbsp; Save
             </Button>&nbsp;
             <Button color="success" type="submit" >
                            <i className="fa fa-send"></i>&nbsp; Submit
             </Button>
                    </Col>
                </Row>
            </div>
            </Card>
        </Col>
        </Row>
        </div>
    );
}
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
  
export default connect(mapStateToProps,mapDispachToProps)(DCSite);