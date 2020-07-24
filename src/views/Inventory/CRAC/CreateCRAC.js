import React, {useEffect,useState} from 'react';
import FormComponent from './FormComponent';
import { Badge, Button, Card, CardBody, CardFooter, CardHeader, Col, Form, FormGroup, Label, Row,Input } from 'reactstrap';
import auth from '../../../auth';
import $ from 'jquery';
import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar'; 
import Alert from '@material-ui/lab/Alert';
import Swal from 'sweetalert2';

const CreateForm = (props) => {
 
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [hasError1, setHasError1] = useState(false);
  const [hasError2, setHasError2] = useState(false);
  const [hasError3, setHasError3] = useState(false);
  const [hasError4, setHasError4] = useState(false);
  //console.log('createComp', props);

  //submit function
  const onSubmit = (e)=> {

    e.preventDefault();

    //get values from FormComponent UPS
    var $inputs = $('#formCRAC :input');//get form values
    var username = localStorage.getItem('username').toUpperCase();
  
    var values = {};
  
    $inputs.each(function () {
        if ($(this).is(':radio') === true || $(this).is(':checkbox') === true){
          values[this.name] = $('input[name=' + $(this).attr('name') + ']:checked').val() === undefined ? "" : $('input[name=' + $(this).attr('name') + ']:checked').val().toUpperCase();
          } 
      else {
            values[this.name] = $(this).val() === undefined ? "" : $(this).val().toUpperCase();
        }
      
        values['CRAC_COMM_DT'] = "";
        values['CRAC_DECOMM_DT'] = "";
        values['CRAC_CREATED_BY'] = username ? username : "TMIMS";
     });

     //console.log('onSubmit', values );

          /** validate value is not null */
          if(values.SITE_NAME ){
            setHasError1(false);
          }
          if(values.LOCN_NAME){
            setHasError2(false);
          }
          if(values.CRAC_NAME){
            setHasError3(false);
          }
          if(values.CRAC_COMM_DT){
            setHasError4(false);
          }


        /** validate value is null */
        if(!values.SITE_NAME ){
          setHasError1(true);
        }
        if(!values.LOCN_NAME){
          setHasError2(true);
        }
        if(!values.CRAC_NAME){
          setHasError3(true);
        }
        if(!values.CRAC_COMM_DT){
          setHasError4(true);
        }

     if(values.CRAC_NAME !== "" && values.SITE_NAME !== "" && values.LOCN_NAME !== "" ){

            Swal.fire({
              text: 'Are you sure to Create this CRAC ' + values.CRAC_NAME + '?',
          }).then((result) => {

              if(result.value){
                  axios.post('/claritybqm/reportFetchJ/?scriptName=DC_CRAC_CREATE', values
                  ).then((res) => {
                    //console.log('success to create : ', res.data);   
                      if(res.data === "success"){
                          setOpenSnackBar(true);
                      } else{/**error from bqm api DC_CRAC_CREATE */
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

  const handleClose = () =>{
    setOpenSnackBar(false);
  }
  const handleChange = () => {

     //get values from FormComponent UPS
     var $inputs = $('#formCRAC :input');//get form values

     var values = {};
       
     $inputs.each(function () {
         if ($(this).is(':radio') === true || $(this).is(':checkbox') === true){
           values[this.name] = $('input[name=' + $(this).attr('name') + ']:checked').val() === undefined ? "" : $('input[name=' + $(this).attr('name') + ']:checked').val();
               } 
        else {
           values[this.name] = $(this).val() === undefined ? "" : $(this).val();
         }

         if(values.CRAC_DESC){
          values['CRAC_DESC'] = $(this).val() === undefined ? "" : $(this).val();
         }
      });
 
      //console.log('onChange',values);
      
  }

    return (<div className="animated fadeIn">
            <FormComponent 
              actionForm={'CREATE'} 
              onSubmit={onSubmit}
              onChange={handleChange}
              hasError1={hasError1}
              hasError2={hasError2}
              hasError3={hasError3}
              hasError4={hasError4}
              btnReset={false}
              MaintenanceFlag={true}
            />
            <Snackbar
                  open={openSnackBar} autoHideDuration={1500} onClose={handleClose} 
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                    <Alert variant="filled"  onClose={handleClose} severity="success" >
                       Data has been Created.
                    </Alert>
              </Snackbar>
        </div >);

}

export default CreateForm;