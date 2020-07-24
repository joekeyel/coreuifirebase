import React, {useEffect,useState} from 'react';
import FormComponent from './FormComponent';
import auth from '../../../auth';
import $ from 'jquery';
import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar'; 
import Alert from '@material-ui/lab/Alert';
import Swal from 'sweetalert2';

const ViewForm = (props) => {

    const [formValues, setformValues]= useState({});
    const [openSnackBar, setopenSnackBar] = useState(false);
    const [changeFlag,setchangeFlag] = useState(false);
    const [UPSdata, setUPSdata] = useState({});
    const [UPSJournal, setUPSJournal] = useState({});
 
    useEffect(()=>{
      //console.log('pdudata',PDUdata);
      
        fetch('/claritybqm/reportFetch/?scriptName=DC_UPS&id=' + props.match.params.id)
        .then(response => response.json())
        .then((data) => 
        {  
           
             // var filter = Object.values(data.pdu).filter((pdu)=> pdu.PDU_ID == props.match.params.id)
              //console.log('pdudata', data);
              setUPSdata(data.ups[0]);
              setUPSJournal(data.journal);
  
        }
        );
  
    },[props]);
  

  return (<div className="animated fadeIn">
  <FormComponent 
    actionForm={'VIEW'} 
    values={formValues}
    upsID={props.match.params.id}
    props={props.ups}
    btnReset={true}
    UPSdata={UPSdata}
    UPSJournal={UPSJournal}
  />
  
 </div >);

}

export default ViewForm;