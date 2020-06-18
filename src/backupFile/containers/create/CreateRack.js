import React, { Component, useEffect, useState } from 'react';
import { Badge, Button, Card, CardBody, CardFooter, CardHeader, Col, Form, FormGroup, Label, Row,Input } from 'reactstrap';
import RackComponent from '../../components/FormRack';
import axios from 'axios';
import { Formik } from 'formik';


class CreateForm extends Component {
    constructor(props) {
      super(props);
      //this.toggle = this.toggle.bind(this);
      this.state={
          formValues: '',
          open: false,
          message: '',
          data: [],
       }
      
    }

    componentDidMount(){
    console.log('comp',this.props);
    
        axios.get('/claritybqm/reportFetchJ/?scriptName=DC_SITE')
        .then(function (response) {
          // handle success
          console.log('success get DC site:', response);
        })
        .catch(function (error) {
          // handle error
          console.log('failed get DC site:', error);
        })
    
    
      }

      handleSubmit(e) {
        e.preventDefault();
        var form = new FormData('formRack');
        console.log('handleSubmit',e);
    
      }

        handleOnChange(e){
            console.log('handleOnChange',this.props);
            
        }


    render(){
      console.log('render',this.props);
      
    return(<div className="animated fadeIn">
            <RackComponent {...this.props} header={'CREATE'} disableAddBtn={false} onSubmit={(props) => this.handleSubmit(props)} />
            </div>);
    
}
}

export default CreateForm;