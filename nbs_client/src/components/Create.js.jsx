import React, { Component } from 'react';
import cookie from 'react-cookie';
import { browserHistory } from 'react-router';

var CreateGame = React.createClass({
  componentWillMount() {
    this.state =  { error:"",loaded:false,game:null, name:"",open:false };
    this.load();
  },
  load(){
    var that = this;
    
  },
  create(){
    var that = this;
    const usr_obj = cookie.load('userId');
    fetch("/service/game/new" , {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
        body: JSON.stringify({
          'name': that.state.name,
          'user_id': usr_obj._id,
          'open': that.state.open
            
        })
    })
    .then(function(data){
        console.log("hubbahubba");
        return data.json();
    })
    .then(function(data){
        console.log(data);
        browserHistory.push('/game/'+data._id);
    })
    .catch(function(err){
      that.setState({error:err});
      console.log('Send Error (0Y0)', err);  
    })
  },
    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
          [name]: value
        });
  },
  render() {
    /** Initial variables**/
    const usr_obj = cookie.load('userId');

    /** Loaded state transformation **/
    if(this.state.loaded){

    }


    /** Render step **/
    return (
      <div>
        <p>Creating Game</p>
        <hr/>
        <div className="row">
          <div className="col-md-4 tall">
          <form>
            <label>
              Name
              <input
                name="name"
                type="text"
                value={this.state.name}
                onChange={this.handleInputChange} />
            </label>
            <br />
            <label>
              Open:
              <input
                name="open"
                type="checkbox"
                checked={this.state.open}
                onChange={this.handleInputChange} />
            </label>
            <br />
          </form>
          <button onClick={this.create}>Create New Game</button>
          </div>
          <div className="col-md-6 col-md-push-1 well-lg grey">
          </div>
        </div>
      </div>
    );
  }
});

export default CreateGame;