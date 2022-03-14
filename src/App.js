import React, { useState } from 'react';

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

function Board(props){

  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xNext, setXNext] = useState(true);
  const [winner, setWinnner] = useState(null);


  function handleClick(id) {
    if (squares[id] || winner){
      return;
    }
    const squaresLocal = squares.slice();
    squaresLocal[id] = xNext? 'x' : 'o';
    setSquares(squaresLocal);
    setXNext(!xNext);
    setWinnner(calculateWinner(squaresLocal))
    
  }

  return(
    <div className="text-4xl block">
      <div className={`p-4 rounded-xl bg-slate-700 text-center mb-6 ${xNext?"text-green-400":"text-sky-400"}`}>
        {(winner)?`Player ${winner} wins!`:`Next Player: ${xNext? 'x' : 'o'}`}
      </div>
      <div className="flex justify-center">
        <Square value={squares[0]} id={0} xNext={xNext} onClick={handleClick}/>
        <Square value={squares[1]} id={1} xNext={xNext} onClick={handleClick}/>
        <Square value={squares[2]} id={2} xNext={xNext} onClick={handleClick}/>
      </div>
      <div className="flex justify-center">
        <Square value={squares[3]} id={3} xNext={xNext} onClick={handleClick}/>
        <Square value={squares[4]} id={4} xNext={xNext} onClick={handleClick}/>
        <Square value={squares[5]} id={5} xNext={xNext} onClick={handleClick}/>
      </div>
      <div className="flex justify-center">
        <Square value={squares[6]} id={6} xNext={xNext} onClick={handleClick}/>
        <Square value={squares[7]} id={7} xNext={xNext} onClick={handleClick}/>
        <Square value={squares[8]} id={8} xNext={xNext} onClick={handleClick}/>
      </div>
    </div>
  )
}

function Square(props) {
  return(
    <button 
    onClick={() => props.onClick(props.id)}
    className={`w-[15vh] h-[15vh] border-[1px] rounded-lg m-1 border-white transition ${((props.value === null)?(props.xNext? "hover:bg-green-400 active:bg-green-600":"hover:bg-sky-400 active:bg-sky-600"):"")}`}>
      {props.value}
    </button>
  )
}



function App() {
  return (
    <>
    <div id="bg" className="bg-slate-600 text-white h-screen flex justify-center items-center">
      <Board></Board>
    </div>
    
    </>
  );
}

export default App;
