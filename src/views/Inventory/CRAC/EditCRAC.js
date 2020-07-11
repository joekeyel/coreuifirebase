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
    const [openSnackBar, setOpenSnackBar] = useState(false);
    const [changeFlag,setchangeFlag] = useState(false);
    const [CRACdata, setCRACdata] = useState({});

    useEffect(()=>{
      //console.log('pdudata',PDUdata);
      
        fetch('/claritybqm/reportFetch/?scriptName=DC_CRAC')
        .then(response => response.json())
        .then((data) => 
        {  
           
              var filter = Object.values(data).filter((CRAC)=> CRAC.CRAC_ID == props.match.params.id)
              //console.log('filterPDU', data);
              setCRACdata(filter[0]);
  
        }
        );
  
    },[props]);
  
  //to handle form submit validation
  const onSubmit = (e)=> 
  {
      e.preventDefault();
     
      var $inputs = $('#formCRAC :input');//get form values

      var values = {};
      $inputs.each(function () {
          if ($(this).is(':radio') == true || $(this).is(':checkbox') == true){
            values[this.name] = $('input[name=' + $(this).attr('name') + ']:checked').val() == undefined ? "" : $('input[name=' + $(this).attr('name') + ']:checked').val().toUpperCase();
                } 
                else {
            values[this.name] = $(this).val() == undefined ? "" : $(this).val().toUpperCase();
          }
      
          values['CRAC_COMM_DT'] = "";
          values['CRAC_DECOMM_DT'] = "";
          values['CRAC_CREATED_BY'] = auth.authenticated.username ? auth.authenticated.username.toUpperCase() : "TMIMS";

       });

       
      if ( values.SITE_NAME && values.LOCN_NAME && values.CRAC_ID ){

        
        Swal.fire({
          text: 'Are you sure to Update this CRAC ' + values.CRAC_NAME + '?',
            }).then((result) => {

          if(result.value){
              axios.post('/claritybqm/reportFetchJ/?scriptName=DC_CRAC_UPDATE', values
              ).then((res) => {
                //console.log('success to create : ', res.data);   
                  if(res.data === "success"){
                      setOpenSnackBar(true);
                  } else{/**error from bqm api DC_CRAC_UPDATE */
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
                    text: 'catch:' + err,
                  })
  
                });
            }
      })

      }     
 }

const handleChange = (e) => {
  
    var $inputs = $('#formCRAC :input');//get form values

    var values = {};
    $inputs.each(function () {
        if ($(this).is(':radio') == true || $(this).is(':checkbox') == true){
          values[this.name] = $('input[name=' + $(this).attr('name') + ']:checked').val() == undefined ? "" : $('input[name=' + $(this).attr('name') + ']:checked').val().toUpperCase();
              } 
              else {
          values[this.name] = $(this).val() == undefined ? "" : $(this).val();
        }
       
          values['CRAC_COMM_DT'] = "";
          values['CRAC_DECOMM_DT'] = "";
          values['CRAC_CREATED_BY'] = auth.authenticated.username ? auth.authenticated.username.toUpperCase() : "TMIMS";

     });

    setformValues({values}); // save form value to state
    setchangeFlag(true);

};
  const handleClose = (event, reason) => {

    //console.log('close',event, reason);
    
  
    if (reason === 'clickaway') {
      return;
    }
  
    setOpenSnackBar(false);
  
  };
  return (<div className="animated fadeIn">
  <FormComponent 
    actionForm={'EDIT'} 
    values={formValues}
    CRACid={props.match.params.id}
    onSubmit={onSubmit} 
    onChange={handleChange}
    btnReset={true}
    changeFlag={changeFlag}
    CRACdata={CRACdata}
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