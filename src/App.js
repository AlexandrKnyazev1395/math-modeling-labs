import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Lab1 from './lab1';
import Lab2 from './lab2';
import Lab3 from './lab3';
import Lab4 from './lab4';
import Lab5 from './lab5';
import Lab6 from './lab6';
class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      randValues: [],
      mathDelayEstimate: 0,
      meanSquareDeviation: 0,
      dispersion: 0,
      areas: [],
      numbersInInterval: [],
      probabilities: []
    }
  }

  changeProbabilities = (probabilities) => {
    this.setState({
      probabilities : probabilities
    })
  }

  setParams = (params) => {
    this.setState(params)
  }

  render() {
    return (
      <Router>
        <div>
          <header className="App-header">
            <h2 className="App-title">Welcome to my math model loboratory tasks</h2>
            <img src={logo} className="App-logo" alt="logo" />
            <ul className="App-routes">
              <li><Link to="/">Лабораторная 1 </Link></li>
              <li><Link to="/lab2">Лабораторная 2 </Link></li>
              <li><Link to="/lab3">Лабораторная 3 </Link></li>
              <li><Link to="/lab4">Лабораторная 4 </Link></li>
              <li><Link to="/lab5">Лабораторная 5 </Link></li>
              <li><Link to="/lab6">Лабораторная 6 </Link></li>
            </ul>
          </header>

          <Route exact path="/" render={(props) => (
            <Lab1 {...props} params = {this.state} setParams={this.setParams} />
          )} />
          <Route exact path="/lab2" render={(props) => (
            <Lab2 {...props} setParams={this.setParams} params={this.state} />
          )} />
          <Route exact path="/lab3" render={(props) => (
            <Lab3 
              {...props}  
              setParams={this.setParams} 
              params={this.state} 
              changeProbabilities={this.changeProbabilities}
            />
          )} />
          <Route exact path="/lab4" render={(props) => (
            <Lab4
              {...props}  
              params={this.state} 
            />
          )} />
          <Route exact path="/lab5" render={(props) => (
            <Lab5
              {...props}  
              params={this.state} 
            />
          )} />
          <Route exact path="/lab6" render={(props) => (
            <Lab6
              {...props}  
              params={this.state} 
            />
          )} />
        </div>
      </Router>

    );
  }
}
export default App;
