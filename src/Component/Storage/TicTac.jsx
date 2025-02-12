import { useState, useEffect } from "react";

const winnerCond = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function TicTac() {
  const [playerIndex, setPlayerIndex] = useState(true);
  const [boards, setBoards] = useState(Array(9).fill(null));
  const [winPlayer, setWinPlayer] = useState(null);

  function clickHandler(i) {
    if (boards[i] || winPlayer) return; // Ignore clicks if the square is filled or if there's a winner

    const newBoards = [...boards];
    newBoards[i] = playerIndex ? "X" : "O";
    setBoards(newBoards);
    setPlayerIndex(!playerIndex);
  }

  useEffect(() => {
    checkWinner();
  }, [boards]);

  function checkWinner() {
    for (let i = 0; i < winnerCond.length; i++) {
      const [a, b, c] = winnerCond[i];
      if (boards[a] && boards[a] === boards[b] && boards[a] === boards[c]) {
        setWinPlayer(boards[a]); // Set the winning player ("X" or "O")
        return;
      }
    }
  }
  function restHandler() {
    setBoards(Array(9).fill(null));
    setWinPlayer(null);
  }
  return (
    <div className="w-4/12 border border-blue-500 m-auto my-6 h-96 grid grid-cols-3">
      {boards.map((value, i) => (
        <div key={i} className="col-span-1">
          <button
            className="w-24 h-24 border border-slate-800 text-3xl flex justify-center items-center"
            onClick={() => clickHandler(i)}
          >
            {value}
          </button>
        </div>
      ))}
      {winPlayer && (
        <div className="text-center text-2xl mt-4">Winner: {winPlayer}</div>
      )}
      <button onClick={restHandler}>reset</button>
    </div>
  );
}

export default TicTac;
