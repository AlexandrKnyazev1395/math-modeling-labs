import React, { Component } from 'react';


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
    let probabilities = this.calculateProbabilities(
      dispersion, 
      mathDelayEstimate, 
      meanSquareDeviation,
      areas
    )
  }

  calculateProbabilities = () => {
    return 0;
  }

  componentWillUpdate(nextProps, nextState) {
    
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
