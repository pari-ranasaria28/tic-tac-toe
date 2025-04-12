import {useState } from 'react';

function Square({value,onSquareClick}) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({Xisnext,square,onPlay}) {

  function handleClick(i){
    if(square[i] || calculateWinner(square)){
      return;
    }
    const newSquare = square.slice();
    if(Xisnext){
      newSquare[i]="X";
    }
    else{
      newSquare[i]="O";
    }
    
    onPlay(newSquare);
  }

  const winner = calculateWinner(square);
  let status;
  if(winner){
    status = "Winner: " + winner;
  }
  else{
    status = "Next Player: ";
    if(Xisnext){
      status = status + "X";
    }
    else{
      status = status + "O";
    }
  }
  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value = {square[0]} onSquareClick={() => {handleClick(0)}}/>
        <Square value = {square[1]} onSquareClick={() => {handleClick(1)}}/>
        <Square value = {square[2]} onSquareClick={() => {handleClick(2)}}/>
      </div>
      <div className="board-row">
        <Square value = {square[3]} onSquareClick={() => {handleClick(3)}}/>
        <Square value = {square[4]} onSquareClick={() => {handleClick(4)}}/>
        <Square value = {square[5]} onSquareClick={() => {handleClick(5)}}/>
      </div>
      <div className="board-row">
        <Square value = {square[6]} onSquareClick={() => {handleClick(6)}}/>
        <Square value = {square[7]} onSquareClick={() => {handleClick(7)}}/>
        <Square value = {square[8]} onSquareClick={() => {handleClick(8)}}/>
      </div>
    </>
  );
}

export default function Game() {
  // const[Xisnext,setXisnext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currMove,setCurrMove] = useState(0);
  const currSquare = history[currMove]; 
  const Xisnext = currMove%2===0;
  const winner = calculateWinner(currSquare);

  function handlePlay(nextSquare){
    const nextHistory = [...history.slice(0,currMove+1),nextSquare];
    setHistory(nextHistory);
    setCurrMove(nextHistory.length-1);
    // setXisnext(!Xisnext);
  }
  function jumpTo(nextMove){
    setCurrMove(nextMove);
    // if(nextMove%2===0){
    //   setXisnext(true);
    // }
    // else{
    //   setXisnext(false);
    // }
  }
  const moves = history.map((square,move) => {
    let desc;
    if(winner && move === history.length-1){
      desc = "Game end";
    }
    else if(!winner && move===9){
      desc = "Draw"
    }
    else{
      if(move<=0){
        desc = "Start Game ";
      }
      else{
        desc = "Go to Move " + move;
      }
    }
    return (<li key={move}>
      <button
        onClick = {() => jumpTo(move)} >{desc}
      </button>
    </li>);
  });
  return (
    <div className="game-container">
      <h2 className="game-title">Tic Tac Toe Game</h2>
      <div className="game">
        <div className="game-board">
          <Board Xisnext={Xisnext} square={currSquare} onPlay={handlePlay} />
        </div>
        <div className="game-info">
          <ol>{moves}</ol>
        </div>
      </div>
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
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}