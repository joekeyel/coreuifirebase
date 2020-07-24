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
    const [openSnackBar, setopenSnackBar] = useState(false);
    const [siteData, setsiteData] = useState({});
    const [onChangeFlag, setonChangeFlag] = useState(false);
    const [hasError1, setHasError1] = useState(false);
    const [hasError2, setHasError2] = useState(false);
    const [hasError3, setHasError3] = useState(false);
    const [hasError4, setHasError4] = useState(false);
    const [hasError5, setHasError5] = useState(false);
    const [approvedSite,setApprovedSite] = useState("N");
    const [verifiedID,setverifiedID] = useState({});
    const [approveFlag, setapproveFlag] = useState(false);

  useEffect(()=>{
   // console.log('propEditePage',props.match.params);
    if(props.match.params.id){

      var id= props.match.params.id;
        
      fetch('/claritybqm/reportFetch/?scriptName=DC_SITE')
      .then(response => response.json())
      .then((site) => 
      {  
        var filter = Object.values(site).filter(site => site.SITE_ID == id);
        setsiteData(filter[0]);     
        setApprovedSite(filter.SITE_VERIFIED_TAG);  
      }
      );
    }

    if(props.match.params.approved){
      setapproveFlag(true);
      setApprovedSite('Y');
    }
    
    
  },[props])

   //to handle form submit validation
   const onSubmit = (e,type)=> 
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
            values['SITE_VERIFIED_TAG'] = approvedSite;
            //values['SITE_VERIFIED_BY'] = verifiedID;
            values['SITE_WORKGROUP'] = "DCO1";
            values['SITE_UPDATE_BY'] = username ? username : "TMIMS";
        });

        if(values.SITE_VERIFIED_BY){
          fetch('/claritybqm/reportFetch/?scriptName=DC_USER')
          .then(response => response.json())
          .then((user) => {
            
              //console.log('verified',verified[0].ID); 
              // if(user.user.length){
              //   var verified = Object.values(user.user).filter(u => u.NAME === values.SITE_VERIFIED_BY);
              //   setverifiedID(verified[0].ID);
              // }
              
          })
        
       }
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
       // console.log('approveFlag ', approveFlag);   
                if(type === 'delete'){
                  //console.log('delete');
                  if(values.SITE_DECOMM_DT === "" || values.SITE_DECOMM_DT === 'null' ){
                    
                  Swal.fire({
                    width: '30%',
                    icon: 'error',
                    fontsize: '8px',
                    text: 'Decommission Date cannot be null!',
                    //footer: '<a href>Why do I have this issue?</a>'
                  }) 
                  } else{
                    axios.post('/claritybqm/reportFetchJ/?scriptName=DC_SITE_UPDATE', values).then((res) => {
                      //console.log('success to update : ', res.data,values);   
                        if(res.data == "success"){
                          //setopenSnackBar(true);
                          props.history.push('/ListDCSite');
                        }
                      })
                        .catch((err) => {
                        //console.log('failed to update : ', err);
                        });
                  }
              
                }else{
                  axios.post('/claritybqm/reportFetchJ/?scriptName=DC_SITE_UPDATE', values
                  ).then((res) => {
                    //console.log('success to create ', res);   
                      if(res.data === "success"){
                       setopenSnackBar(true);
                       if(approveFlag === true){
                        setTimeout(function(){ props.history.push('/pendingApproval') }, 2000);
                       }else{
                        setTimeout(function(){ props.history.push('/ListDCSite') }, 2000);
                       }
                      }
                      else{
                       Swal.fire(
                         'ERROR!',
                          res.data.failed
                     )
                     } 
          
                  })
                  .catch((err) => {
                    console.log('failed to create ', err);
                  });
            
                }
       

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
           //values['SITE_VERIFIED_TAG'] = approvedSite;
           //values['SITE_VERIFIED_BY'] = verifiedID;
         }
      });

     setformValues(values); // save form value to state
    // console.log('handleChange',values);
     setonChangeFlag(true)

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
    values={formValues}
    siteID={props.match.params.id}
    data={siteData}
    onSubmit={onSubmit} 
    onChange={handleChange}
    onChangeFlag={onChangeFlag}
    hasError1={hasError1}
    hasError2={hasError2}
    hasError3={hasError3}
    hasError4={hasError4}
    hasError5={hasError5}
    approvedSite={approvedSite}
    approveFlag={approveFlag}
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

export default EditForm;