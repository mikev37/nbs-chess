import React from 'react';
 /* eslint-disable */
fetch(`/hello`).then(function(response) {
  console.log("responce");
  console.log(response);
  console.log(response.text());
});
 
 
fetch('/service/help').then(function(response) {
  return response.json();
}).then(function(data) {
  console.log(data);
}).catch(function(error) {
  console.log(error);
  console.log("Booo");
});
 
class Square extends React.Component {
  render() {
    return (
      <button className="square">
        {/* TODO */}
      </button>
    );
  }
}
class FBLike extends React.Component {
  render(){
    return(
      <div className="fb-like" 
        data-href="http://www.your-domain.com/your-page.html" 
        data-layout="standard" 
        data-action="like" 
        data-show-faces="true">
      </div>
    );
  }
}


class Board extends React.Component {
  renderSquare(i) {
    return <Square />;
  }
  render() {
    const status = 'Next player: X';
    return (
      <div>
        <FBLike />
        
        <div>
          <div className="status">{status}</div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      </div>
    );
  }
}

export default Board;

// class Game extends React.Component {
//   render() {
//     return (
//       <div className="game">
//         <div className="game-board">
//           <Board />
//         </div>
//         <div className="game-info">
//           <div>{/* status */}</div>
//           <ol>{/* TODO */}</ol>
//         </div>
//       </div>
//     );
//   }
// }

// ========================================

// ReactDOM.render(
//   <Game />,
//   document.getElementById('container')
// );

// function calculateWinner(squares) {
//   const lines = [
//     [0, 1, 2],
//     [3, 4, 5],
//     [6, 7, 8],
//     [0, 3, 6],
//     [1, 4, 7],
//     [2, 5, 8],
//     [0, 4, 8],
//     [2, 4, 6],
//   ];
//   for (let i = 0; i < lines.length; i++) {
//     const [a, b, c] = lines[i];
//     if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
//       return squares[a];
//     }
//   }
//   return null;
// }
