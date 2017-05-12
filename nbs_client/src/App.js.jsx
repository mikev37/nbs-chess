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
          <h2>NBS Chess</h2>
        </div>
        <div className="">
          <nav className="navbar navbar-inverse">
            <div className="navbar-header">
              <Link className="navbar-brand" to={`/user`}>NBSChess</Link>
            </div>
            <ul className="nav navbar-nav">
              <li><Link to="/">Create New Game</Link></li>
              <li><Link to='/games'>Public Games</Link></li>
            </ul>
          </nav>
          {this.props.children}

        </div>
      </div>
    );
  }
  
});


export default App;