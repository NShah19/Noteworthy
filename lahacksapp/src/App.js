import React, { Component } from 'react';
import logo from './logo.svg';
import {Link, Switch, Route, HashRouter as Router } from 'react-router-dom'

import Firepad from './'
import './App.css';

class Intro extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Intro</h1>
        </header>
        <p className="App-intro">
          About notes blah blah.
        </p>
      </div>
    );
  }
}


class Notes extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Notes Section</h1>
        </header>
        <iframe width='80%' height='500px' title="try0" src="./firepad/examples/richtext.html"></iframe>
      </div>
    );
  }
}

class App extends React.Component {
 render(){
     return <Router><Switch>
      <Route path='/notes' render={() => <Notes/> }/>
      <Route path='/about' render={() => <Intro/> }/>
     <Route exact path='/' render={() => <Notes/> }/>
   </Switch></Router>
 }
}

export default App;
