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
    const [optionSite, setOptionSite]= useState({});
    const [optionLocation, setoptionLocation ] = useState({});
    const [openSnackBar, setopenSnackBar] = useState(false);
    const [hasError1, setHasError1] = useState(false);
    const [hasError2, setHasError2] = useState(false);
    const [hasError3, setHasError3] = useState(false);
    const [hasError4, setHasError4] = useState(false);

    useEffect(() => {

      fetch('/claritybqm/reportFetch/?scriptName=DC_SITE')
      .then(response => response.json())
      .then((site) => 
      {  
        setOptionSite({site})                   
      }
      );


    },[props]);

      //to handle form submit validation
      const onSubmit = (e)=> 
      {
          e.preventDefault();
         
          var $inputs = $('#formRack :input');//get form values
          var username = localStorage.getItem('username').toUpperCase();
  
          var values = {};
          $inputs.each(function () {
              if ($(this).is(':radio') == true || $(this).is(':checkbox') == true){
                values[this.name] = $('input[name=' + $(this).attr('name') + ']:checked').val() == undefined ? "" : $('input[name=' + $(this).attr('name') + ']:checked').val();
                    } 
                    else {
                values[this.name] = $(this).val() == undefined ? "" : $(this).val();
              }
              values['RACK_ID'] = '';
              values['RACK_CONTRACTUAL_POWER'] = '';
              values['RACK_INSERT_BY'] = username ? username : "TMIMS_FORM";

           });
             
              if(values.SITE_NAME ){
                setHasError1(false);
                }
                if(values.LOCN_NAME){
                  setHasError2(false);
                }
                if(values.RACK_ROOM ){
                  setHasError3(false);
                  }
                if(values.RACK_COMM_DT){
                  setHasError4(false);
                }
              


              /** validate value is null */
              if(!values.SITE_NAME ){
                setHasError1(true);
              }
              if(!values.LOCN_NAME){
                setHasError2(true);
              }
              if(!values.RACK_ROOM ){
                setHasError3(true);
              }
              if(!values.RACK_COMM_DT){
                setHasError4(true);
              }
  
          if ( values.SITE_NAME && values.LOCN_NAME && values.RACK_ROOM && values.RACK_COMM_DT){

            axios.post('/claritybqm/reportFetchJ/?scriptName=DC_RACK_CREATE', values).then((res) => {
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
      
        var $inputs = $('#formRack :input');//get form values

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
        //console.log('propsFormCreare',values);
        
        ///filter location based on selected site
        if(values.SITE_NAME){
        
          fetch('/claritybqm/reportFetch/?scriptName=DC_LOCATION&site='+ values.SITE_NAME)
          .then(response => response.json())
          .then((loc) => 
          {  
            setoptionLocation({loc})          
          }
          );
  
      }


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
              optionSite={optionSite} 
              optionLocation={optionLocation} 
              values={formValues} 
              onSubmit={onSubmit} 
              onChange={handleChange}
              flagDecommDate={true}
              hideRackID={true}
              hasError1={hasError1}
              hasError2={hasError2}
              hasError3={hasError3}
              hasError4={hasError4}
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