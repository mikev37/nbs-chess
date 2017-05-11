import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Link } from 'react-router';
import cookie from 'react-cookie';
import LoginPanel from './components/LogIn.js.jsx'


var App = React.createClass({
  componentWillMount() {
    console.log(cookie.load('userId'));
    this.state =  { userId: cookie.load('userId') };
  },
  onLogin(userId) {
    console.log("The username is "+userId);
    console.log(userId);
    this.setState({ userId });
    cookie.save('userId', userId, { path: '/' });
  },
  onLogout() {
    cookie.remove('userId', { path: '/' });
  },
  render: function() {
    if (!this.state.userId) {
      return <LoginPanel onSuccess={this.onLogin.bind(this)} />;
    }
    return <Dashboard userId={this.state.userId} children={this.props.children} />;
  }
});



var Dashboard = React.createClass({
  
  render: function() {
    const userId = this.props.userId;
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <div className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
          <p><Link to="/">Home</Link></p>
          <p><Link to={`/user`}>User</Link></p>
          <p><Link to="/notexist">Not Exist</Link></p>
          {this.props.children}

        </div>
      </div>
    );
  }
  
});


export default App;