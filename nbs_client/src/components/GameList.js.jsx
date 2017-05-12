var React = require('react');
import ChessPiece from './ChessPiece.js.jsx';
import { browserHistory } from 'react-router';

var GameList = React.createClass({
  render() {
    var g_list = [];
    var in_list = this.props.in_list;
    for(var i = 0; i  < in_list.length;i++){
      g_list.push(<GameShortCut usr={this.props.usr} id={in_list[i].game_id}/>);
      
    }
    return (
      <div className="sidebar">
        <div className="list-group">
            {g_list}
        </div>
      </div>
    );
  }
});


var GameShortCut = React.createClass({
  componentWillMount() {
    this.state =  { open:false,loaded:false,game:null };
    this.load();
  },
  toGame(){
    console.log("chemically calm");
    browserHistory.push('/game/'+this.props.id);
  },
  toOpen() {
    this.setState({open:!this.state.open});
  },
  load(){
    var that = this;
    fetch("/service/game/get" , {
	        method: 'POST',
	        headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
	        body: JSON.stringify({
	          'game_id': that.props.id,
	        })
      })
      .then(function(data){
          return data.json();
      })
      .then(function(data){
        if(data){
        that.setState({loaded:true,game:data});
        console.log(data);
        }
      })
      .catch(function(err){
        console.log('Send Error (.Y.)', err);  
      })
  },
  
  drawLoading(){
    return (
    <div>
      {this.props.id}
      <div className="progress">
        <div className="progress-bar progress-bar-striped active" role="progressbar"
        aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">
          Loading
        </div>
      </div>
    </div>);
  },
  
  drawPieces(arr,color){
      var taken = [];
      for(var i = 0; i < arr.length;i++)
      {
        taken.push(<ChessPiece piece={arr[i].name} color={color}/>);
      }
      return taken;
  },
  
  render() {
    var display = this.drawLoading();
    
    if(this.state.loaded){
      const game = this.state.game;
      const user = this.props.usr;
      if(this.state.open){
        
        var bar = <span></span>
        
        if(game.black_player == null && game.white_player == null)
        {
          bar = 
          <button className="btn btn-block" onClick={this.toGame}>
            No Players have joined
            <span className="pull-right glyphicon glyphicon-log-in"></span>
          </button>
        }
        else if(game.black_player == null){
            bar = 
            <button className="btn btn-block" onClick={this.toGame}>
                No Black Player
                <span className="pull-right glyphicon glyphicon-log-in"></span>
            </button>;
        }
        else if(game.white_player == null){
            bar = 
            <button className="btn btn-block" onClick={this.toGame}>
                No White Player
                <span className="pull-right glyphicon glyphicon-log-in"></span>
            </button>
        }
        else{
          var white_taken = this.drawPieces(game.black_captured,"White");
          var black_taken = this.drawPieces(game.white_captured,"Black");
          var warning = "";
          
          if(game.check_black){
            warning += "\nBlack is in Check";
          }
          if(game.check_white){
            warning += "\nWhite is in Check";
          }
          if(game.is_white){
            if(game.white_player === user._id){
              warning+= "\nIt is your turn";
            }
          }
          else{
            if(game.black_player === user._id){
              warning+= "\nIt is your turn";
            }
          }
          
          var taken = "Taken: ";
          
          if(white_taken.length === 0 && black_taken.length === 0 ){
            taken = "";
          }
          
          bar = 
            <button className="btn btn-block" onClick={this.toGame}>
              {taken}{white_taken}{black_taken}
              {warning}
              <span className="pull-right glyphicon glyphicon-log-in"></span>
            </button>
        }
        display = 
          <div onClick={this.toOpen}>
            <span className="pull-left glyphicon glyphicon-expand"></span>
            {game.name} : Turn {game.turn_num}
            <div>
              {bar}
            </div>
          </div>;
      }
      else{
      display = 
      <div  onClick={this.toOpen}>
      <span className="pull-left glyphicon glyphicon-collapse-down"></span>
        {game.name} : Turn {game.turn_num}
      </div>;
      }
      /*
              <div>{white_taken}</div>
        {game.name} : Turn {game.turn_num}
        <div>{black_taken}</div>
      
      */
    }
    return (
      <div className="list-group-item">
            {display}
      </div>
    );
  }
});

export default GameList;