import React, {useEffect,useState} from 'react';
import FormComponent from './FormComponent';
import auth from '../../../auth';
import $ from 'jquery';
import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar'; 
import Alert from '@material-ui/lab/Alert';
import Swal from 'sweetalert2';

const EditForm = (props) => {

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
  
    const getJournalList = ()=>{
      fetch('/claritybqm/reportFetch/?scriptName=DC_UPS&id=' + props.match.params.id)
      .then(response => response.json())
      .then((data) => 
      {  
         
           // var filter = Object.values(data.pdu).filter((pdu)=> pdu.PDU_ID == props.match.params.id)
            //console.log('pdudata', data.pdu[0]);
            //setPDUdata(data.pdu[0]);
            setUPSJournal(data.journal);
  
      }
      );
  
    }
  
  //to handle form submit validation
  const onSubmit = (e)=> 
  {
      e.preventDefault();
     
      var $inputs = $('#formUPS :input');//get form values
      var username = localStorage.getItem('username').toUpperCase();
      var values = {};
      $inputs.each(function () {
          if ($(this).is(':radio') === true || $(this).is(':checkbox') === true){
            values[this.name] = $('input[name=' + $(this).attr('name') + ']:checked').val() === undefined ? "" : $('input[name=' + $(this).attr('name') + ']:checked').val();
                } 
                else {
            values[this.name] = $(this).val() === undefined ? "" : $(this).val();
          }
          values['UPS_UPDATED_BY'] = username ? username.toUpperCase() : "TMIMS_FORM";

       });

       
      if ( values.SITE_NAME && values.LOCN_NAME ){

        Swal.fire({
          text: 'Are you sure to update this UPS ' + values.UPS_NAME + '?',
        }).then((result) => {
          if(result.value){
              axios.post('/claritybqm/reportFetchJ/?scriptName=DC_UPS_UPDATE', values).then((res) => {
              //console.log('success to update : ', res);   
                if(res.data === "success"){
                  setopenSnackBar(true);
                  getJournalList();
                }
                else{/**error from bqm api DC_UPS_UPDATE */
                  //console.log('error',res.data);
                  Swal.fire({
                    icon: 'error',
                    text: 'Bqm:' + res.data.failed,
                  })
  
                }
              })
              .catch((err) => {/**catch error upon fetch api function*/
                //console.log('failed to update : ', err);
                 Swal.fire({
                  icon: 'error',
                  text: 'Catch:' + err,
                })

              });
          }
        });///end update function

      }     
 }

const handleChange = (e) => {
  
    var $inputs = $('#formUPS :input');//get form values

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
    //console.log('handleChange',values);
    setchangeFlag(true);
  

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
    upsID={props.match.params.id}
    props={props.ups}
    onSubmit={onSubmit} 
    onChange={handleChange}
    changeFlag={changeFlag}
    btnReset={true}
    UPSdata={UPSdata}
    UPSJournal={UPSJournal}
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