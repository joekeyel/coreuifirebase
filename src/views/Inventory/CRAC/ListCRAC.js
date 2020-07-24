import React, { Component } from 'react';
import { Badge, Button, Card, CardBody, CardFooter, CardHeader, Col, Form, FormGroup, Label, Row, Input } from 'reactstrap';
import TabTableCRAC from './TableCRAC';
import { connect } from "react-redux";

class CRACList extends Component {
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
    this.props.fetchCRAC();
  }

  componentWillReceiveProps(props){
    //console.log('componentWillReceiveProps',props);
    this.setState({
      data: props.crac.crac,
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
                    <strong>CRAC List</strong>
                    {/* <small> Form</small> */}
                </CardHeader>
                <CardBody>
                <Card>
                    <CardHeader>
                      <Button color="primary" href="#/createCRAC"><i className="fa fa-plus-square"></i>&nbsp; Add New CRAC</Button>
                        </CardHeader>
                        <CardBody>
                              <TabTableCRAC id="tableCRAC" data={data} props={()=> this.props.fetchCRAC}/>
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
    crac: state.crac
  };
};

const mapDispachToProps = dispatch => {
  return {

    fetchCRAC: () => dispatch({ type: "FETCH_CRAC"}),
  
  };
};
  
export default connect(mapStateToProps,mapDispachToProps)(CRACList);