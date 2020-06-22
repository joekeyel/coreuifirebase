import React, {useEffect,useState} from 'react';
import FormComponent from './FormComponent';
import { Badge, Button, Card, CardBody, CardFooter, CardHeader, Col, Form, FormGroup, Label, Row,Input } from 'reactstrap';
import auth from '../../../auth';
import $ from 'jquery';
import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar'; 
import Alert from '@material-ui/lab/Alert';
import { connect } from "react-redux";

const EditForm = (props) => {

    const [formValues, setformValues]= useState({});
    const [openSnackBar, setopenSnackBar] = useState(false);
 
    //props.fetchLocation();//fetch data from saga

      var location = props.location
      var locnID = props.locId
      var filterLoc = Object.values(location).filter(loc=> loc.LOCN_ID == locnID )
 
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
          values['LOCN_CREATED_BY'] = auth.authenticated.username ? auth.authenticated.username.toUpperCase() : "TMIMS";

       });


      if ( values.LOCN_ID && values.LOCN_NAME){

        axios.post('/claritybqm/reportFetchJ/?scriptName=DC_LOCATION_UPDATE', values).then((res) => {
         //console.log('success to update : ', res.data,values);   
           if(res.data == "success"){
             setopenSnackBar(true);
           }
         })
           .catch((err) => {
           console.log('failed to update : ', err);
           });

      }     
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
        values['LOCN_CREATED_BY'] = auth.authenticated.username ? auth.authenticated.username.toUpperCase() : "TMIMS";
     });

    setformValues({values}); // save form value to state
  

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
    locId={props.match.params.id}
    data={formValues}
    location={props}
    onSubmit={onSubmit} 
    onChange={handleChange}
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

const mapStateToProps = state => {
  return {
    location: state.location
  };
};

const mapDispachToProps = dispatch => {
  return {

      fetchLocation: () => dispatch({ type: "FETCH_DCLOCATION" }),

  };
};

export default connect(mapStateToProps,mapDispachToProps)(EditForm);