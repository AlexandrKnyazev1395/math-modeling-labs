import React, { Component } from 'react';
import StatisticalSeries from './StatisticalSeries';
import StatisticalFunction from './StatisticalFunction';

class Lab1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: 1,
      amountTests: 10,
      handleInputValue: "",
      randValues: this.props.params.randValues,
      dispersion: this.props.params.dispersion,
      mathDelayEstimate: this.props.params.mathDelayEstimate,
      meanSquareDeviation: this.props.params.meanSquareDeviation,
      rangeOfVariation: 0,
      areaSize: 0,
      areas:  this.props.params.areas,
      numbersInInterval: this.props.params.numbersInInterval
    }
    this.randValueGenerating = this.randValueGenerating.bind(this)
  }

  componentWillMount = () => {
    let randValues = this.state.randValues;
    if(!this.state.randValues.length) {
      randValues = this.randValueGenerating(this.state.amountTests);
      debugger;
      var mathDelayEstimate = this.calculateMathDelayEstimate(randValues, this.state.amountTests);
      var meanSquareDeviation = this.calculateMeanSquareDeviation(randValues, this.state.amountTests, mathDelayEstimate);
      var dispersion = this.calculateDispersion(meanSquareDeviation);
    }
    let rangeOfVariation = this.calculateRangeOfVariation(randValues);
    let areaSize = this.calculateAreaSize(this.state.amountTests, rangeOfVariation);
    let areas = this.calculateAreas(randValues, this.state.amountTests, areaSize);
    let numbersInInterval = this.calculateNumbersInInterval(randValues, this.state.amountTests, areas);
    if(!this.state.randValues.length) {
      this.props.setParams({
        randValues,
        mathDelayEstimate,
        meanSquareDeviation,
        dispersion,
        areas,
        numbersInInterval
      })
      this.setState({
        randValues,
        amountTests: randValues.length,
        mathDelayEstimate,
        meanSquareDeviation,
        dispersion,
        rangeOfVariation,
        areaSize,
        areas,
        numbersInInterval
      })
      return;
    }
    else {
      this.setState({
        rangeOfVariation,
        areaSize,
        areas,
        numbersInInterval
      });
    }

  }

  componentWillUpdate(nextProps, nextState) {
    if (nextState.randValues != this.state.randValues) {
      let mathDelayEstimate = this.calculateMathDelayEstimate(nextState.randValues, nextState.amountTests);
      let meanSquareDeviation = this.calculateMeanSquareDeviation(nextState.randValues, nextState.amountTests, mathDelayEstimate);
      let dispersion = this.calculateDispersion(meanSquareDeviation);
      let rangeOfVariation = this.calculateRangeOfVariation(nextState.randValues);
      let areaSize = this.calculateAreaSize(nextState.amountTests, rangeOfVariation);
      let areas = this.calculateAreas(nextState.randValues, nextState.amountTests, areaSize);
      let numbersInInterval = this.calculateNumbersInInterval(nextState.randValues, this.state.amountTests, areas);
      this.props.setParams({
        randValues: nextState.randValues,
        mathDelayEstimate,
        meanSquareDeviation,
        dispersion,
        areas,
        numbersInInterval
      })
      this.setState({
        amountTests: nextState.amountTests,
        mathDelayEstimate,
        meanSquareDeviation,
        dispersion,
        rangeOfVariation,
        areaSize,
        areas,
        numbersInInterval
      })
    }
  }

  changeMode = (e) => {
    var val = e.target.value;
    this.setState({
      mode: val
    })
  }

  changeHandleInput = (e) => {
    var val = e.target.value;
    var arrayNumbers = val.split(',');
    arrayNumbers = arrayNumbers.filter((el)=>{
      var reg = /\d/;
      if(reg.test(el)) {
        return true;
      }
    })
    this.setState({
      randValues: arrayNumbers,
      handleInputValue: val,
      amountTests: arrayNumbers.length
    })
  }

  changeRandValue = () => {
    this.setState({
      randValues: this.randValueGenerating(this.state.amountTests),
    })
  }

  changeAmountTests = (e) => {
    this.setState({
      amountTests: e.target.value
    })
  }

  randValueGenerating = (n) => {
    let randValues = [];
    for (let i = 0; i < n; i++) {
      randValues[i] = Math.floor(Math.random() * (15 - 1)) + 1;
    }
    return randValues;
  }

  calculateMathDelayEstimate = (randValues, amountTests) => {
    let mde;
    let summ = 0;
    for (let el of randValues) {
      summ += el;
    }
    mde = summ / amountTests;
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

  calculateRangeOfVariation = (randValues) => {
    return (Math.max.apply(null, randValues) - Math.min.apply(null, randValues));
  }

  calculateAreaSize = (amountTests, rangeOfVariation) => {
    return rangeOfVariation / (1 + 3.22 * Math.log(amountTests));
  }

  calculateAreas = (randValues, amountTests, areaSize) => {
    const minValue = Math.min.apply(null, randValues);
    let areas = [];
    for (let index = 0; index < amountTests; index++) {
      areas.push(minValue + index * areaSize)
    }
    return areas;
  }

  calculateNumbersInInterval = (randValues, amountTests, areas) => {
    let results = [];
    for (let index = 0; index < areas.length - 1; index++) {
      results.push(randValues.filter((el) => {
        let left = areas[index];
        let right = areas[index + 1];
        let res = left <= el && right > el;
        return res;
      }))
    }
    return results.map((el) => {
      return el.length;
    })
    //здесь теперь можем посчитать количество в каждом интервале
  }


  render() {
    let areas = this.state.areas.map((el, index) => {
      return el.toFixed(2)
    });
    areas = areas.join(' - ');

    return (
      <div className="lab">
        <h4> Лабораторная работа №1
      Оценка числовых характеристик случайных величин и построение эмпирических  законов их распределения.</h4>
        <label> Режим: </label>
        <select onChange={this.changeMode}>
          <option value="1">Генерация</option>
          <option value="2">Ручной ввод</option>
        </select>
        <br />
        <br />
        {
          this.state.mode == "1"
            ?
            <div>
              <label> Количество опытов: </label>
              <br />
              <input value={this.state.amountTests} onChange={this.changeAmountTests} />
              <button onClick={this.changeRandValue}> Обновить X </button>
            </div>
            : 
            <div>
              <label> Введите цифры через запятую: </label>
              <br />
              <input value={this.state.handleInputValue} onChange={this.changeHandleInput} />
            </div>

        }

        <br />
        <br />
        <span>Случайная величина X:  {this.state.randValues.join(';')} </span>
        <br />
        <br />
        <span> Оценка математического ожидания (выборочное среднее) : {this.state.mathDelayEstimate} </span>
        <br />
        <br />
        <span> Среднее квадратичное отклонение : {this.state.meanSquareDeviation} </span>
        <br />
        <br />
        <span> Оценка дисперсии : {this.state.dispersion} </span>
        <br />
        <br />
        <hr />
        <span> Размах варьирования : {this.state.rangeOfVariation} </span>
        <br />
        <br />
        <span> Размер участка (по формуле Стреджесса) : {this.state.areaSize} </span>
        <br />
        <br />
        <span> Координаты интервалов (округлено) : {areas} </span>
        <br />
        <br />
        <span> Статистический ряд </span>
        <StatisticalSeries
          areas={this.state.areas}
          numbersInInterval={this.state.numbersInInterval}
        />
        <br />
        <br />
        <span> Статистическая функция распределения </span>
        <StatisticalFunction
          areas={this.state.areas}
          numbersInInterval={this.state.numbersInInterval}
        />
      </div>
    );
  }
}

export default Lab1;
