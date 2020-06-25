import React, { Component } from 'react';
import { Badge, Button, Card, CardBody, CardFooter, CardHeader, Col, Form, FormGroup, Label, Row, Input } from 'reactstrap';
import TableBandwidth from './TableBandwidth';
import { connect } from "react-redux";

class Bandwidth extends Component {
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
    this.props.fetchBandwidth();
  }

  componentWillReceiveProps(props){
    props.fetchBandwidth();
    //console.log('componentWillReceiveProps',props);
    this.setState({
      data: props.bandwidth,
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
                    <strong>Network Bandwidth</strong>
                    {/* <small> Form</small> */}
                </CardHeader>
                <CardBody>
                <Card>
                    <CardHeader>
                      <Button color="primary" href="#/CreateBandwidth"><i className="fa fa-plus-square"></i>&nbsp; Add New Network Bandwidth</Button>
                        </CardHeader>
                        <CardBody>
                              <TableBandwidth id="tableBandwidth" data={data}/>
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
    bandwidth: state.bandwidth
  };
};

const mapDispachToProps = dispatch => {
  return {

    fetchBandwidth: () => dispatch({ type: "FETCH_BANDWIDTH"}),
  
  };
};
  
export default connect(mapStateToProps,mapDispachToProps)(Bandwidth);