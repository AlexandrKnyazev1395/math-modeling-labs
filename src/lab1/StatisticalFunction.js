import React, { Component } from 'react';
import {Line} from 'react-chartjs-2';

export default class StatisticalSeries extends Component {
  makeData = () => {
    const { areas, numbersInInterval } = this.props;
    let labels = [];
    for (let index = 0; index < areas.length -1; index++) {
      let el1 = areas[index].toFixed(2);
      let el2 = areas[index + 1].toFixed(2);
      labels.push(`${el1} - ${el2}`); 
    }
    let data = [0]
    for (let y = 0; y < numbersInInterval.length; y++) {
      const element = numbersInInterval[y];
      let temp =  +(element/numbersInInterval.length).toFixed(2);
      let n = temp + data[(data.length-1)]
      data.push(n)
    };

    
    return {
      labels,
      datasets: [
        {
          label: 'Cтатистическая функция распределения',
          backgroundColor: 'rgba(91,255,131,0.5)',
          borderColor: 'rgba(91,255,131,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(91,255,131,0.8)',
          hoverBorderColor: 'rgba(91,255,131,1)',
          data: data,
        }
      ]
    }
  }

  render() {
    const data = this.makeData();
    return (
      <div>
          <Line data={data} width={15}
          height={4}/>
      </div>
    )
  }
}
