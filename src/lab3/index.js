import React, { Component } from 'react';

import laplaceTable from './laplaceTable';

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
      if(probabilitiesSumm < 0.989) {
        let different = 0.989 - probabilitiesSumm;
        let everyPlus = different / probabilities.length;
        for(let el of probabilities) {
          el.P += everyPlus;
        }
      }
      let check = 0;
      for (let el of probabilities) {
        check += el.P;
      }
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
    if(positive> 5) {
      positive = 5;
    }
    positive = Math.round(parseFloat(positive) * 100) / 100
    let laplaceValue = +laplaceTable[positive];
    //don't tell anyone about this terrible)))
    if (laplaceValue === NaN) {
      for (let y = 0; y < 10; y++) {
        positive+= 0.01;
        laplaceValue = laplaceTable[positive];
        if (laplaceValue !== NaN) {
          break;
        }
      }
    }
    if(x < 0) {
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

    areas = areas.join(' - ');
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
              <span> Координаты интервалов (округлено) : {areas} </span>
            </div>
            : "Сгенерируйте последовательность в лабораторной работе 1"
        }
      </div>
    );
  }
}

export default Lab3;
