import React, {useEffect,useState} from 'react';
import FormComponent from './FormComponent';
import auth from '../../../auth';
import $ from 'jquery';
import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar'; 
import Alert from '@material-ui/lab/Alert';
import Swal from 'sweetalert2';

const CreateForm = (props) => {

    const [formValues, setformValues]= useState({});
    const [openSnackBar, setOpenSnackBar] = useState(false);
    const [formIsValid, setformIsValid] = useState('');
    const [flagSubmit, setflagSubmit] = useState(true);
    const [fileFloorPlan, setfileFloorPlan] = useState(null)
    const [fileRackUtil, setfileRackUtil] = useState(null)
    const [blobFloorPlan, setblobFloorPlan] = useState(null)
    const [blobRackUtil, setblobRackUtil] = useState(null)
    const [FsizeFloorPlan, setFsizeFloorPlan] = useState(null)
    const [FsizeRackUtil, setFsizeRackUtil] = useState(null)
    const [FnameFloorPlan, setFnameFloorPlan] = useState(null)
    const [FnameRackUtil, setFnameRackUtil] = useState(null)
    const [hasError1, setHasError1] = useState(false);
    const [hasError2, setHasError2] = useState(false);
   

      //to handle form submit validation
      const onSubmit = (e)=> 
      {
          e.preventDefault();
         
          var $inputs = $('#formLocation :input');//get form values
  
          var values = {};
          $inputs.each(function () {
              if ($(this).is(':radio') === true || $(this).is(':checkbox') === true){
                values[this.name] = $('input[name=' + $(this).attr('name') + ']:checked').val() === undefined ? "" : $('input[name=' + $(this).attr('name') + ']:checked').val();
                    } 
                    else {
                values[this.name] = $(this).val() === undefined ? "" : $(this).val();
              }
               values['LOCN_FLOORPLAN_BLOB'] = blobFloorPlan;
               values['LOCN_FLOORPLAN_FILENAME'] = FnameFloorPlan;
               values['LOCN_FLOORPLAN_FILESIZE'] = FsizeFloorPlan;
               values['LOCN_RACK_UTIL_BLOB'] = blobRackUtil;
               values['LOCN_RACK_UTIL_FILENAME'] = FnameRackUtil;
               values['LOCN_RACK_UTIL_FILESIZE'] = FsizeRackUtil;
               values['LOCN_STATE'] = '';
               values['LOCN_CREATED_BY'] = 'DCOADMIN';
           });

          // console.log('values',values);// save form value to state
          
                if(values.SITE_NAME ){
                  setHasError1(false);
                }
                if(values.LOCN_NAME){
                  setHasError2(false);
                }
              


              /** validate value is null */
              if(!values.SITE_NAME ){
                setHasError1(true);
              }
              if(!values.LOCN_NAME){
                setHasError2(true);
              }
            
            
          if(values.SITE_NAME && values.LOCN_NAME){
           Swal.fire({
            text: 'Are you sure to Create this DC Location ' + values.LOCN_NAME + '?',
            }).then((result) => {

                if(result.value){
                    axios.post('/claritybqm/reportFetchJ/?scriptName=DC_LOCATION_CREATE', values
                    ).then((res) => {
                      //console.log('success to create : ', res.data);   
                        if(res.data === "success"){
                            setOpenSnackBar(true);
                        }
            
                    })
                    .catch((err) => {
                      console.log('failed to create : ', err);
                    });
              
                }

            })
       
          }
     }  

    
     const handleChange = (e) => {
       
         var $inputs = $('#formLocation :input');//get form values
 
         var values = {};
         
         $inputs.each(function () {
             if ($(this).is(':radio') === true || $(this).is(':checkbox') === true){
               values[this.name] = $('input[name=' + $(this).attr('name') + ']:checked').val() === undefined ? "" : $('input[name=' + $(this).attr('name') + ']:checked').val();
                   } 
                   else {
               values[this.name] = $(this).val() === undefined ? "" : $(this).val();
             }
             values['LOCN_FLOORPLAN_BLOB'] = blobFloorPlan;
             values['LOCN_FLOORPLAN_FILENAME'] = FnameFloorPlan;
             values['LOCN_FLOORPLAN_FILESIZE'] = FsizeFloorPlan;
             values['LOCN_RACK_UTIL_BLOB'] = blobRackUtil;
             values['LOCN_RACK_UTIL_FILENAME'] = FnameRackUtil;
             values['LOCN_RACK_UTIL_FILESIZE'] = FsizeRackUtil;
             values['LOCN_STATE'] = '';
             values['LOCN_CREATED_BY'] = 'DCOADMIN';
          });
 
         setformValues(values); // save form value to state

         //console.log('valuesChanges',values);
         //console.log('files',e.target.name);

         if(e.target.name === 'LOCN_FLOOR_PLAN'){
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

         if(e.target.name === 'LOCN_RACK_UTILIZATION'){
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
               actionForm={'CREATE'} 
               siteID = {props.match.params.id}
               location={''} 
               data={formValues} 
               onSubmit={onSubmit} 
               onChange={handleChange}
               formIsValid={formIsValid}
               flagSubmit={flagSubmit}
               imgPreviewFloor={fileFloorPlan}
               imgPreviewRack={fileRackUtil}
               flagDecommDate={true}
               FileNameFloor={FnameFloorPlan}
               FileNameRack={FnameRackUtil}
               FileSizeFloor={FsizeFloorPlan}
               FileSizeRack={FsizeRackUtil}
               hasError1={hasError1}
               hasError2={hasError2}
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