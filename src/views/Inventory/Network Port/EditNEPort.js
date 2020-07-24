import React, {useEffect,useState} from 'react';
import FormComponent from './FormComponent';
import auth from '../../../auth';
import $ from 'jquery';
import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar'; 
import Alert from '@material-ui/lab/Alert';
 

const EditForm = (props) => {

  const [formValues, setformValues]= useState({});
  const [dataPort, setdataPort] = useState({});
  const [openSnackBar, setopenSnackBar] = useState(false);
  const [NtwIDFlag, setNtwIDFlag] = useState(false);
  const [onChangeFlag, setonChangeFlag] = useState(false);
  const [hasError1, setHasError1] = useState(false);
  const [hasError2, setHasError2] = useState(false);

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

//to handle form submit validation
const onSubmit = (e)=> 
{
    e.preventDefault();
   
    var $inputs = $('#formNTWPort :input');//get form values

    var values = {};
    $inputs.each(function () {
        if ($(this).is(':radio') === true || $(this).is(':checkbox') === true){
          values[this.name] = $('input[name=' + $(this).attr('name') + ']:checked').val() === undefined ? "" : $('input[name=' + $(this).attr('name') + ']:checked').val();
              } 
              else {
          values[this.name] = $(this).val() === undefined ? "" : $(this).val();
        }
  
        values['PORT_UPDATED_BY'] = auth.authenticated.username ? auth.authenticated.username.toUpperCase() : "TMIMS_FORM";

     });

     if(values.SITE_NAME ){
      setHasError1(false);
      }
      if(values.PORT_NO){
        setHasError2(false);
      }
    

    /** validate value is null */
    if(!values.SITE_NAME ){
      setHasError1(true);
    }
    if(!values.PORT_NO){
      setHasError2(true);
    }
  
if ( values.SITE_NAME && values.PORT_NO){

      axios.post('/claritybqm/reportFetchJ/?scriptName=DC_NETWORK_PORT_UPDATE', values).then((res) => {
       //console.log('success to update : ', res.data,values);   
         if(res.data == "success"){
           setopenSnackBar(true);
         }
       })
         .catch((err) => {
         //console.log('failed to update : ', err);
         });

    }     
}

const handleChange = (e) => {

  var $inputs = $('#formNTWPort :input');//get form values

  var values = {};
  $inputs.each(function () {
      if ($(this).is(':radio') === true || $(this).is(':checkbox') === true){
        values[this.name] = $('input[name=' + $(this).attr('name') + ']:checked').val() === undefined ? "" : $('input[name=' + $(this).attr('name') + ']:checked').val();
            } 
            else {
        values[this.name] = $(this).val() === undefined ? "" : $(this).val();
      }
   });

  setformValues({values}); // save form value to state
  setonChangeFlag(true);

};
const handleClose = (event, reason) => {

  //console.log('close',event, reason);
  

  if (reason === 'clickaway') {
    return;
  }

   setopenSnackBar(false);

};
return (<div className="animated fadeIn">
<FormComponent 
  actionForm={'EDIT'} 
  values={formValues}
  dataPort={dataPort}
  rackid={props.match.params.id}
  props={props.rack}
  onSubmit={onSubmit} 
  onChange={handleChange}
  NtwIDFlag={NtwIDFlag}
  hasError1={hasError1}
  hasError2={hasError2}
  onChangeFlag={onChangeFlag}
/>
<Snackbar
      open={openSnackBar} autoHideDuration={1500} onClose={handleClose} 
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Alert variant="filled"  onClose={handleClose} severity="success" >
           Data has been updated.
        </Alert>
  </Snackbar>
</div >);

}
export default EditForm;