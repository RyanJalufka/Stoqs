import React, { Component } from 'react';
import {Line} from 'react-chartjs-2';

class Chart extends Component {

  render() {
    console.log('DATES: ', this.props.dates)
    console.log('PRICES: ', this.props.prices)

    const data = {
      labels: this.props.dates,
      datasets: [
        {
          fill: false,
          lineTension: 0,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 10,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 20,
          data: this.props.prices
        }
      ]
    };

    return (
      <div>
        <Line data={data} />
      </div>
    );
  }
}

export default Chart;