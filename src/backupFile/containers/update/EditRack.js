import React, { Component, useEffect, useState } from 'react';
import { Badge, Button, Card, CardBody, CardFooter, CardHeader, Col, Form, FormGroup, Label, Row,Input } from 'reactstrap';
import RackComponent from '../../components/RackForm';
import { connect } from "react-redux";

class EditForm extends Component {
    constructor(props) {
      super(props);
      //this.handleInputChange = this.handleInputChange.bind(this);
      //this.toggle = this.toggle.bind(this);
      this.state={
          formValues: '',
          open: false,
          message: '',
          data: [],
          delete: 'false',
          rackDetail: {},
        }
      
    }

    componentDidMount(){
        this.props.fetchRack();
        //this.getRackDetail(this.props);

    }       
    
    render(){
        var rackDetail = this.state.rackDetail
    return(<div className="animated fadeIn">
            <RackComponent rackValues={this.props} header={'EDIT'} disableSaveBtn={false} />
        </div>);
    
}
}
const mapStateToProps = state => {
    return {
      rack: state.rack,
    };
  };
  
  const mapDispachToProps = dispatch => {
    return {
  
      fetchRack: () => dispatch({ type: "FETCH_RACK"}),
    
    };
  };
export default connect(mapStateToProps,mapDispachToProps)(EditForm);