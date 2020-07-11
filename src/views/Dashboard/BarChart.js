import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  BarSeries,
  Title,
  Legend,
} from '@devexpress/dx-react-chart-material-ui';
import { Stack, Animation } from '@devexpress/dx-react-chart';

const Root = props => (
  <Legend.Root
    {...props}
    style={{
      display: 'grid',
      gridTemplateColumns: 'auto auto auto',
      margin: 'auto',
    }}
  />
);


export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: [
        {
          location: this.props.data[4]['LOCN_NAME'],
          spaceAvailable: this.props.data[4]['SPACE_UTILIZED'],
          spaceUtilized: this.props.data[4]['SPACE_UTILIZED']
        },
        {
          location: this.props.data[6]['LOCN_NAME'],
          spaceAvailable: this.props.data[6]['SPACE_UTILIZED'],
          spaceUtilized: this.props.data[6]['SPACE_UTILIZED']
        }
      ]
    };
  }

  componentDidMount(){
    console.log('componentDidMount',this.props);
    
  }
  render() {
    const { data: chartData } = this.state;

    return (
      <Paper>
        <Chart
          data={chartData}
        >
          <ArgumentAxis />
          <ValueAxis max={7} />
          <BarSeries
            name="Available DC Space (sqft)"
            valueField="spaceAvailable"
            argumentField="location"
          /> 
          <BarSeries
            name="Utilize DC Space (sqft)"
            valueField="spaceUtilized"
            argumentField="location"
          />
          <Animation />
          <Legend position="bottom" rootComponent={Root} />
          <Title text="SUMMARY OF DC LOCATION SPACA UTILIZATION" />
          <Stack  
            stacks={[
              { series: ['Available DC Space (sqft)', 'Utilize DC Space (sqft)'] },
            ]}
          />
        </Chart>
      </Paper>
    );
  }
}
