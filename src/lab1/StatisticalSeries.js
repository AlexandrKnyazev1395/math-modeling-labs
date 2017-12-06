import React, { Component } from 'react';
import RC2 from '../../node_modules/react-chartjs-2';
import {Bar} from 'react-chartjs-2';

export default class StatisticalSeries extends Component {
  makeData = () => {
    const { areas, numbersInInterval } = this.props;
    let labels = [];
    for (let index = 0; index < areas.length -1; index++) {
      let el1 = areas[index].toFixed(2);
      let el2 = areas[index + 1].toFixed(2);
      labels.push(`${el1} - ${el2}`); 
    }
    let data = numbersInInterval.map((el) => {
      let n = el/numbersInInterval.length;
      return n;
    })
    
    return {
      labels,
      datasets: [
        {
          label: 'Гистограмма: статистический ряд',
          backgroundColor: 'rgba(0,185,216,0.5)',
          borderColor: 'rgba(0,185,216,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(0,185,216,0.8)',
          hoverBorderColor: 'rgba(0,185,216,1)',
          data: data,
        }
      ]
    }
  }

  render() {
    const data = this.makeData();
    return (
      <div>
          <Bar
          data={data}
          width={15}
          height={4}
          />
      </div>
    )
  }
}
