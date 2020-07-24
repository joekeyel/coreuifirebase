import React, {useEffect,useState} from 'react';
import FormComponent from './FormComponent';
import { Badge, Button, Card, CardBody, CardFooter, CardHeader, Col, Form, FormGroup, Label, Row,Input } from 'reactstrap';
import auth from '../../../auth';
import $ from 'jquery';
import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar'; 
import Alert from '@material-ui/lab/Alert';

const CreateForm = (props) => {

  const [formValues, setformValues]= useState({});
  const [openSnackBar, setopenSnackBar] = useState(false);
  const [hasError1, setHasError1] = useState(false);
  const [hasError2, setHasError2] = useState(false);

     //to handle form submit validation
     const onSubmit = (e)=> 
     {
         e.preventDefault();
        
         var $inputs = $('#formNtwBand :input');//get form values
 
         var values = {};
         $inputs.each(function () {
             if ($(this).is(':radio') == true || $(this).is(':checkbox') == true){
               values[this.name] = $('input[name=' + $(this).attr('name') + ']:checked').val() == undefined ? "" : $('input[name=' + $(this).attr('name') + ']:checked').val();
                   } 
                   else {
               values[this.name] = $(this).val() == undefined ? "" : $(this).val();
             }
            
          });
            
             if(values.SITE_NAME ){
               setHasError1(false);
               }
               if(values.NTW_COMM_DT){
                 setHasError2(false);
               }
             

             /** validate value is null */
             if(!values.SITE_NAME ){
               setHasError1(true);
             }
             if(!values.NTW_COMM_DT){
               setHasError2(true);
             }
           
         if ( values.SITE_NAME && values.NTW_COMM_DT){

           axios.post('/claritybqm/reportFetchJ/?scriptName=DC_NETWORK_BANDWIDTH_CREATE', values).then((res) => {
            //console.log('success to save : ', res.data);   
              if(res.data == "success"){
                setopenSnackBar(true);
              }
            })
              .catch((err) => {
              console.log('failed to save : ', err);
              });

         }
         
    }  

   const handleChange = (e) => {
     
       var $inputs = $('#formNtwBand :input');//get form values

       var values = {};
       $inputs.each(function () {
           if ($(this).is(':radio') == true || $(this).is(':checkbox') == true){
             values[this.name] = $('input[name=' + $(this).attr('name') + ']:checked').val() == undefined ? "" : $('input[name=' + $(this).attr('name') + ']:checked').val();
                 } 
                 else {
             values[this.name] = $(this).val() == undefined ? "" : $(this).val();
           }
        });

   
     


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
              actionForm={'CREATE'}
              hiddenDecomm={true}
              onSubmit={onSubmit} 
              onChange={handleChange}
              flagDecommDate={true}
              NtwIDFlag={true}
              hasError1={hasError1}
              hasError2={hasError2}
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