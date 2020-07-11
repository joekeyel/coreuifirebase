import React, {Component, useEffect,useState} from 'react';
import FormComponent from './FormComponent';
import { Badge, Button, Card, CardBody, CardFooter, CardHeader, Col, Form, FormGroup, Label, Row,Input } from 'reactstrap';
import auth from '../../../auth';
import $ from 'jquery';
import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar'; 
import Alert from '@material-ui/lab/Alert';
import { connect } from "react-redux";

export default class EditForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
        formValues: {},
        openSnackBar: false,
        dataLocID: {},
        fileFloorPlan: {},
        fileRackUtil: {},
        blobFloorPlan: {},
        blobRackUtil: {},
        FsizeFloorPlan: {},
        FsizeRackUtil:{},

    }
    this.uploadSingleFile = this.uploadSingleFile.bind(this)
    this.upload = this.upload.bind(this)
}
  
    const [, setblobRackUtil] = useState(null)
    const [, setFsizeFloorPlan] = useState(null)
    const [, setFsizeRackUtil] = useState(null)
    const [FnameFloorPlan, setFnameFloorPlan] = useState(null)
    const [FnameRackUtil, setFnameRackUtil] = useState(null)
    const [changeFlag,setchangeFlag] = useState(false);
   
    //props.fetchLocation();//fetch data from saga

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
          values['LOCN_FLOORPLAN_BLOB'] = blobFloorPlan;
          values['LOCN_FLOORPLAN_FILENAME'] = FnameFloorPlan;
          values['LOCN_FLOORPLAN_FILESIZE'] = FsizeFloorPlan;
          values['LOCN_RACK_UTIL_BLOB'] = blobRackUtil;
          values['LOCN_RACK_UTIL_FILENAME'] = FnameRackUtil;
          values['LOCN_RACK_UTIL_FILESIZE'] = FsizeRackUtil;
          values['LOCN_STATE'] = '';
          //values['LOCN_CREATED_BY'] = 'DCOADMIN';
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
    setchangeFlag(true); // pass flag == true when value has change

    console.log('canges',values);
    if(e.target.name === 'LOCN_FLOOR_PLAN'){
      //console.log('files',e.target.files);
      if(e.target.files !== ""){
        var files = e.target.files
        setfileFloorPlan(URL.createObjectURL(files[0]));
        setFnameFloorPlan(files[0].name);
        setFsizeFloorPlan(files[0].size);
  
        var reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = (e) =>{
            var fileFloor = e.target.result//{file: e.target.result}
            //console.log('onload',fileData);
           setblobFloorPlan(fileFloor);
        }
      }
      
    }

    if(e.target.name === 'LOCN_RACK_UTILIZATION'){
     //console.log('files',e.target.files);
     if(e.target.files !== ""){
      var files = e.target.files
      setfileRackUtil(URL.createObjectURL(files[0]));
      setFnameRackUtil(files[0].name);
      setFsizeRackUtil(files[0].size);
 
      var reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onload = (e) =>{
          var fileRack = e.target.result//{file: e.target.result}
          //console.log('onload',fileData);
          setblobRackUtil(fileRack);
    }
    
    }
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
    actionForm={'EDIT'} 
    locId={props.match.params.id}
    data={formValues}
    location={dataLocID}
    onSubmit={onSubmit} 
    onChange={handleChange}
    imgPreviewFloor={fileFloorPlan}
    imgPreviewRack={fileRackUtil}
    changeFlag={changeFlag}
    btnReset={true}
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