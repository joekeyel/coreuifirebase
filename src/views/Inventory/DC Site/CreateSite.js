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
    const [openSnackBar, setopenSnackBar] = useState(false);
    const [hasError1, setHasError1] = useState(false);
    const [hasError2, setHasError2] = useState(false);
    const [hasError3, setHasError3] = useState(false);
    const [hasError4, setHasError4] = useState(false);
    const [hasError5, setHasError5] = useState(false);
    const [formIsValid, setformIsValid] = useState('');
    const [flagSubmit, setflagSubmit] = useState(true);
    const [LovStreeType, setLovStreeType] = useState([]);
    const [LovState, setLovState] = useState([]);
    const [verifiedID,setverifiedID] = useState({});

      useEffect(()=>{
        //LOV street type 
        axios.get('/claritybqm/reportFetch/?scriptName=DC_LOV&type=STREET_TYPE'
        ).then((res) => {
            //console.log('STREET_TYPE',res);
            setLovStreeType(res.data);
        })
        .catch((err) => {
          console.log('failed to create ', err);
        });
  
        //LOV state 
        axios.get('/claritybqm/reportFetch/?scriptName=DC_LOV&type=STATE'
        ).then((res) => {
            //console.log('STREET_TYPE',res);
            setLovState(res.data);
        })
        .catch((err) => {
          console.log('failed to create ', err);
        });
  
      },[]);

      //to handle form submit validation
      const onSubmit = (e)=> 
      {
          e.preventDefault();
         
          var $inputs = $('#formSite :input');//get form values
          var username = localStorage.getItem('username').toUpperCase();
  
          var values = {};
          $inputs.each(function () {
              if ($(this).is(':radio') == true || $(this).is(':checkbox') == true){
                values[this.name] = $('input[name=' + $(this).attr('name') + ']:checked').val() == undefined ? "" : $('input[name=' + $(this).attr('name') + ']:checked').val();
                    } 
                    else {
                values[this.name] = $(this).val() == undefined ? "" : $(this).val();
              }
               //values['RACK_ID'] = '';
               values['SITE_WORKGROUP'] = "DCO1";
               values['SITE_VERIFIED_BY'] = verifiedID;
               values['SITE_CREATED_BY'] = username ? username : "TMIMS";
           });

 
           //console.log('values',values);
           setformValues(values); // save form value to state
           /** validate value is not null */
           if(values.SITE_NAME ){
            setHasError1(false);
            }
            if(values.ADDE_POSTCODE){
              setHasError2(false);
            }
            if(values.ADDE_STATE){
              setHasError3(false);
            }
            if(values.SITE_COMM_DT){
              setHasError4(false);
            }
            if(values.SITE_VERIFIED_BY){
              setHasError5(false);
            }


            /** validate value is null */
            if(!values.SITE_NAME ){
              setHasError1(true);
            }
            if(!values.ADDE_POSTCODE){
              setHasError2(true);
            }
            if(!values.ADDE_STATE){
              setHasError3(true);
            }
            if(!values.SITE_COMM_DT){
              setHasError4(true);
            }
            if(!values.SITE_VERIFIED_BY){
              setHasError5(true);
            }

          if(values.SITE_NAME && values.ADDE_POSTCODE && values.ADDE_STATE && values.SITE_COMM_DT && values.SITE_VERIFIED_BY){
            
            Swal.fire({
              text: "Are you sure to Create this DCSite " + values.SITE_NAME + '?',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Yes,create it!'
              }).then((result) => {

              if(result.value){
                  axios.post('/claritybqm/reportFetchJ/?scriptName=DC_SITE_CREATE', values
                  ).then((res) => {
                    //console.log('success to create ', res.data);   
                      if(res.data == "success"){
                        setopenSnackBar(true);
                        props.history.push('/ListDCSite');
                      }
          
                  })
                  .catch((err) => {
                    console.log('failed to create ', err);
                  });
            
              }

             })
          }
     }  

    

    const handleChange = (e) => {
      
        var $inputs = $('#formSite :input');//get form values

        var values = {};
      
        $inputs.each(function () {
            if ($(this).is(':radio') == true || $(this).is(':checkbox') == true){
              values[this.name] = $('input[name=' + $(this).attr('name') + ']:checked').val() == undefined ? "" : $('input[name=' + $(this).attr('name') + ']:checked').val();
                  } 
                  else {
              values[this.name] = $(this).val() == undefined ? "" : $(this).val();
            }
            values['SITE_VERIFIED_BY'] = verifiedID;
         });

        setformValues(values); // save form value to state
        console.log('handleChange',values);

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
               hasError1={hasError1}
               hasError2={hasError2}
               hasError3={hasError3}
               hasError4={hasError4}
               hasError5={hasError5}
               data={formValues} 
               onSubmit={onSubmit} 
               onChange={handleChange}
               formIsValid={formIsValid}
               flagSubmit={flagSubmit}
               flagDecommDate={true}
               LovStreeType={LovStreeType}
               LovState={LovState}
               flagApprover={true}
               approveFlag={false}
               flagVerified={true}
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