import React, {useEffect,useState} from 'react';
import FormComponent from './FormComponent';
import auth from '../../../auth';
import $ from 'jquery';
import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar'; 
import Alert from '@material-ui/lab/Alert';
 

const ViewForm = (props) => {

    const [formValues, setformValues]= useState({});
    const [bandData, setBandData] = useState(false);
    const [NtwIDFlag, setNtwIDFlag] = useState(false);
   

    useEffect(()=>{
      fetch('/claritybqm/reportFetch/?scriptName=DC_NETWORK_BANDWIDTH')
      .then(response => response.json())
      .then((data) => 
      {  
          
              var filter = Object.values(data).filter(d => d.NTW_ID == props.match.params.id);
              setBandData(filter[0]);
              //console.log('filter',filter[0]);     
              //console.log('SelectedCommDate',filter[0].RACK_COMM_DT,filter[0].RACK_DECOMM_DT);    
      }
      );
    },[])

  return (<div className="animated fadeIn">
  <FormComponent 
    actionForm={'VIEW'}
    dataBand={bandData}
    rackid={props.match.params.id}
    props={props.rack}
    NtwIDFlag={NtwIDFlag}
    btnReset={true}
  />
 </div >);

}

export default ViewForm;