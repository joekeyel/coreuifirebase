import React, {useEffect,useState} from 'react';
import FormComponent from './FormComponent';
import { Badge, Button, Card, CardBody, CardFooter, CardHeader, Col, Form, FormGroup, Label, Row,Input } from 'reactstrap';
import auth from '../../../auth';
import $ from 'jquery';
import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar'; 
import Alert from '@material-ui/lab/Alert';
import Swal from 'sweetalert2';

const ViewForm = (props) => {
    const [changeFlag,setchangeFlag] = useState(false);
    const [CRACdata, setCRACdata] = useState({});
    const [CRACJurnal, setCRACJurnal] = useState({});

    useEffect(()=>{
      //console.log('pdudata',PDUdata);
      
        fetch('/claritybqm/reportFetch/?scriptName=DC_CRAC&id='+ props.match.params.id)
        .then(response => response.json())
        .then((data) => 
        {  
           
              //var filter = Object.values(data).filter((CRAC)=> CRAC.CRAC_ID == props.match.params.id)
              //console.log('filterPDU', data);
              setCRACdata(data.crac[0]);
              setCRACJurnal(data.journal);
  
        }
        );
  
    },[props]);
 
    return (<div className="animated fadeIn">
            <FormComponent 
              actionForm={'VIEW'} 
              btnReset={false}
              MaintenanceFlag={true}
              CRACid={props.match.params.id}
              CRACdata={CRACdata}
              CRACJurnal={CRACJurnal}
            />
          
        </div >);

}

export default ViewForm;