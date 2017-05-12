import React, { Component } from 'react';
import ChessPiece from './ChessPiece.js.jsx';
import ChessLine from './ChessLine.js.jsx';
import cookie from 'react-cookie';

var Game = React.createClass({
  componentWillMount() {
    this.state =  { error:"",loaded:false,game:null };
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
        that.setState({error:"",loaded:true,game:data});
        
        }
      })
      .catch(function(err){
        console.log('Send Error (.Y.)', err);  
      })
  },
  joinBlack(){
    console.log("Enter join fucntio")
    var that = this;
    const usr_obj = cookie.load('userId');
    fetch("/service/game/join" , {
	        method: 'POST',
	        headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
	        body: JSON.stringify({
	          'game_id': that.props.params.gameid,
	          'user_id': usr_obj._id,
	          'is_white':"false"
	        })
      })
      .then(function(data){
          return data.text();
      })
      .then(function(data){
        console.log(data)
        if(data === "Success!"){
          that.load();
        }
        else{
          that.setState({error:data});
        }
      })
      .catch(function(err){
        console.log('Send Error oo==D', err);  
        that.setState({error:err});
      });
  },
  joinWhite(){
    console.log("Enter join fucntio")
    var that = this;
    const usr_obj = cookie.load('userId');
    fetch("/service/game/join" , {
	        method: 'POST',
	        headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
	        body: JSON.stringify({
	          'game_id': that.props.params.gameid,
	          'user_id': usr_obj._id,
	          'is_white':"true"
	        })
      })
      .then(function(data){
          return data.text();
      })
      .then(function(data){
        console.log(data)
        if(data === "Success!"){
          that.load();
        }
        else{
          that.setState({error:data});
        }
      })
      .catch(function(err){
        console.log('Send Error oo==D', err);  
        that.setState({error:err});
      });
  },
  play(x,y){
    var that = this;
    const usr_obj = cookie.load('userId');
    fetch("/service/game/play" , {
        method: 'PUT',
        headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
        body: JSON.stringify({
          'game_id': that.props.params.gameid,
          'user_id': usr_obj._id,
          'x':x,
          'y':y
        })
    })
    .then(function(data){
        return data.text();
    })
    .then(function(data){
      console.log(data)
      if(data === "succesfully saved"){
        that.load();
      }
    })
    .catch(function(err){
      that.setState({error:err});
        
      console.log('Send Error (.Y.)', err);  
    })
  },
  render() {
    /** Initial variables**/
    var path = this.props.params.gameid;
    const error_message = this.state.error;
    var white_overview = [];
    var black_overview = [];
    const usr_obj = cookie.load('userId');
    var error_display = <div className="alert alert-danger">{error_message}</div>;
    
    /** Loaded state transformation **/
    if(this.state.loaded){
      
      const game = this.state.game;
      
      path = <GameBoard board_state={game.board_state} onPlay={this.play}/>
      
      
      if(error_message === "")
      {
        error_display = "";
        if(this.state.game.error_message != null && this.state.game.error_message !== "")
        {
          error_display = <div className="alert alert-danger">{this.state.game.error_message}</div>;
        }
      }
      
      if(game.white_player != null)
      {
        if(game.is_white)
          white_overview.push(<h1><div className="glyphicon glyphicon-menu-right pull-left"></div></h1>);
        white_overview.push(<h2><ChessPiece piece="King" color="White"/>White Player</h2>);
        if(game.white_player === usr_obj._id){
          white_overview.push(<span>(you)</span>);
        }
        const taken = <ChessLine arr={game.white_captured} color="Black"/>;
        white_overview.push(<div>Pieces Taken: {taken} </div>);
        if(game.check_white)
          white_overview.push(<div className="alert alert-danger"> In Check!</div>);
      }
      else{
        white_overview.push(<button className="btn btn-block" onClick={this.joinWhite}><h1><ChessPiece piece="King" color="White"/>Join As White</h1></button>);
      }
      
      
      if(game.black_player != null)
      {
        if(!game.is_white)
          black_overview.push(<h1><div className="glyphicon glyphicon-menu-right pull-left"></div></h1>);
        black_overview.push(<h2><ChessPiece piece="King" color="Black"/>Black Player</h2>);
        if(game.black_player === usr_obj._id){
          black_overview.push(<span>(you)</span>);
        }
        const taken = <ChessLine arr={game.black_captured} color="White"/>;
        black_overview.push(<div>Pieces Taken: {taken} </div>);
        if(game.check_black)
          black_overview.push(<div className="alert alert-danger"> In Check!</div>);
      }
      else{
        black_overview.push(<button className="btn btn-block" onClick={this.joinBlack}><h1><ChessPiece piece="King" color="Black"/>Join As Black</h1></button>);
      }
      
    }


    /** Render step **/
    return (
      <div>
        <p>Handling Game</p>
        <hr/>
        <div className="row">
          <div className="col-md-4 tall">
          {path}
          </div>
          <div className="col-md-6 col-md-push-1 well-lg grey">
            {error_display}
            <br/>
            {white_overview}
            <hr/>
            {black_overview}
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
        
        board_row.push(<Tile tile={tile} onPlay={this.props.onPlay}/>)
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
  play(){
    this.props.onPlay(this.props.tile.y,this.props.tile.x);
  },
  render() {
    const tile = this.props.tile;
    const color = tile.tile;
    const piece = tile.piece;
    const piece_color = tile.owner;
    const highlight = tile.attack_able || tile.moveable || tile.selected;
    var divStyle = {
      background:"lightgrey"
    }
    if(color === "Black"){
      if(highlight){
        divStyle.background = "darkslategrey";
      }
      else{
        divStyle.background = "darkgrey";
      }
    }
    else{
      if(highlight){
        divStyle.background = "slategrey";
      }
      else{
        divStyle.background = "lightgrey";
      }
    }
    
    var figure = "";
    if(piece !== "Empty"){
      figure = <ChessPiece piece={piece} color={piece_color}/>;
    }
    
    return (
      <div style={divStyle} className="sqr" onClick={this.play}>
        <h2 className="piece">{figure}</h2>
      </div>
    );
  }
});

export default Game;
