import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/css/react-bootstrap-table.css'
import laplaceTable from './laplaceTable';

import './index.css';

class TableProbabilities extends Component {
  render() {
    let data1 = [];
    let data2 = [];

    data1 = this.props.probabilities.map( (el, index) => {
      data2.push(<td>{ el.P.toFixed(2) }</td>)
      return  <td> {el.a.toFixed(2) + ' - ' + el.b.toFixed(2)} </td>;
    })
    return (
      <table className="table-p">
        <tr>
          <td> Interval </td>
          {data1}
        </tr>
        <tr>
          <td> Probability </td>
          {data2}
        </tr>
      </table>
    )
  }
}

class Lab3 extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount = () => {
    let {
      randValues,
      dispersion,
      mathDelayEstimate,
      meanSquareDeviation,
      areas,
      numbersInInterval
    } = this.props.params;
    if (randValues.length) {
      let probabilities = this.calculateProbabilities(
        dispersion,
        mathDelayEstimate,
        meanSquareDeviation,
        areas
      )
      let probabilitiesSumm = 0;
      for (let el of probabilities) {
        probabilitiesSumm += el.P;
      }
      if (probabilitiesSumm < 0.989) {
        let different = 0.989 - probabilitiesSumm;
        let everyPlus = different / probabilities.length;
        for (let el of probabilities) {
          el.P += everyPlus;
        }
      }
      this.props.changeProbabilities(probabilities);
    }

  }

  calculateProbabilities = (dispersion, mathDelayEstimate, meanSquareDeviation, areas) => {
    let pairs = [];
    for (let i = 0; i < areas.length - 1; i++) {
      pairs[i] = [areas[i], areas[i + 1]]
    }
    let probabilities = [];
    for (let i = 0; i < pairs.length; i++) {
      let a = pairs[i][0];
      let b = pairs[i][1];
      let P = this.laplass((b - mathDelayEstimate) / meanSquareDeviation) - this.laplass((a - mathDelayEstimate) / meanSquareDeviation);
      probabilities.push({
        a, b, P
      });
    }
    return probabilities;
  }

  laplass(x) {
    let positive = Math.abs(x);
    if (positive > 5) {
      positive = 5;
    }
    positive = Math.round(parseFloat(positive) * 100) / 100
    let laplaceValue = +laplaceTable[positive];
    //don't tell anyone about this terrible)))
    if (laplaceValue === NaN) {
      for (let y = 0; y < 10; y++) {
        positive += 0.01;
        laplaceValue = laplaceTable[positive];
        if (laplaceValue !== NaN) {
          break;
        }
      }
    }
    if (x < 0) {
      laplaceValue = -Math.abs(laplaceValue)
    }
    return laplaceValue;
  }

  render() {
    let {
      randValues,
      dispersion,
      mathDelayEstimate,
      meanSquareDeviation,
      areas,
      numbersInInterval
    } = this.props.params;


    return (
      <div className="lab">
        <h4> Лабораторная работа №3
        Вычисление вероятности попадания случайной величины,
        распределенной по нормальному закону, на заданный участок.</h4>
        {
          randValues.length ?
            <div>
              <span>Случайная величина X:  {randValues.join(';')} </span>
              <br />
              <br />
              <span> Теоретические частоты попадания случайной величины в интервалы: </span>
              <TableProbabilities probabilities={this.props.params.probabilities}/>
            </div>
            : "Сгенерируйте последовательность в лабораторной работе 1"
        }
      </div>
    );
  }
}

export default Lab3;
