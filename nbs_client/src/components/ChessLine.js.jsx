import ChessPiece from './ChessPiece.js.jsx';
import React from 'react';


var ChessLine = React.createClass({
  
  
    drawPieces(arr,color){
          var taken = [];
          for(var i = 0; i < arr.length;i++)
          {
            taken.push(<ChessPiece piece={arr[i].name} color={color}/>);
          }
          return taken;
    },
    render: function() {
    
        const display = this.drawPieces(this.props.arr,this.props.color);
    
    return (
      <span>
        {display}
      </span>
    );
    }
  
});

export default ChessLine;