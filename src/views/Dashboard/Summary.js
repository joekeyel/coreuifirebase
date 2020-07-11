import React, { useState, useEffect } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import Container from '@material-ui/core/Container';
import {Grid, Paper, Box } from '@material-ui/core';
import 'chartjs-plugin-datalabels';
import { Badge, Button,CardTitle,CardText, Card, CardBody, CardFooter, CardHeader,Progress, Col, Form, FormGroup, Label, Row, Input } from 'reactstrap';

const axios = require('axios');

const Summary = (props) => {
    const [allData, setAllData] = React.useState([]);
    const [cardColor, setCardColor] = React.useState('');
    const [barData, setBarData] = React.useState([]);

    useEffect(() => {
        axios.get('/claritybqm/reportFetch/?scriptName=DC_DASHBOARD_INFO')
            .then(function (response) {
                //console.log('d',response.data);
            
                // handle success
                if (response.data) {
                    setAllData(response.data);
                    makeBar(response.data);
                };
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    });


    const makeBar = (data) => {
        //console.log('makeBar',data);
        
        var spaceData = [],
            spaceData2 = [],
            spaceLabel = [],
            spaceLabel2 = [];

        data.map((d) => {
            spaceData.push(d.SPACE_AVAILABLE);
            spaceData2.push(d.SPACE_UTILIZED);
            spaceLabel.push(d.LOCN_NAME);
            spaceLabel2.push(d.SPACE_CAPACITY);
        });

        const arbitraryStackKey = "stack"; /**to make stack bar */

        const state = {
            labels: spaceLabel,
            datasets: [
                {
                    stack: arbitraryStackKey,
                    label: 'Available DC Space (sqft)',
                    indexLabel: spaceLabel2,
                    backgroundColor: 'rgba(0, 20, 187)',
                    data: spaceData
                  },
                  {
                    stack: arbitraryStackKey,
                    label: 'Utilize DC Space (sqft)',
                    backgroundColor: 'rgba(248, 111, 27)',
                    data: spaceData2   
                  }
                // {
                //     label: 'Available DC Space (sqft)',
                //     backgroundColor: 'rgba(0, 20, 187)',
                //     borderColor: 'rgba(255,99,132,1)',
                //     borderWidth: 1,
                //     //hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                //     //hoverBorderColor: 'rgba(255,99,132,1)',
                //     data: spaceData
                // },
                // {
                //     label: 'Utilize DC Space (sqft)',
                //     backgroundColor: 'rgba(248, 111, 27)',
                //     borderColor: 'rgba(255,99,132,1)',
                //     borderWidth: 1,
                //     //hoverBackgroundColor: 'rgba(182, 248, 115)',
                //     //hoverBorderColor: 'rgba(255,99,132,1)',
                //     data: spaceData2
                // }
            ]
        };
        setBarData(state);

    }

    const options = {
        scales: {
             xAxes: [{
                 stacked: true,
             }],
             yAxes: [{
                 stacked: true,
                 index: true
             }]
         },
         plugins: {/**display label inside bar */
            datalabels: {
               display: true,
               color: 'white',
            }
         },
         animation: {
            duration: 0,
            // onComplete: function () {
            //     var ctx = props.chart.ctx;
            //     ctx.font = props.Chart.helpers.fontString(props.Chart.defaults.global.defaultFontFamily, 'normal', props.Chart.defaults.global.defaultFontFamily);
            //     ctx.fillStyle = "black";
            //     ctx.textAlign = 'center';
            //     ctx.textBaseline = 'bottom';
        
            //     this.data.datasets.forEach(function (dataset)
            //     {
            //         for (var i = 0; i < dataset.data.length; i++) {
            //             for(var key in dataset._meta)
            //             {
            //                 var model = dataset._meta[key].data[i]._model;
            //                 ctx.fillText(dataset.data[i], model.x, model.y - 5);
            //             }
            //         }
            //     });
            // }
          },
     }
    
    return (<Container>
            <Grid container>
                <h2>SUMMARY OF DC LOCATION SPACE UTILIZATION</h2>
                <Bar 
                    data={barData} 
                    options={options}
                />
            </Grid>
            <Grid container>
            <h2>EXECUTIVE SUMMARY FOR DCO 1</h2>
            <Grid container>
                <Grid item>
                <h5>Lagend:</h5>
                        <Row>
                            <Col>
                                <Card body color="success" style={{width:'180px', height: '5px', alignItems: 'center'}}><CardTitle><h6>Below 70%</h6></CardTitle></Card>
                            </Col>
                            <Col>
                                <Card body color="warning" style={{width:'180px', height: '5px', alignItems: 'center'}}><CardTitle><h6>Between 70%-98%</h6></CardTitle></Card>
                            </Col>
                            <Col>
                                <Card body color="danger" style={{width:'180px', height: '5px', alignItems: 'center'}}><CardTitle><h6>90% and above</h6></CardTitle></Card>
                            </Col>
                        </Row>
               </Grid>
             </Grid>
            <Grid container>
                    {
                        allData.map((d,index)=>{
                            
                            var colorPower = "";
                            var colorSpace = "";
                            var colorRack = "";
                            
                            if(d.POWER_UTILIZATION < '75%'){
                                colorPower= "success" 
                            }
                            else if(d.POWER_UTILIZATION >= '75%'){
                                colorPower= "warning"
                            }
                            else if(d.POWER_UTILIZATION >= '90%'){
                                colorPower= "danger"
                            }

                            if(d.SPACE_UTILIZATION < '75%'){
                                colorSpace= "success"  
                            }
                            else if(d.SPACE_UTILIZATION >= '75%'){
                                colorSpace= "warning"
                            }
                            else if(d.SPACE_UTILIZATION >= '90%'){
                                colorSpace= "danger"
                            }

                            if(d.RACK_UTILIZATION < '75%'){
                                colorRack= "success"   
                            }
                            else if(d.RACK_UTILIZATION >= '75%'){
                                colorRack= "warning"
                            }
                            else if(d.RACK_UTILIZATION >= '90%'){
                                colorRack= "danger"
                            }
                        
                    
                            return(
                                <Grid item xs={12} sm={12} md={4} lg={4}>
                                    <Card id={d.LOCN_ID} style={{padding: '10px'}}>
                                        <div className="animated fadeIn" style={{padding: '10px'}}>
                                        <h6>{d.LOCN_NAME}</h6>
                                        <Card body id={d.POWER_UTILIZATION} color={colorPower} style={{marginBottom: '0px'}}>
                                            <Row>
                                                <Col xs='4'>
                                                    <CardTitle><h3><strong>{d.POWER_UTILIZATION}</strong></h3></CardTitle>
                                                    <CardText>Used & Reserved Power</CardText>
                                                </Col>
                                                <Col xs='2'>
                                                    <CardText>{d.POWER_UTILIZATION}</CardText>{ /** used power percentage */}
                                                    <CardText>{d.POWER_UTILIZATION}</CardText>{ /** reserved power percentege*/}
                                                </Col>
                                                <Col xs='3'>
                                                    <CardText>{d.POWER_INSERVICE} (kW)</CardText>{ /** used power */}
                                                    <CardText>{d.POWER_RESERVED} (kW)</CardText>{ /** reserved power */}
                                                    <CardText>{d.POWER_CAPACITY} (kW)</CardText>{ /** capacity power */}
                                                </Col>
                                                <Col xs='3'>
                                                    <CardText>Used</CardText>{ /** used power */}
                                                    <CardText>Reserved</CardText>{ /** reserved power */}
                                                    <CardText>Capacity</CardText>{ /** capacity power */}
                                                </Col>
                                            </Row>
                                        </Card>
                                        <Card body id={d.SPACE_UTILIZATION} color={colorSpace} style={{marginBottom: '0px'}}>
                                            <Row>
                                                <Col xs='4'>
                                                    <CardTitle><h3><strong>{d.SPACE_UTILIZATION}</strong></h3></CardTitle>
                                                    <CardText>Used Space</CardText>
                                                </Col>
                                                <Col xs='2'>
                                                {/**empty */}
                                                </Col>
                                                <Col xs='3'>
                                                    <CardText>{d.SPACE_UTILIZED} (sqft)</CardText>{ /** used space */}
                                                    <CardText>{d.SPACE_CAPACITY} (sqft)</CardText>{ /** capacity space */}
                                                </Col>
                                                <Col xs='3'>
                                                    <CardText>Used</CardText>{ /** used space */}
                                                    <CardText>Capacity</CardText>{ /** capacity space */}
                                                </Col>
                                            </Row>
                                        </Card>
                                        <Card body id={d.RACK_UTILIZATION} color={colorRack} style={{marginBottom: '0px'}}>
                                            <Row>
                                                <Col xs='4'>
                                                    <CardTitle><h3><strong>{d.RACK_UTILIZATION}</strong></h3></CardTitle>
                                                    <CardText>Used Rack</CardText>
                                                </Col>
                                                <Col xs='2'>
                                                {/**empty */}
                                                </Col>
                                                <Col xs='3'>
                                                    <CardText>{d.RACK_UTILIZED} (onos)</CardText>{ /** used rack */}
                                                    <CardText>{d.RACK_CAPACITY} (onos)</CardText>{ /** capacity rack */}
                                                </Col>
                                                <Col xs='3'>
                                                    <CardText>Used</CardText>{ /** used rack */}
                                                    <CardText>Capacity</CardText>{ /** capacity rack */}
                                                </Col>
                                            </Row>
                                        </Card>
                                    </div>
                                    </Card>
                            </Grid>
                            )
                        })
                    }
             </Grid>
        </Grid>
        </Container>);
}
export default Summary;