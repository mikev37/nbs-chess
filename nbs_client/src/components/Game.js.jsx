import React, { Component } from 'react';

class Game extends Component {
  render() {
    var path = this.props.params.gameid;
    return (
      <div>
        <p>Handling Game</p>
        {path}
      </div>
    );
  }
}

export default Game;
