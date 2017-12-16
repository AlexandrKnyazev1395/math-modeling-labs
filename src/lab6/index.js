import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/css/react-bootstrap-table.css'

let tableValueNineNine = 3.18;

class Lab5 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      X: undefined,
      Y: undefined,
      Z: undefined
    }
  }

  componentWillMount = () => {
    let {
      randValues,
      dispersion,
      mathDelayEstimate,
      meanSquareDeviation,
      areas,
      numbersInInterval,
      probabilities
    } = this.props.params;
    let { randValuesX, randValuesY, randValuesZ } = this.randValueGenerating(10);
    let mathDelayEstimateX = this.calculateMathDelayEstimate(randValuesX, 10);
    let mathDelayEstimateY = this.calculateMathDelayEstimate(randValuesY, 10);
    let mathDelayEstimateZ = this.calculateMathDelayEstimate(randValuesZ, 10);
    
    let meanSquareDeviationX = this.calculateMeanSquareDeviation(randValuesX, 10, mathDelayEstimateX);
    let meanSquareDeviationY = this.calculateMeanSquareDeviation(randValuesY, 10, mathDelayEstimateY);
    let meanSquareDeviationZ = this.calculateMeanSquareDeviation(randValuesZ, 10, mathDelayEstimateY);

    
    let dispersionX = this.calculateDispersion(meanSquareDeviationX);
    let dispersionY = this.calculateDispersion(meanSquareDeviationY);
    let dispersionZ = this.calculateDispersion(meanSquareDeviationZ);
    let size = 10;
    let correlationXY = this.calculateCorrelation(
      {
        randValues: randValuesX, 
        mathDelayEstimate: mathDelayEstimateX
      }, 
      {
        randValues: randValuesY, 
        mathDelayEstimate: mathDelayEstimateY 
      }, 
      size 
    );
    let correlationXZ = this.calculateCorrelation(
      {
        randValues: randValuesX, 
        mathDelayEstimate: mathDelayEstimateX
      }, 
      {
        randValues: randValuesZ, 
        mathDelayEstimate: mathDelayEstimateZ 
      }, 
      size 
    );
    let correlationYZ = this.calculateCorrelation(
      {
        randValues: randValuesY, 
        mathDelayEstimate: mathDelayEstimateY
      }, 
      {
        randValues: randValuesZ,
        mathDelayEstimate: mathDelayEstimateZ 
      }, 
      size 
    );
    this.setState({
      X: randValuesX, 
      Y: randValuesY,
      Z: randValuesZ,
      meanSquareDeviationX,
      meanSquareDeviationY,
      dispersionX,
      dispersionY,
      correlationXY,
      correlationXZ,
      correlationYZ
    });

  }
  randValueGenerating = (n) => {
    let randValuesX = [];
    let randValuesY = [];
    let randValuesZ = [];
    for (let i = 0; i < n; i++) {
      randValuesX[i] = Math.floor(Math.random() * (15 - 1)) + 1;
      randValuesY[i] = Math.floor(Math.random() * (15 - 1) + 11);
      randValuesZ[i] = Math.floor(Math.random() * (15 - 1) + 1);
    }
    return { randValuesX, randValuesY, randValuesZ };
  }

  calculateRangeOfVariation = (randValues) => {
    return (Math.max.apply(null, randValues) - Math.min.apply(null, randValues));
  }

  calculateAreaSize = (amountTests, rangeOfVariation) => {
    return rangeOfVariation / (1 + 3.22 * Math.log(amountTests));
  }

  calculateAreas = (randValues, amountTests, areaSize) => {
    const minValue = Math.min.apply(null, randValues);
    const maxValue = Math.max.apply(null, randValues);
    let areas = [];
    for (let index = 0; (areas[areas.length -1 ] < maxValue || !areas.length); index++) {
      areas.push(minValue + index * areaSize)
    }
    return areas;
  }

  calculateMathDelayEstimate = (randValues, n) => {
    let mde;
    let summ = 0;
    for (let el of randValues) {
      summ += el;
    }
    mde = summ / n;
    return mde;
  }

  calculateMeanSquareDeviation = (randValues, amountTests, mathDelayEstimate) => {
    let tempSumm = 0;
    for (let el of randValues) {
      tempSumm += Math.pow((el - mathDelayEstimate), 2)
    }
    let meanSquareDeviation = Math.sqrt(tempSumm / randValues.length);
    return meanSquareDeviation;
  }

  calculateDispersion = (meanSquareDeviation) => {
    return Math.pow(meanSquareDeviation, 2);
  }

  calculateCorrelation = (p1, p2, size) => {
    let correlation = 0;
    let summ = 0;
    let summ2 = 0;
    let summ3 = 0;
    for(let i = 0; i < size; i++ ) {
      summ += (p1.randValues[i] - p1.mathDelayEstimate) * (p2.randValues[i] - p2.mathDelayEstimate);
    }
    for(let i = 0; i < size; i++ ) {
      summ2 += Math.pow( (p1.randValues[i] - p1.mathDelayEstimate), 2);
      summ3 += Math.pow( (p2.randValues[i] - p2.mathDelayEstimate), 2);
    }
    correlation = summ / (Math.sqrt(summ2 * summ3));
    return correlation;
  }

  render() {
    let {
      randValues,
      dispersion,
      mathDelayEstimate,
      meanSquareDeviation,
      areas,
      numbersInInterval,
      probabilities
    } = this.props.params;

    return (
      <div className="lab">
        <h4> Лабораторная работа №5
        Статистическая проверка гипотезы о равенстве дисперсий двух нормальных генеральных совокупностей. </h4>
        {
          (this.state.X && this.state.Y) ?
            <div>
              <span>Случайные величины:  {randValues.join(';')} </span>
              <br />
              <span>X  {this.state.X.join(';')} </span>
              <br />
              <span>Y  {this.state.Y.join(';')} </span>
              <br/>
              <span>Z  {this.state.Z.join(';')} </span>
              <br/>
              <br/>
              <span>Корреляция XY:  {this.state.correlationXY} </span>
              <br/>
              <span>Корреляция XZ:  {this.state.correlationXZ} </span>
              <br/>
              <span>Корреляция YZ:  {this.state.correlationYZ} </span>
          
              <br/>
            </div>
            : "Выполните работы 1 и 3"
        }
      </div>
    );
  }
}

export default Lab5;
