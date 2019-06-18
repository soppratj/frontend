import React from 'react';
import './index.css';
import * as util from './util'

  function Square(props){
      return (
        <button className={"square " + props.className } onClick={props.onClick}>
            {props.value}
        </button>
      );
  }
  
  class Board extends React.Component {
    renderSquare(i) {
      return ( 
        <Square
            value={this.props.squares[i]}
            className={typeof this.props.winline.find((a,b,c) => a===i ) != "undefined" ? "winline" : ""}
            onClick={() => this.props.onClick(i)}
        />
      );
    }

    render() {
      const divtag = [];
      for(let i = 0; i < 3; i++){
        divtag.push(
          <div className="board-row">
            {(() => {
              const squaretag = [];
              for( let j = 0; j < 3; j++){
                squaretag.push(this.renderSquare(i*3+j));
              }
              return squaretag;
            })()}
          </div>
        );
      }
      return (
        <div>
          {divtag}
        </div>
      );
    }
  }
  
  export default class Game extends React.Component {
    
    handleClick(i) {
      this.props.handleClickFunction(i)
    }

    jumpTo(step) {
      this.props.jumpToFunction(step)
    }

    toggleClick() {
      this.props.toggleClickFunction()
    }

    render() {
      const history = this.props.history;
      const current = history[this.props.stepNumber];
      const wins = util.calculateWinner(current.squares);

      const moves = history.map((step, move) => {
          const desc = move ?
            'Go to move #' + move + '(' + util.spuarePoint(step.psquare) + ')' :
            'Go to game start';
          // 太字クラス「activelist」
          const name = (current.squares === step.squares) ?
            'activelist' :
            ' ';
          return (
            <li key={move}>
                <button className={name} onClick={() => this.jumpTo(move)}>{desc}</button>
            </li>
          );
      });

      let status;
      if (wins) {
          status = 'Winner: ' + wins.winner;
      } else if (this.props.stepNumber === current.squares.length ){
          status = 'Draw game';
      } else {
          status = 'Next player: ' + (this.props.xIsNext ? 'X' : 'O');
      }
      let toggle;
      let mover = moves;
      mover.sort((a,b) => {
        if(this.props.order){
          return 1;
        } else {
          return -1;
        }
      })
      if (this.props.order){
        toggle = 'ソート(昇順)';
      } else {
        toggle = 'ソート(降順)';
      }
      return (
        <div className="game">
          <div className="game-board">
            <Board 
                squares={current.squares}
                winline={current.winline}
                onClick={(i) => this.handleClick(i)}
            />

          </div>
          <div className="game-info">
            <div>{status}</div>
            <div>
              <button onClick={() => this.toggleClick()}>{toggle}</button>
            </div>
            <ol>
              {mover}
            </ol>
          </div>
        </div>
      );
    }
  }