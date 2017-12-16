import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/css/react-bootstrap-table.css'
import tablePirse from './table.js';

class Lab4 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      consentCriterion: 0,
      criterionFromTable: 0
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
    if (randValues.length) {
      let consentCriterion = this.calculateСonsentСriterion(areas, numbersInInterval, probabilities)
      let criterionFromTable = tablePirse[numbersInInterval.length - 1][7];
      this.setState({
        consentCriterion,
        criterionFromTable
      })
    }

  }

  calculateСonsentСriterion = (areas, numbersInInterval, probabilities) => {
    let temp = 0;
    for (let i = 0; i < probabilities.length; i++) {
      temp += (Math.pow((numbersInInterval[i] - probabilities.length * probabilities[i].P), 2) / probabilities.length * probabilities[i].P);
    }
    return temp;
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
        <h4> Лабораторная работа №4
        Статистическая проверка гипотезы о законе
        распределения случайной гипотезы по критерию согласия (критерию Пирсона).</h4>
        {
          (randValues.length && probabilities.length) ?
            <div>
              <span>Случайная величина X:  {randValues.join(';')} </span>
              <br />
              <span>Вычисляемое X  {this.state.consentCriterion} </span>
              <br />
              <span>X из таблицы {this.state.criterionFromTable} </span>
              <br/>
              <span> X > X из таблицы? {((this.state.consentCriterion -  this.state.criterionFromTable) > 0).toString()} </span>
              <br/>
              <span>{((this.state.consentCriterion -  this.state.criterionFromTable) > 0) ? "Гипотеза отвергается" : "Гипотеза не отвергается" } </span>
            </div>
            : "Выполните работы 1 и 3"
        }
      </div>
    );
  }
}

export default Lab4;
