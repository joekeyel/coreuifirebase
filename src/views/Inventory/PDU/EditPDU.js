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
    const [PDUdata, setPDUdata] = useState({});
    const [changeFlag,setchangeFlag] = useState(false);
  
  useEffect(()=>{
    //console.log('pdudata',PDUdata);
    
      fetch('/claritybqm/reportFetch/?scriptName=DC_PDU')
      .then(response => response.json())
      .then((data) => 
      {  
         
            var filter = Object.values(data).filter((pdu)=> pdu.PDU_ID == props.match.params.id)
            //console.log('filterPDU', filter);
            setPDUdata(filter[0]);

      }
      );

  },[props]);


  //to handle form submit validation
  const onSubmit = (e)=> 
  {
      e.preventDefault();
     
      var $inputs = $('#formPDU :input');//get form values

      var values = {};
      $inputs.each(function () {
          if ($(this).is(':radio') == true || $(this).is(':checkbox') == true){
            values[this.name] = $('input[name=' + $(this).attr('name') + ']:checked').val() == undefined ? "" : $('input[name=' + $(this).attr('name') + ']:checked').val().toUpperCase();
                } 
                else {
            values[this.name] = $(this).val() == undefined ? "" : $(this).val().toUpperCase();
          }
          values['PDU_ID'] =  props.match.params.id;
          values['PDU_UPDATED_BY'] = auth.authenticated.username ? auth.authenticated.username.toUpperCase() : "TMIMS";

       });

       
      if ( values.SITE_NAME && values.LOCN_NAME && values.PDU_ID && values.PDU_NAME ){

        Swal.fire({
          text: 'Are you sure to update this PDU ' + values.PDU_NAME + '?',
      }).then((result) => {

        if(result.value){
            axios.post('/claritybqm/reportFetchJ/?scriptName=DC_PDU_UPDATE', values).then((res) => {
            //console.log('success to update : ', res.data,values);   
              if(res.data == "success"){
                setopenSnackBar(true);
              } else{/**error from bqm api DC_PDU_UPDATE */
                //console.log('error',res.data);
                Swal.fire({
                  icon: 'error',
                  text: 'Bqm:' + res.data.failed,
                })

              }
            })
            .catch((err) => {
              Swal.fire({
                icon: 'error',
                text: 'catch:' + err,
              })
            });

      }     
    })
 }

}

const handleChange = (e) => {
  
    var $inputs = $('#formPDU :input');//get form values

    var values = {};
    $inputs.each(function () {
        if ($(this).is(':radio') == true || $(this).is(':checkbox') == true){
          values[this.name] = $('input[name=' + $(this).attr('name') + ']:checked').val() == undefined ? "" : $('input[name=' + $(this).attr('name') + ']:checked').val();
              } 
              else {
          values[this.name] = $(this).val() == undefined ? "" : $(this).val();
        }
     });

    setformValues({values}); // save form value to state
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
    PDUid={props.match.params.id}
    props={props.pdu}
    onSubmit={onSubmit} 
    onChange={handleChange}
    PDUdata={PDUdata}
    btnReset={true}
    changeFlag={changeFlag}
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