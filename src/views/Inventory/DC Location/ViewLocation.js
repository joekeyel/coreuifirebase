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

const ViewForm = (props) => {

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
        console.log('loc',location);
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

  return (<div className="animated fadeIn">
  <FormComponent 
    actionForm={'VIEW'} 
    locId={props.match.params.id}
    imgPreviewFloor={blobFloorPlan}
    imgPreviewRack={blobRackUtil}
    btnReset={true}
    dcSite={dcSite}
    location={dataLocID}
    selectedCommDate={selectedCommDate}
    selectedDecommDate={selectedDecommDate}
    FileNameFloor={FnameFloorPlan}
    FileNameRack={FnameRackUtil}
    FileSizeFloor={FsizeFloorPlan}
    FileSizeRack={FsizeRackUtil}
    uploadBtn={true}
  />

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

export default connect(mapStateToProps,mapDispachToProps)(ViewForm);