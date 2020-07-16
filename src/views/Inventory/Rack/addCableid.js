import React, { Component } from 'react';
import { Badge, Button, Card, CardBody, CardFooter, CardHeader, Col, Form, FormGroup, Label, Row, Input,InputGroupAddon } from 'reactstrap';
import '../css/style.css';

class CableID extends Component {
  constructor(props) {
    super(props);
    this.state={
       cableID : [],
       backgcolor: "#b3d9ff",
       btnName: "Add Cable ID",
       flagAddBtn: true
      }
    
  }

componentDidMount(){
  //console.log('value',this.props.value);
  if(this.props.value){
    this.setState({
      cableID: [this.props.values]
    })
  }
}

componentWillReceiveProps(props){
  //console.log('value',props.value);
  if(props.value){
    this.setState({
      cableID: [props.value]
    })
  }
 
}
   
addCableID(e){
  
    this.setState({
        cableID: [...this.state.cableID, ''],
        flagAddBtn: false
    })
}

handleChange(e, index){
  //console.log('handleChange',e,index);
  this.state.cableID[index] = e.target.value;
  this.setState({
    cableID: this.state.cableID
  })
}

handleRemove(index){

    this.state.cableID.splice(index,1)
    this.setState({
        cableID: this.state.cableID
      })

}
render(){
//console.log('render',this.props.value);
var dataCable = this.state.cableID.toString()
return(
    <div className="animated fadeIn" >
        <Label>Cable ID</Label>
        <Input 
        type="text" 
        id="RACK_CABLE_ID" 
        name="RACK_CABLE_ID" 
        style={{ backgroundColor: this.state.backgcolor}}  
        value={dataCable} 
        placeholder="Click button Add Cable ID"
        readOnly />
        <br/>
        
        {
            this.state.cableID.map((cable,index)=>{
                return(<div key={index} hidden={this.state.flagAddBtn}>
                        <InputGroupAddon addonType="prepend">
                        <Input 
                        value={cable}
                        onChange={(e)=> this.handleChange(e,index)} 
                        />
                        <Button color="danger" onClick={()=> this.handleRemove(index)}>x</Button>
                        </InputGroupAddon>
                        <hr/>
                </div>)
            })
           
            
        }
        <Button color="primary" onClick={(e)=> this.addCableID(e)}>{ !this.state.cableID.length ? this.state.btnName : "Add More"}</Button>
  </div>
    );
}
}

export default (CableID);