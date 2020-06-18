import React, { Component } from 'react';
import { Badge, Button, Card, CardBody, CardFooter, CardHeader, Col, Form, FormGroup, Label, Row, Input } from 'reactstrap';
import TableDCLocation from './TableDCLocation';
import { connect } from "react-redux";

class DCLocationList extends Component {
  constructor(props) {
    super(props);
    this.state={
        formValues: '',
        open: false,
        message: '',
        data: [],
        delete: 'false',
      }
    
  }
   
  componentDidMount(){
    //console.log('componentDidMount',this.props);
    this.props.fetchLocation();
  }

  componentWillReceiveProps(props){
    //console.log('componentWillReceiveProps',props);
    this.setState({
      data: props.location,
    })

  }

 
render(){
    //console.log('render', this.state);
    const data =  this.state.data
return(
    <div className="animated fadeIn" >
        <Row>
        <Col xs="12">
            <Card>
                <CardHeader>
                    <strong>DC Location List</strong>
                    {/* <small> Form</small> */}
                </CardHeader>
                <CardBody>
                <Card>
                    <CardHeader>
                      <Button color="primary" href="#/dcLocationCreate"><i className="fa fa-plus-square"></i>&nbsp; Add New DC Location</Button>
                        </CardHeader>
                        <CardBody>
                              <TableDCLocation id="tableLocation" data={data} props={()=> this.props.fetchLocation()}/>
                          </CardBody>
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
    location: state.location
  };
};

const mapDispachToProps = dispatch => {
  return {

    fetchLocation: () => dispatch({ type: "FETCH_DCLOCATION"}),
  
  };
};
  
export default connect(mapStateToProps,mapDispachToProps)(DCLocationList);