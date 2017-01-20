function Square(props) {
  return (
    <button className="square" onClick={() => props.onClick()}>
      {props.value}
    </button>
  );
}

class BoardRow extends React.Component {
    renderSquare(i) {
        console.log("Square[" + i + "] " + this.props.squares[i]);
        return <Square value={this.props.squares[i.x][i.y]} onClick={() => this.props.onClick(i)} />;
    }
    render() {
        
        return (
            <div className="board-row">
                {this.renderSquare({x:this.props.rowNumber, y:0})}
                {this.renderSquare({x:this.props.rowNumber, y:1})}
                {this.renderSquare({x:this.props.rowNumber, y:2})}
            </div>
        );
    }
}

class Board extends React.Component {
  renderRow(i) {
        console.log("Square[" + i + "] " + this.props.squares[i]);
        return <BoardRow  squares={this.props.squares} rowNumber={i} onClick={(i) => this.props.onClick(i)} />;
  }
  render() {
    console.log("Square + " + this.props.squares);
    return (
      <div>
        <div className="status">{status}</div>
         {this.renderRow(0)}
         {this.renderRow(1)}
         {this.renderRow(2)}
      </div>
    );
  }

}

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      history: [{
        squares: Array(3).fill(Array(3).fill(null))
      }],
      stepNumber: 0,
      xIsNext: true
    };
  }
  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    const moves = history.map((step, move) => {
      const desc = move ? 'Move #' + move : 'Game start';
        return (
          <li key={move}>
            <a href="#" onClick={() => this.jumpTo(move)}>{desc}</a>
          </li>
        );
      });
    
    
    console.log("GAME - Current: " + current.squares);
    
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }
     return (
       <div>
            <div className="game-board">
                <Board squares={current.squares} onClick={(i) => this.handleClick(i)} />
            </div>
            <div className="game-info">
                <div>{status}</div>
                <ol>{moves}</ol>
            </div>
        </div>
       )

  }
  
  handleClick(i) {
    const history = this.state.history;
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    const squaresRow = current.squares[i.x].slice();
    if (calculateWinner(squares) || squares[i.x][i.y]) {
      return;
    }

    squaresRow[i.y] = this.state.xIsNext ? 'X' : 'O';
    squares[i.x] = squaresRow;
    this.setState({
      history: history.concat([{
        squares: squares
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }
  
  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) ? false : true,
    });
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

function calculateWinner(squares) {
  const linesBi = [
    [{x: 0, y:0}, {x: 0, y:1}, {x: 0, y:2}],
    [{x: 1, y:0}, {x: 1, y:1}, {x: 1, y:2}],
    [{x: 2, y:0}, {x: 2, y:1}, {x: 2, y:2}],
    [{x: 0, y:0}, {x: 1, y:0}, {x: 2, y:0}],
    [{x: 0, y:1}, {x: 1, y:1}, {x: 2, y:1}],
    [{x: 0, y:2}, {x: 1, y:2}, {x: 2, y:2}],
    [{x: 0, y:0}, {x: 1, y:1}, {x: 2, y:2}],
    [{x: 2, y:0}, {x: 1, y:1}, {x: 0, y:2}],
  ]
  for (let i = 0; i < linesBi.length; i++) {
    const [a, b, c] = linesBi[i];
    if (squares[a.x][a.y] && squares[a.x][a.y] === squares[b.x][b.y] && squares[a.x][a.y] === squares[c.x][c.y]) {
      return squares[a.x][a.y];
    }
  }
  return null;
}
