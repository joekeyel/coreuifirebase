import React, {useEffect,useState} from 'react';
import FormComponent from './FormComponent';
import auth from '../../../auth';
import $ from 'jquery';
import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar'; 
import Alert from '@material-ui/lab/Alert';
 

const ViewForm = (props) => {

  const [dataPort, setdataPort] = useState({});
  const [NtwIDFlag, setNtwIDFlag] = useState(false);
  const [onChangeFlag, setonChangeFlag] = useState(false);

  useEffect(()=>{
    fetch('/claritybqm/reportFetch/?scriptName=DC_NETWORK_PORT')
    .then(response => response.json())
    .then((data) => 
    {  
        
            var filter = Object.values(data).filter(d => d.PORT_ID == props.match.params.id);
            setdataPort(filter[0]);
            //console.log('filter',filter[0]);     
            //console.log('SelectedCommDate',filter[0].RACK_COMM_DT,filter[0].RACK_DECOMM_DT);    
    }
    );
  },[])

return (<div className="animated fadeIn">
<FormComponent 
  actionForm={'VIEW'} 
  dataPort={dataPort}
  rackid={props.match.params.id}
  props={props.rack}
  NtwIDFlag={NtwIDFlag}
/>

</div >);

}
export default ViewForm;