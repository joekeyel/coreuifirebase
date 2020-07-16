import React, { Component } from 'react';
import { Badge, Button, Card, CardBody, CardFooter, CardHeader, Col, Form, FormGroup, Label, Row, Input } from 'reactstrap';
import TableNTWPort from './TableNTWPort';
import { connect } from "react-redux";
import '../css/style.css'

class Port extends Component {
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
    this.props.fetchPort();
  }

  componentWillReceiveProps(props){
    //console.log('componentWillReceiveProps',props);
    this.setState({
      data: props.port,
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
                    <strong>Network Port List</strong>
                    {/* <small> Form</small> */}
                </CardHeader>
                <CardBody>
                <Card>
                    <CardHeader>
                      <Button color="primary" href="#/CreateNEPort"><i className="fa fa-plus-square"></i>&nbsp; Add New Network Port</Button>
                        </CardHeader>
                        <CardBody>
                              <TableNTWPort id="tablePort" data={data} props={()=> this.props.fetchPort()}/>
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
    port: state.port
  };
};

const mapDispachToProps = dispatch => {
  return {

    fetchPort: () => dispatch({ type: "FETCH_PORT"}),
  
  };
};
  
export default connect(mapStateToProps,mapDispachToProps)(Port);