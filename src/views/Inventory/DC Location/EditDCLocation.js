import React, {useEffect,useState} from 'react';
import FormComponent from './FormComponent';
import { Badge, Button, Card, CardBody, CardFooter, CardHeader, Col, Form, FormGroup, Label, Row,Input } from 'reactstrap';
import auth from '../../../auth';
import $ from 'jquery';
import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar'; 
import Alert from '@material-ui/lab/Alert';
import { connect } from "react-redux";
import Swal from 'sweetalert2';

const EditForm = (props) => {

    const [formValues, setformValues]= useState({});
    const [openSnackBar, setopenSnackBar] = useState(false);
    const [dataLocID, setdataLocID] = useState({});
    const [changeFlag,setchangeFlag] = useState(false);
    const [dcSiteList, setDCSiteList] = React.useState([]);
    const [dcSite, setDCSite] = React.useState([]);
    const [locType, setLocType] = React.useState([]);
    const [selectedCommDate, setSelectedCommDate] = useState(null)
    const [selectedDecommDate, setSelectedDecommDate] = useState(null)
    const [fileFloorPlan, setfileFloorPlan] = useState(null)
    const [fileRackUtil, setfileRackUtil] = useState(null)
    const [blobFloorPlan, setblobFloorPlan] = useState(null)
    const [blobRackUtil, setblobRackUtil] = useState(null)
    const [FsizeFloorPlan, setFsizeFloorPlan] = useState(null)
    const [FsizeRackUtil, setFsizeRackUtil] = useState(null)
    const [FnameFloorPlan, setFnameFloorPlan] = useState(null)
    const [FnameRackUtil, setFnameRackUtil] = useState(null)
    //props.fetchLocation();//fetch data from saga
  useEffect(()=>{
    fetch('/claritybqm/reportFetch/?scriptName=DC_LOCATION&locn_id=' + props.match.params.id)
    .then(response => response.json())
    .then((location) => 
    {  
        //console.log('loc',location);
        setdataLocID(location[0]);    
        setDCSite([location[0].SITE_NAME]);
        setblobFloorPlan(location[0].FLOOR_PLAN);
        setblobRackUtil(location[0].RACK_UTILIZATION);     
        setSelectedCommDate(location[0].LOCN_COMM_DT);
        setSelectedDecommDate(location[0].LOCN_DECOMM_DT);       
        setFnameFloorPlan(location[0].LOCN_FLOORPLAN_FILENAME); 
        setFnameRackUtil(location[0].LOCN_RACK_UTIL_FILENAME); 
        setFsizeFloorPlan(location[0].LOCN_FLOORPLAN_FILESIZE); 
        setFsizeRackUtil(location[0].LOCN_RACK_UTIL_FILESIZE); 
    }
    );
  },[])

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
          values['LOCN_UPDATED_BY'] = auth.authenticated.username ? auth.authenticated.username.toUpperCase() : "TMIMS";

       });


      if ( values.LOCN_ID && values.LOCN_NAME){

        axios.post('/claritybqm/reportFetchJ/?scriptName=DC_LOCATION_UPDATE', values).then((res) => {
          console.log('success to update : ', res.data,values);   
            if(res.data == "success"){
              setopenSnackBar(true);
            }
          })
            .catch((err) => {
            //console.log('failed to update : ', err);
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
        values['LOCN_FLOORPLAN_BLOB'] = blobFloorPlan;
        values['LOCN_FLOORPLAN_FILENAME'] = FnameFloorPlan;
        values['LOCN_FLOORPLAN_FILESIZE'] = FsizeFloorPlan;
        values['LOCN_RACK_UTIL_BLOB'] = blobRackUtil;
        values['LOCN_RACK_UTIL_FILENAME'] = FnameRackUtil;
        values['LOCN_RACK_UTIL_FILESIZE'] = FsizeRackUtil;
        values['LOCN_STATE'] = '';
        values['LOCN_UPDATED_BY'] = auth.authenticated.username ? auth.authenticated.username.toUpperCase() : "TMIMS";
     });

    setformValues({values}); // save form value to state
    setchangeFlag(true); // pass flag == true when value has change

   // console.log('values',values);
    

    if(e.target.name == 'LOCN_FLOOR_PLAN'){
      //console.log('files',e.target.files);
      var files = e.target.files
      var fileSize = files[0].size
 
     if(fileSize >= 1048576){
   
         Swal.fire({
           width: '30%',
           icon: 'error',
           title: 'Oops Image size too large!',
           text: 'Please make sure your image size not more than 10MB.',
           fontsize: '10px'
           //footer: '<a href>Why do I have this issue?</a>'
         })     

     }
     else if(fileSize  >= 1024){
       setfileFloorPlan(URL.createObjectURL(files[0]));
       setFnameFloorPlan(files[0].name);
       setFsizeFloorPlan(fileSize);
     }

      var reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onload = (e) =>{
          var fileFloor = e.target.result//{file: e.target.result}
          //console.log('onload',fileData);
         setblobFloorPlan(fileFloor);
      }
    }

    if(e.target.name == 'LOCN_RACK_UTILIZATION'){
     //console.log('files',e.target.files);
     var files = e.target.files
     var fileSize = files[0].size

     if(fileSize >= 1048576){
   
         Swal.fire({
           width: '30%',
           icon: 'error',
           title: 'Oops Image size too large!',
           text: 'Please make sure your image size not more than 10MB.',
           fontsize: '10px'
           //footer: '<a href>Why do I have this issue?</a>'
         })     

     }
     else if(fileSize  >= 1024){
       setfileRackUtil(URL.createObjectURL(files[0]));
       setFnameRackUtil(files[0].name);
       setFsizeRackUtil(fileSize);
     }
         
     var reader = new FileReader();
     reader.readAsDataURL(files[0]);
     reader.onload = (e) =>{
         var fileRack = e.target.result//{file: e.target.result}
         //console.log('onload',fileRack);
         setblobRackUtil(fileRack);
     }
   }


   }
  
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
    imgPreviewFloor={blobFloorPlan}
    imgPreviewRack={blobRackUtil}
    changeFlag={changeFlag}
    btnReset={true}
    dcSite={dcSite}
    selectedCommDate={selectedCommDate}
    selectedDecommDate={selectedDecommDate}
    FileNameFloor={FnameFloorPlan}
    FileNameRack={FnameRackUtil}
    FileSizeFloor={FsizeFloorPlan}
    FileSizeRack={FsizeRackUtil}
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