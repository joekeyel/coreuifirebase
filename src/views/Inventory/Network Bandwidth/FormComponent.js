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
          <Col xs ='12'>
          <Card>
            <CardHeader>Network Bandwith</CardHeader>
            <CardBody>
              <Row style={{marginLeft: '250px'}}>
              <Col xs='4'>
              <FormGroup>
                <Label >DC Site</Label>
                <Input type="select" name="select" id="select">
                        <option value="0">Please select</option>
                        <option value="1">Option #1</option>
                        <option value="2">Option #2</option>
                        <option value="3">Option #3</option>
                </Input>
                </FormGroup>
              </Col>
              </Row>
              <Card>
              <CardBody>
              <Row style={{marginLeft: '230px'}}>
                <Col xs='3'>
                <Label>Network Ref ID</Label>
                <Input type="text" id="networkrefid"name="networkrefid"/>
                <Label>Network Name</Label>
                <Input type="text" id="networkname"name="networkname"/>
                <Label>Bandwidth (MB)</Label>
                <Input type="text" id="bandwidthmb"name="bandwidthmb"/>
                </Col>
                <Row style={{marginLeft: '100px'}}></Row>
                <Col xs='3'>
                <Label>Status</Label>
                <Input type="select" name="select" id="select">
                <option value="0">Please select</option>
                        <option value="1">Option #1</option>
                        <option value="2">Option #2</option>
                        <option value="3">Option #3</option>
                </Input>
                <Label>Description</Label>
                <Input type="text" id="description"name="description"/>
                </Col> 
              </Row>
              </CardBody>
              <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                <Button block outline color="primary">Submit</Button>
              </Col>
              </Card>
            </CardBody>
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