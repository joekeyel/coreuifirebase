import React, { Component } from 'react';
import { Badge, Button, Card, CardBody, CardFooter, CardHeader, Col, Form, FormGroup, Label, Row, Input } from 'reactstrap';
import TableRack from './TableRack';
import { connect } from "react-redux";

class RackList extends Component {
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
    this.props.fetchRack();
  }

  componentWillReceiveProps(props){
    //console.log('props',props);
    this.setState({
      data: props.rack,
    })

  }

 
render(){
    //console.log('render', this.state.action);
    const data =  this.state.data
return(
    <div className="animated fadeIn" >
        <Row>
        <Col xs="12">
            <Card>
                <CardHeader>
                    <strong>Rack List</strong>
                    {/* <small> Form</small> */}
                </CardHeader>
                <CardBody>
                <Card>
                    <CardHeader>
                      <Button color="primary" href="#/CreateRack"><i className="fa fa-plus-square"></i>&nbsp; Add New Rack</Button>
                        </CardHeader>
                        <CardBody>
                              <TableRack id="tableRack" data={data}/>
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
    rack: state.rack
  };
};

const mapDispachToProps = dispatch => {
  return {

    fetchRack: () => dispatch({ type: "FETCH_RACK"}),
  
  };
};
  
export default connect(mapStateToProps,mapDispachToProps)(RackList);