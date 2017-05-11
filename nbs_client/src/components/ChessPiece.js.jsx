import React, { Component } from 'react';

class ChessPiece extends Component {
  render() {
    var color = this.props.color;
    var piece = this.props.piece;
    switch(piece.toUpperCase()){
        case "KING": piece = "♚"; break;
        case "QUEEN": piece = "♛"; break;
        case "ROOK": piece = "♜"; break;
        case "BISHOP" : piece = "♝"; break;
        case "KNIGHT" : piece = "♞"; break;
        default : piece = "♟";
    }
    var divStyle = {
      color: "#ffffff",
    };
    if(color === "Black"){
        divStyle.color = "#000";
    }
    
    return (
      <span style={divStyle}>
        {piece}
      </span>
    );
  }
}

export default ChessPiece;
