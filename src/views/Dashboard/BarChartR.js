import React, { useState, useEffect } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
const axios = require('axios');


const BarChart = (props) => {
    const [allData, setAllData] = React.useState([]);
    const [barData, setBarData] = React.useState([]);

    useEffect(() => {
        axios.get('/claritybqm/reportFetch/?scriptName=DC_DASHBOARD_INFO')
            .then(function (response) {
                // handle success
                //console.log('data',response);
                if (response.data.data) {
                    makeBar(response.data.data);
                }; 
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }, [props]);

    const makeBar = (data) => {
        var tempData = [],
            tempLabel = [];

        data.map((d) => {
            console.log('d',d);
            
            tempData.push(d.SPACE_AVAILABLE);
           // tempData.push(d.SPACE_UTILIZED);
            tempLabel.push(d.LOCN_NAME);
        });

        const state = {
            labels: tempLabel,
            datasets: [
                {
                    label: 'My First dataset',
                    backgroundColor: 'rgba(255,99,132,0.2)',
                    borderColor: 'rgba(255,99,132,1)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                    hoverBorderColor: 'rgba(255,99,132,1)',
                    data: tempData
                },
            ]
        };
        setBarData(state);

    }
    return (
        <Grid container>
            <Grid item xs={12} lg={6}>
                <h2>SUMMARY OF DC LOCATION SPACE UTILIZATION</h2>
                <Bar 
                    data={barData} 
                />
            </Grid>
        </Grid>
    );
}

export default BarChart;