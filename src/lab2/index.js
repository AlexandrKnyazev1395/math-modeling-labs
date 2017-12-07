import React, { Component } from 'react'

export default class componentName extends Component {
  constructor(props) {
    super(props)

    this.state = {
      coefAssimmetry: 0,
      eccess: 0
    }
  }

  componentWillMount = () => {
    let { randValues, dispersion, mathDelayEstimate, meanSquareDeviation } = this.props.params;
    let coefAssimmetry = this.calculateCoefAssimetry(randValues, dispersion, mathDelayEstimate);
    let eccess = this.calculateEccess(randValues, dispersion, mathDelayEstimate);
    this.setState({
      coefAssimmetry: coefAssimmetry,
      eccess: eccess
    })

  }


  calculateCoefAssimetry = (randValues, dispersion, mathDelayEstimate, meanSquareDeviation) => {
    
    let temp = 0;
    randValues.forEach(x => {
      temp += Math.pow((x - mathDelayEstimate), 3)
    });
    temp = (temp / ((randValues.length - 1) * Math.pow(dispersion, 3)));
    return temp;
  }

  calculateEccess = (randValues, dispersion, mathDelayEstimate) => {
    let temp = 0;
    randValues.forEach(x => {
      temp += Math.pow((x - mathDelayEstimate), 4)
    });
    let qrtD = Math.sqrt(dispersion)
    temp = (temp / ((randValues.length - 1) * Math.pow(qrtD, 4))) - 3;
    return temp;
  }

  render() {

    return (
      <div className="lab">
        <h4>Лабораторная работа №2.
        Статистическая проверка гипотезы о законе распределения случайной
        величины с помощью коэффициента асимметрии А и эксцесса Е.</h4>
        {
          this.props.params.randValues.length ?
            <div>
              <span>Случайная величина X:  {this.props.params.randValues.join(';')} </span>
              <br />
              <br />
              <span>Коэффициент асимметрии А:  {this.state.coefAssimmetry} </span>
              <br />
              <br />
              <span>Эксцесс Е:  {this.state.eccess} </span>
            </div>
            : "Сгенерируйте последовательность в лабораторной работе 1"
        }

      </div>
    )
  }
}
