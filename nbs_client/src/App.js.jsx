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
    this.state =  { userId: "",pwd: "", eml: "",pwd2: "",error:false,error_message:"", signing:false };
  },
  handleUser(event) {
    this.setState({userId: event.target.value});
  },
  handlePwd(event) {
    this.setState({pwd: event.target.value});
  },
  
  handleEmail(event) {
    this.setState({eml: event.target.value});
  },
  handlePwd2(event) {
    this.setState({pwd2: event.target.value});
  },
 
  
  onSignUp() {
    if(!this.state.signing){
      this.setState({signing: true});  
      return;
    }
    var that = this;
    fetch("/service/user/new" , {
	        method: 'POST',
	        headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
	        body: JSON.stringify({
	          'user_name': that.state.userId,
	          'email': that.state.eml,
	          'password': that.state.pwd,
	          'password_2': that.state.pwd2
	        })
      })
      .then(function(data){
        console.log(data);
        if(data.status === 200)
          that.onLogin();
        else return data.text();
      })
      .then(function(data){
        if(data){
        that.setState({error:true , error_message:"Error: "+data});
        console.log(data);
        }
      })
      .catch(function(err){
         that.setState({error: true,error_message:"There was an error with your username or password"});
        console.log('Send Error (.Y.)', err);  
      })
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
        console.log(responce);
        return responce.json();
      })
      .then(function(data){
        that.props.onSuccess(data);
      })
      .catch(function(err){
        that.setState({error: true,error_message:"There was an error with your username or password"});
        console.log('Fetch Error (.Y.)', err);  
      })
  },
  render: function() {
    
    var error = [];
    const err_text = <div className="alert alert-danger">{this.state.error_message}</div>;
    
    var input_fields = <div>
            <small>Username/Email:</small> 
              <div className="input-group">
              <span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>
              <input type="text" className="form-control" name="usr" value={this.state.userId} onChange={this.handleUser} ></input><br/>
              </div>
            <small>Password:</small> 
              <div className="input-group">
              <span className="input-group-addon"><i className="glyphicon glyphicon-lock"></i></span>
              <input type="password" className="form-control" name="pwd" value={this.state.pwd} onChange={this.handlePwd}></input><br/>
              </div>
              </div>;
              
              
    var input_buttons = 
          <div className="well btn-group">
            <div className="form-group"> 
              <div className="form-group btn-group">
                <input type="button" className="btn btn-primary btn-block" value="Submit" onClick={this.onLogin}></input><br/>
                <input type="button" className="btn btn-primary btn-block" value="Sign Up" onClick={this.onSignUp}></input><br/>
              </div>
              <div className="form-group">
                <input type="submit" className="btn btn-block" value="Fuck Off"></input>
              </div>
            </div>
          </div>;
    
    if(this.state.error){
      error.push(err_text);
    }
    if(this.state.signing){
      input_fields = <div>
            <small>Username:</small> 
              <div className="input-group">
              <span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>
              <input type="text" className="form-control" name="usr" value={this.state.userId} onChange={this.handleUser} ></input><br/>
              </div>
            <small>Email:</small> 
              <div className="input-group">
              <span className="input-group-addon"><i className="glyphicon glyphicon-duplicate"></i></span>
              <input type="text" className="form-control" name="usr" value={this.state.eml} onChange={this.handleEmail} ></input><br/>
              </div>
            <small>Password:</small> 
              <div className="input-group">
              <span className="input-group-addon"><i className="glyphicon glyphicon-lock"></i></span>
              <input type="password" className="form-control" name="pwd" value={this.state.pwd} onChange={this.handlePwd}></input><br/>
              </div>
            <small>Repeat Password:</small> 
              <div className="input-group">
              <span className="input-group-addon"><i className="glyphicon glyphicon-lock"></i></span>
              <input type="password" className="form-control" name="pwd" value={this.state.pwd2} onChange={this.handlePwd2}></input><br/>
              </div>
              </div>;
      
          var input_buttons = 
          <div className="well btn-group">
            <div className="form-group"> 
              <div className="form-group btn-group">
                <input type="button" className="btn btn-primary btn-block" value="Submit" onClick={this.onSignUp}></input><br/>
              </div>
            </div>
          </div>;
    }
    
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>No BS Chess</h2>
        </div>
        <div className="App-intro alert">
          <form>
            {input_fields}
          <div className="alert">
            {error}
            {input_buttons}
          </div>
          </form>
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