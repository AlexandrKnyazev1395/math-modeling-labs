import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/css/react-bootstrap-table.css'

let tableValueNineNine = 3.18;

class Lab5 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      X: undefined,
      Y: undefined
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
    let { randValuesX, randValuesY } = this.randValueGenerating(10);
    let mathDelayEstimateX = this.calculateMathDelayEstimate(randValuesX, 10);
    let mathDelayEstimateY = this.calculateMathDelayEstimate(randValuesY, 10);
    
    let meanSquareDeviationX = this.calculateMeanSquareDeviation(randValuesX, 10, mathDelayEstimateX);
    let meanSquareDeviationY = this.calculateMeanSquareDeviation(randValuesY, 10, mathDelayEstimateY);
    
    let dispersionX = this.calculateDispersion(meanSquareDeviationX);
    let dispersionY = this.calculateDispersion(meanSquareDeviationY);
   
    let rangeOfVariationX = this.calculateRangeOfVariation(randValuesX);
    let rangeOfVariationY = this.calculateRangeOfVariation(randValuesY);


    let areaSizeX = this.calculateAreaSize(10, rangeOfVariationX);
    let areaSizeY = this.calculateAreaSize(10, rangeOfVariationY);

    let areasX = this.calculateAreas(randValuesX, 10, areaSizeX);
    let areasY = this.calculateAreas(randValuesY, 10, areaSizeY);
    
    let xN = areasX.length;
    let xY = areasY.length;
    let  myF = dispersionX > dispersionY ? dispersionX/dispersionY : dispersionY/dispersionX;
    let different = myF - tableValueNineNine;
    
    this.setState({
      X: randValuesX, 
      Y: randValuesY,
      meanSquareDeviationX,
      meanSquareDeviationY,
      dispersionX,
      dispersionY,
      myF,
      different
    });

  }
  randValueGenerating = (n) => {
    let randValuesX = [];
    let randValuesY = [];
    for (let i = 0; i < n; i++) {
      //let temp1 = Math.abs(((Math.random() + Math.random() + Math.random() + Math.random() + Math.random() + Math.random()) - 3) / 3);
      //let temp2 = Math.abs(((Math.random() + Math.random() + Math.random() + Math.random() + Math.random() + Math.random()) - 3) / 3);
      randValuesX[i] = Math.floor(Math.random() * (15 - 1)) + 1;
      randValuesY[i] = Math.floor(Math.random() * (15 - 1) + 1)
    }
    return { randValuesX, randValuesY };
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
              <br/>
              <span>Дисперсия X {this.state.dispersionX} </span>
              <br/>
              <span>Дисперсия Y {this.state.dispersionY} </span>
              <br/>
              <span>F = {this.state.myF} </span>
              <br/>
              <span>F из таблицы = {tableValueNineNine} </span>
              <br/>
              <span> F > F из таблицы? {(this.state.different > 0).toString()} </span>
              <br/>
              <span>{this.state.different > 0 ? "Гипотеза отвергается" : "Гипотеза не отвергается" } </span>
            </div>
            : "Выполните работы 1 и 3"
        }
      </div>
    );
  }
}

export default Lab5;
