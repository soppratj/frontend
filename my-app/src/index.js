import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


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
            className={this.props.winline.find((a,b,c) => a===i ) ? "winline" : ""}
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
  
  class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
                psquare: 0,
            }],
            stepNumber: 0,
            xIsNext: true,
            order: true,
            winline: Array(3).fill(null),
        };
    }
    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (this.state.winline[0] != null || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        const wins = calculateWinner(squares);
        this.setState({
            history: history.concat([{
                squares: squares,
                psquare: i,
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
            winline: wins ? wins.winline : Array(3).fill(null),
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    }

    toggleClick() {
      this.setState({
          order: !this.state.order,
      });
    }

    render() {
      const history = this.state.history;
      const current = history[this.state.stepNumber];
      const wins = calculateWinner(current.squares);

      const moves = history.map((step, move) => {
          const desc = move ?
            'Go to move #' + move + '(' + spuarePoint(step.psquare) + ')' :
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
      } else {
          status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
      }
      let toggle;
      let mover = moves;
      mover.sort((a,b) => {
        if(this.state.order){
          return 1;
        } else {
          return -1;
        }
      })
      if (this.state.order){
        toggle = 'ソート(昇順)';
      } else {
        toggle = 'ソート(降順)';
      }
      return (
        <div className="game">
          <div className="game-board">
            <Board 
                squares={current.squares}
                winline={this.state.winline}
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
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );

  function spuarePoint(square){
      const points = [
        '1,1','2,1','3,1',
        '1,2','2,2','3,2',
        '1,3','2,3','3,3', 
      ];
      return(points[square]);

  }

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return {
          winner: squares[a],
          winline: lines[i],
        };
      }
    }
    return null;
  }