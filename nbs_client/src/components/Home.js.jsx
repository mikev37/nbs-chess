import React, { Component } from 'react';
import logo from '../logo.svg';

class Home extends Component {
  render() {
    return (
      <div className="Home">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Home</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
          {this.props.children}
        </p>
      </div>
    );
  }
}

export default Home;
