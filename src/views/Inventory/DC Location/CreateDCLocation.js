import React, {useEffect,useState} from 'react';
import FormComponent from './FormComponent';
import auth from '../../../auth';
import $ from 'jquery';
import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar'; 
import Alert from '@material-ui/lab/Alert';

const CreateForm = (props) => {

    const [formValues, setformValues]= useState({});
    const [optionSite, setOptionSite]= useState({});
    const [optionLocation, setoptionLocation ] = useState({});
    const [openSnackBar, setopenSnackBar] = useState(false);
    const [formIsValid, setformIsValid] = useState('');
    const [flagSubmit, setflagSubmit] = useState(true);
    const [borderColor, setBorderColor] = useState("");
    const [siteErrorMsg, setSiteErrorMsg] = useState("");

      //to handle form submit validation
      const onSubmit = (e)=> 
      {
          e.preventDefault();
         
          var $inputs = $('#formLocation :input');//get form values
  
          var values = {};
          $inputs.each(function () {
              if ($(this).is(':radio') == true || $(this).is(':checkbox') == true){
                values[this.name] = $('input[name=' + $(this).attr('name') + ']:checked').val() == undefined ? "" : $('input[name=' + $(this).attr('name') + ']:checked').val();
                    } 
                    else {
                values[this.name] = $(this).val() == undefined ? "" : $(this).val();
              }
              // values['RACK_ID'] = '';
              // values['RACK_CONTRACTUAL_POWER'] = '';
              // values['RACK_INSERT_BY'] = auth.authenticated.username ? auth.authenticated.username.toUpperCase() : "TMIMS_FORM";

           });

           console.log('values',values);// save form value to state
           InputValidation(values);// create function to validate inputs form
           
  
          
     }  

     const InputValidation = (values)=>{
      // console.log('InputValidation',values);
 
         //variable to validate input (true/false)
         let formIsValid = true;
 
          //SITE_NAME
          if(values.SITE_NAME == ""){
           formIsValid = false;
           setSiteErrorMsg("DC Site cannot be empty!");
           setBorderColor("solid red");
           
        }if(values.SITE_NAME){
            formIsValid = true;
            setSiteErrorMsg("");
            setBorderColor("");
        }
   
       
         setformIsValid(formIsValid);
         setflagSubmit(true);
 
        return formIsValid;
       
      }
 
     const handleChange = (e) => {
       
         var $inputs = $('#formLocation :input');//get form values
 
         var values = {};
         
         $inputs.each(function () {
             if ($(this).is(':radio') == true || $(this).is(':checkbox') == true){
               values[this.name] = $('input[name=' + $(this).attr('name') + ']:checked').val() == undefined ? "" : $('input[name=' + $(this).attr('name') + ']:checked').val();
                   } 
                   else {
               values[this.name] = $(this).val() == undefined ? "" : $(this).val();
             }
          });
 
         setformValues(values); // save form value to state
 
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
               siteID = {props.match.params.id}
               location={''} 
               data={formValues} 
               onSubmit={onSubmit} 
               onChange={handleChange}
               formIsValid={formIsValid}
               flagSubmit={flagSubmit}
            />
            <Snackbar
                  open={openSnackBar} autoHideDuration={1500} onClose={handleClose} 
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                    <Alert variant="filled"  onClose={handleClose} severity="success" >
                       Data has been Crerated.
                    </Alert>
              </Snackbar>
        </div >);

}

export default CreateForm;