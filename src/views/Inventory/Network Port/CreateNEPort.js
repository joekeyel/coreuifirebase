import React, {useEffect,useState} from 'react';
import FormComponent from './FormComponent';
import { Badge, Button, Card, CardBody, CardFooter, CardHeader, Col, Form, FormGroup, Label, Row,Input } from 'reactstrap';
import auth from '../../../auth';
import $ from 'jquery';
import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar'; 
import Alert from '@material-ui/lab/Alert';

const CreateForm = (props) => {

  const handleInputChange =() =>{


  }
    return (<div className="animated fadeIn">
            <FormComponent 
              actionForm={'CREATE'} 
              onChange={handleInputChange}
            />
            {/* <Snackbar
                  open={openSnackBar} autoHideDuration={1500} onClose={handleClose} 
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                    <Alert variant="filled"  onClose={handleClose} severity="success" >
                       Data has been Crerated.
                    </Alert>
              </Snackbar> */}
        </div >);

}

export default CreateForm;