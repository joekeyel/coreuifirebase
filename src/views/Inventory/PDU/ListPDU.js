import React, { Component } from 'react';
import { Badge, Button, Card, CardBody, CardFooter, CardHeader, Col, Form, FormGroup, Label, Row, Input } from 'reactstrap';
import TablePDU from './TablePDU';
import { connect } from "react-redux";

class PDUList extends Component {
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
    this.props.fetchPDU();
  }

  componentWillReceiveProps(props){
    //console.log('componentWillReceiveProps',props);
    this.setState({
      data: props.pdu,
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
                    <strong>PDU List</strong>
                    {/* <small> Form</small> */}
                </CardHeader>
                <CardBody>
                <Card>
                    <CardHeader>
                      <Button color="primary" href="#/CreatePDU"><i className="fa fa-plus-square"></i>&nbsp; Add New PDU</Button>
                        </CardHeader>
                        <CardBody>
                              <TablePDU id="tableSite" data={data} />
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
    pdu: state.pdu
  };
};

const mapDispachToProps = dispatch => {
  return {

    fetchPDU: () => dispatch({ type: "FETCH_PDU"}),
  
  };
};
  
export default connect(mapStateToProps,mapDispachToProps)(PDUList);