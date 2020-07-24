import React, { Component } from 'react';
import { Badge, Button, Card, CardBody, CardFooter, CardHeader, Col, Form, FormGroup, Label, Row, Input } from 'reactstrap';
import TableDCSite from './TableDCSite';
import { connect } from "react-redux";

class DCSiteList extends Component {
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
    this.props.fetchSite();
  }

  componentWillReceiveProps(props){
    //console.log('componentWillReceiveProps',props);
    this.setState({
      data: props.site,
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
                    <strong>DC Site List</strong>
                    {/* <small> Form</small> */}
                </CardHeader>
                <CardBody>
                <Card>
                    <CardHeader>
                      <Button color="primary" href="#/CreateSite"><i className="fa fa-plus-square"></i>&nbsp; Add New DC Site</Button>
                        </CardHeader>
                        <CardBody>
                              <TableDCSite id="tableSite" data={data} props={()=>this.props.fetchSite()}/>
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
    site: state.site
  };
};

const mapDispachToProps = dispatch => {
  return {

    fetchSite: () => dispatch({ type: "FETCH_DCSITE"}),
  
  };
};
  
export default connect(mapStateToProps,mapDispachToProps)(DCSiteList);