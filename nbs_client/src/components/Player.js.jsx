import React, { Component } from 'react';
import ChessPiece from './ChessPiece.js.jsx';
import ChessLine from './ChessLine.js.jsx';
import cookie from 'react-cookie';


/**TODO**/
var Player= React.createClass({
  componentWillMount() {
    this.state =  { error:"",loaded:false,user:null };
    this.load();
  },
  load(){
    var that = this;
    fetch("/service/game/get" , {
	        method: 'POST',
	        headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
	        body: JSON.stringify({
	          'game_id': that.props.params.gameid,
	        })
      })
      .then(function(data){
          return data.json();
      })
      .then(function(data){
          
      })
      .catch(function(err){
        console.log('Send Error (.Y.)', err);  
      })
  },
  render() {
    /** Initial variables**/
    var user_id = this.props.user_id;
    
    /** Loaded state transformation **/
    if(this.state.loaded){
      
    }

    /** Render step **/
    return (
      <div>
      </div>
    );
  }
});




export default Player;
