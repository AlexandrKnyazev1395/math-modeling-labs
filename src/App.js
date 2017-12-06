import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Lab1 from './lab1'
import Lab2 from './lab2';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      randValues: [],
      mathDelayEstimate: 0,
      meanSquareDeviation: 0,
      dispersion: 0,
    }
  }


  setParams = (params) => {
    this.setState(params)
  }

  render() {
    const title = "Лабораторная работа №1. Оценка числовых характеристик случайных величин и построение эмпирических  законов их распределения."
    return (
      <Router>
        <div>
          <header className="App-header">
            <h2 className="App-title">Welcome to my math model loboratory tasks</h2>
            <img src={logo} className="App-logo" alt="logo" />
            <ul className="App-routes">
              <li><Link to="/">Лабораторная 1</Link></li>
              <li><Link to="/lab2">Лабораторная 2</Link></li>
            </ul>
          </header>

          <Route exact path="/" render={(props) => (
            <Lab1 {...props} setParams={this.setParams} />
          )} />
          <Route exact path="/lab2" render={(props) => (
            <Lab2 {...props} setParams={this.setParams} params={this.state} />
          )} />
        </div>
      </Router>

    );
  }
}
export default App;
