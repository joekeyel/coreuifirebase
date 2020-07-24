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
    const [PDUdata, setPDUdata] = useState({});
    const [PDUJournal, setPDUJournal] = useState({});
    const [changeFlag,setchangeFlag] = useState(false);
  
  useEffect(()=>{
    //console.log('pdudata',PDUdata);
    
      fetch('/claritybqm/reportFetch/?scriptName=DC_PDU&id=' + props.match.params.id)
      .then(response => response.json())
      .then((data) => 
      {  
         
           // var filter = Object.values(data.pdu).filter((pdu)=> pdu.PDU_ID == props.match.params.id)
            //console.log('pdudata', data.pdu[0]);
            setPDUdata(data.pdu[0]);
            setPDUJournal(data.journal);

      }
      );

  },[props]);

  return (<div className="animated fadeIn">
  <FormComponent 
    actionForm={'VIEW'} 
    values={formValues}
    PDUid={props.match.params.id}
    props={props.pdu}
    PDUdata={PDUdata}
    btnReset={true}
    changeFlag={changeFlag}
    PDUJournal={PDUJournal}
  />

 </div >);

}


export default ViewForm;