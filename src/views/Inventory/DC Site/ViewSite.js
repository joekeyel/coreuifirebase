import React, {useEffect,useState} from 'react';
import FormComponent from './FormComponent';


const ViewForm = (props) => {

    const [siteData, setsiteData] = useState({});
   

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
      }
      );
    }

  },[props])
   
    return (<div className="animated fadeIn">
            <FormComponent 
               actionForm={'VIEW'} 
               siteID={props.match.params.id}
               data={siteData}
               approveFlag={false}
               btnReset={true}
            />
        </div >);

}

export default ViewForm;