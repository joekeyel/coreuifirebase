import React, {useEffect,useState} from 'react';
import RackComponent from '../../components/FormRack';
import { Badge, Button, Card, CardBody, CardFooter, CardHeader, Col, Form, FormGroup, Label, Row,Input } from 'reactstrap';
import auth from '../../../../auth';
import $ from 'jquery';


const CreateForm = (props) => {

    const [formValues, setformValues]= useState({});

    const handleSubmit = (e) =>{
        e.preventDefault();
        setformValues({formValues});
    }
       
 
    const handleChange = (e) => {
        //console.log('propsFormCreare', e.target.name);
        
        var $inputs = $('#formRack :input');

        var values = {};
        $inputs.each(function () {
            if ($(this).is(':radio') == true || $(this).is(':checkbox') == true){
              values[this.name] = $('input[name=' + $(this).attr('name') + ']:checked').val() == undefined ? "" : $('input[name=' + $(this).attr('name') + ']:checked').val();
                  } 
                  else {
              values[this.name] = $(this).val() == undefined ? "" : $(this).val();
            }
         });

        setformValues({values});
    };

   
    return (<div className="animated fadeIn">
            <RackComponent action={'CREATE'} values={formValues} OnSubmit={handleSubmit} onChange={handleChange}/>
        </div >);

}

export default CreateForm;