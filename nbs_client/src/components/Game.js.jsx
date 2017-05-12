import React, { Component } from 'react';
import ChessPiece from './ChessPiece.js.jsx';

var Game = React.createClass({
  componentWillMount() {
    this.state =  { loaded:false,game:null };
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
        if(data){
        console.log(data);
        that.setState({loaded:true,game:data});
        
        }
      })
      .catch(function(err){
        console.log('Send Error (.Y.)', err);  
      })
  },
  
  render() {
    var path = this.props.params.gameid;
    
    if(this.state.loaded){
      path = <GameBoard board_state={this.state.game.board_state}/>
    }
    
    return (
      <div>
        <p>Handling Game</p>
        <div className="row">
          <div className="col-md-6">
          {path}
          </div>
          <div className="col-md-6">
          
          </div>
        </div>
      </div>
    );
  }
});

var GameBoard = React.createClass({
  render() {
    const board_state = this.props.board_state;
    
    var board_display = []
    
    for(var i = 0; i < board_state.length; i++){
      var board_row = [];
      for(var j = 0; j < board_state[0].length; j++){
        var tile = board_state[i][j];
        
        board_row.push(<Tile color={tile.tile} piece={tile.piece} owner={tile.owner}/>)
      }
      board_display.push(<div className="board-row">{board_row}</div>);
    }
    
    
    return (
      <div className="board">
        {board_display}
      </div>
    );
  }
  
});


var Tile = React.createClass({
  render() {
    const color = this.props.color;
    const piece = this.props.piece;
    const piece_color = this.props.owner;
    var divStyle = {
      background:"lightgrey"
    }
    if(color === "Black"){
      divStyle.background = "darkgrey";
    }
    
    var figure = "";
    if(piece !== "Empty"){
      figure = <ChessPiece piece={piece} color={piece_color}/>;
    }
    
    return (
      <div style={divStyle} className="sqr">
        <h2 className="piece">{figure}</h2>
      </div>
    );
  }
});

export default Game;
