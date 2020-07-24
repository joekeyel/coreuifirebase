import React, { Component } from 'react';
import { Badge, Button, Card, CardBody, CardFooter, CardHeader, Col, Form, FormGroup, Label, Row, Input } from 'reactstrap';
import TableUPS from './TableUPS';
import { connect } from "react-redux";

class ListUPS extends Component {
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
    this.props.fetchUPS();
   
  }

  componentWillReceiveProps(props){
    //console.log('componentWillReceiveProps',props);
    this.setState({
      data: props.ups.ups,
    })

  }

render(){
    //console.log('render', this.state);
    const data =  this.state.data
return(
    <div className="animated fadeIn">
        <Row>
        <Col xs="12">
            <Card>
                <CardHeader>
                    <strong>UPS List</strong>
                    {/* <small> Form</small> */}
                </CardHeader>
                <CardBody>
                <Card>
                    <CardHeader>
                      <Button color="primary" href="#/CreateUPS"><i className="fa fa-plus-square"></i>&nbsp; Add New UPS</Button>
                        </CardHeader>
                        <CardBody>
                              <TableUPS id="tableUPS" data={data} props={()=> this.props.fetchUPS()}/>
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
    ups: state.ups
  };
};

const mapDispachToProps = dispatch => {
  return {

    fetchUPS: () => dispatch({ type: "FETCH_UPS"}),
  
  };
};
  
export default connect(mapStateToProps,mapDispachToProps)(ListUPS);