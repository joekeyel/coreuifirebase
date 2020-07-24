import React, {useEffect,useState} from 'react';
import FormComponent from './FormComponent';
import { Badge, Button, Card, CardBody, CardFooter, CardHeader, Col, Form, FormGroup, Label, Row,Input } from 'reactstrap';
import auth from '../../../auth';
import $ from 'jquery';
import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar'; 
import Alert from '@material-ui/lab/Alert';
 

const ViewForm = (props) => {

    const [formValues, setformValues]= useState({});
    const [openSnackBar, setopenSnackBar] = useState(false);
    const [dataRack, setdataRack] = useState({});

  useEffect(()=>{
    fetch('/claritybqm/reportFetch/?scriptName=DC_RACK')
    .then(response => response.json())
    .then((rack) => 
    {  
        
            var filter = Object.values(rack).filter(rack => rack.RACK_ID == props.match.params.id);
            setdataRack(filter[0]);
            console.log('filter',filter[0]);     
            //console.log('SelectedCommDate',filter[0].RACK_COMM_DT,filter[0].RACK_DECOMM_DT);    
    }
    );
  },[])


  return (<div className="animated fadeIn">
  <FormComponent 
    actionForm={'VIEW'} 
    values={formValues}
    rackid={props.match.params.id}
    props={props.rack}
    dataRack={dataRack}
  />
  
 </div >);

}

export default ViewForm;