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
    
 const getJournalList = ()=>{
      fetch('/claritybqm/reportFetch/?scriptName=DC_CRAC&id='+ props.match.params.id)
      .then(response => response.json())
      .then((data) => 
      {  
        
            //var filter = Object.values(data).filter((CRAC)=> CRAC.CRAC_ID == props.match.params.id)
            //console.log('filterPDU', data);
           // setCRACdata(data.crac[0]);
            setCRACJurnal(data.journal);

      }
      );

    }
  //to handle form submit validation
  const onSubmit = (e,type)=> 
  {
      e.preventDefault();
     
      var $inputs = $('#formCRAC :input');//get form values
      var username = localStorage.getItem('username').toUpperCase();
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
          values['CRAC_UPDATED_BY'] = username ? username : "TMIMS";

       });

       
      if ( values.SITE_NAME && values.LOCN_NAME && values.CRAC_ID ){

        if(type === 'delete'){
          if(values.CRAC_DECOMM_DT === "" || values.CRAC_DECOMM_DT === 'null' ){
      
            Swal.fire({
             width: '30%',
             icon: 'error',
             fontsize: '8px',
             text: 'Decommission Date cannot be null!',
             //footer: '<a href>Why do I have this issue?</a>'
           }) 
           } else{
             axios.post('/claritybqm/reportFetchJ/?scriptName=DC_CRAC_UPDATE', values).then((res) => {
               //console.log('success to update : ', res.data,values);   
                 if(res.data == "success"){
                   //setopenSnackBar(true);
                 }
               })
                 .catch((err) => {
                 //console.log('failed to update : ', err);
                 });
            }
        }else{
          Swal.fire({
            text: 'Are you sure to Update this CRAC ' + values.CRAC_NAME + '?',
              }).then((result) => {
  
            if(result.value){
                axios.post('/claritybqm/reportFetchJ/?scriptName=DC_CRAC_UPDATE', values
                ).then((res) => {
                  //console.log('success to create : ', res.data);   
                    if(res.data === "success"){
                        setOpenSnackBar(true);
                        getJournalList();
                        props.history.push('/ListCRAC');
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
          values['CRAC_UPDATED_BY'] = auth.authenticated.username ? auth.authenticated.username.toUpperCase() : "TMIMS";

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
    CRACJurnal={CRACJurnal}
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