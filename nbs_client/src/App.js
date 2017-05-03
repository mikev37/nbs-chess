import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Link } from 'react-router';
import cookie from 'react-cookie';

var App = React.createClass({
  componentWillMount() {
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


var LoginPanel = React.createClass({
  
  componentWillMount() {
    this.state =  { userId: "",pwd: "",error:false };
  },
  handleUser(event) {
    this.setState({userId: event.target.value});
  },
  handlePwd(event) {
    this.setState({pwd: event.target.value});
  },
  onLogin() {
    var that = this;
    console.log("THAT U "+that.state.userId);
    console.log("THAT P "+that.state.pwd);
    fetch("/service/user/get" , {
	        method: 'POST',
	        headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
	        body: JSON.stringify({
	          'user_email': that.state.userId,
	          'password': that.state.pwd
	        })
      }).then(function(responce){
        return responce.json();
      })
      .then(function(data){
        that.props.onSuccess(data);
      })
      .catch(function(err){
        console.log('Fetch Error (.Y.)', err);  
      })
  },
  render: function() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>No BS Chess</h2>
        </div>
        <div className="App-intro">
            Username/Email: <input type="text" name="usr" value={this.state.userId} onChange={this.handleUser} ></input><br/>
            Password: <input type="text" name="pwd" value={this.state.pwd} onChange={this.handlePwd}></input><br/>
          <input type="submit" value="Submit" onClick={this.onLogin}></input><br/>
          <input type="submit" value="Sign Up"></input><br/>
          <input type="submit" value="Fuck Off"></input>
        </div>
      </div>
    );
  }
  
});

var Dashboard = React.createClass({
  
  render: function() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <div className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
          <p><Link to="/">Home</Link></p>

          <p><Link to="/user">User</Link></p>
          <p><Link to="/notexist">Not Exist</Link></p>
          {this.props.children}

        </div>
      </div>
    );
  }
  
});


export default App;