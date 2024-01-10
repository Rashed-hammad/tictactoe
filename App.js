import { useState } from "react";
import Square from "./Square";

export default function Board() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [playerOne, setPlayerOne] = useState("");
  const [playerTwo, setPlayerTwo] = useState("");
  const [start, setStart] = useState(false);

  let winner;
  if (calculateWinner(squares) === "X") {
    winner = playerOne;
  } else if (calculateWinner(squares) === "O") {
    winner = playerTwo;
  }
  let status;
  if (calculateWinner(squares)) {
    status = `Winner: ${winner}`;
  } else {
    status = `${xIsNext ? playerOne : playerTwo}'s turn`;
  }
  const handle = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  };
  const handleClick = (i) => {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    const nextSquare = squares.slice();
    if (xIsNext) {
      nextSquare[i] = "X";
      setXIsNext(false);
    } else {
      nextSquare[i] = "O";
      setXIsNext(true);
    }
    setSquares(nextSquare);
  };
  return (
    <div className="base">
      <div className="title">
        <h1>TIC TAC TOE</h1>
      </div>

      {!start && (
        <form onSubmit={() => setStart(true)}>
          <input
            type="text"
            placeholder="Player One"
            value={playerOne}
            required
            onChange={(e) => setPlayerOne(e.target.value)}
          />
          <input
            type="text"
            placeholder="Player Two"
            value={playerTwo}
            required
            onChange={(e) => setPlayerTwo(e.target.value)}
          />
          <button className="btn" type="submit">
            Play
          </button>
        </form>
      )}

      {start && (
        <div style={{ marginLeft: "20px" }}>
          <div className="status">{status}</div>
          <div className="board-row">
            <Square value={squares[0]} handleClick={() => handleClick(0)} />
            <Square value={squares[1]} handleClick={() => handleClick(1)} />
            <Square value={squares[2]} handleClick={() => handleClick(2)} />
          </div>
          <div className="board-row">
            <Square value={squares[3]} handleClick={() => handleClick(3)} />
            <Square value={squares[4]} handleClick={() => handleClick(4)} />
            <Square value={squares[5]} handleClick={() => handleClick(5)} />
          </div>
          <div className="board-row">
            <Square value={squares[6]} handleClick={() => handleClick(6)} />
            <Square value={squares[7]} handleClick={() => handleClick(7)} />
            <Square value={squares[8]} handleClick={() => handleClick(8)} />
          </div>
          <button className="btn" onClick={() => handle()}>
            Play Again!
          </button>
        </div>
      )}
    </div>
  );
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
      return squares[a];
    }
  }
  return null;
}
