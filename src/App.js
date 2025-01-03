// import React, { useState } from "react";
// import "./App.css";
// import Cell from "./component/Cell";

// export default function App() {
//   const gridSize = 5;
//   const [cell, setcell] = useState("");
//   const [mess, setmess] = useState("start");
// const [treasurePosition, setTreasurePosition] = useState(
//   Math.floor(Math.random() * gridSize)
// );
//   const handleClick = (id) => {
//     setcell(id);
//     if (id == treasurePosition) {
//       setmess("won");
//     } else {
//       setmess("try again");
//     }
//     console.log(treasurePosition);
//     console.log(id);
//   };
//   const startNewGame = () => {
//     setcell(null); // Reset selected cell
//     setTreasurePosition(Math.floor(Math.random() * gridSize)); // Set new random treasure position
//     setmess("start"); // Reset message
//   };
//   return (
//     <div>
//       <h1>{mess}</h1>
//       {Array.from({ length: gridSize }).map((_, index) => (
//         <Cell
//           key={index}
//           id={index}
//           iswon={index == treasurePosition}
//           isselected={cell == index}
//           handleclick={handleClick}
//         />
//       ))}
// <button onClick={startNewGame}>Start New Game</button>
//     </div>
//   );
// }

import React, { useState } from "react";
import "./App.css";
import Cell from "./component/Cell";
export default function App() {
  const [mess, setmess] = useState("START");
  const [cell, setcell] = useState("NULL");
  const gridSize = 5;
  const [treasurePosition, setTreasurePosition] = useState(
    Math.floor(Math.random() * gridSize)
  );

  //to manage the click
  const handlecellclick = (index) => {
    setcell(index);
    if (index == treasurePosition) {
      setmess("won");
    } else {
      setmess("try again");
    }
    console.log(index);
    console.log(treasurePosition);
    setTreasurePosition(Math.floor(Math.random() * gridSize));
  };

  //restart the game
  function startNewGame() {
    setTreasurePosition(Math.floor(Math.random() * gridSize));
    setmess("start");
    setcell("NULL");
  }

  //main code
  return (
    <div>
      <h1>{mess}</h1>
      <h6 className="my-1">(select any cell)</h6>

      {/* grid  */}
      {Array.from({ length: 5 }).map((_, index) => (
        <Cell
          id={index}
          key={index}
          handleclick={handlecellclick}
          isselected={cell == index}
          iswon={index == treasurePosition}
        />
      ))}

      {/* restart button  */}
      <button className="my-5" onClick={startNewGame}>
        Restart New Game
      </button>
    </div>
  );
}

// const App = () => {
// const gridSize = 5; // 5x5 grid
// const totalCells = gridSize * gridSize;

//   // Randomly set the treasure position
// const randomTreasurePosition = Math.floor(Math.random() * gridSize);

//   // State to manage the grid and treasure location
//   const [cells, setCells] = useState(Array(totalCells).fill(false));
//   const [gameOver, setGameOver] = useState(false);
// const [message, setMessage] = useState("Start the hunt!");

//   // Function to handle cell click
//   const handleCellClick = (index) => {
//     if (gameOver) return;

//     const newCells = [...cells];
//     newCells[index] = true; // Mark this cell as clicked

//     setCells(newCells);

//     if (index === randomTreasurePosition) {
//       setMessage("You found the treasure! 🎉");
//       setGameOver(true);
//     } else {
//       setMessage("Try again!");
//     }
//   };

//   // Generate the grid of cells
//   const renderGrid = () => {
// return Array.from({ length: gridSize }).map((_, rowIndex) => (
//   <div key={rowIndex} className="row">
//     {Array.from({ length: gridSize }).map((_, colIndex) => {
//       const cellIndex = rowIndex * gridSize + colIndex;
//       return (
//         <Cell
//           key={cellIndex}
//           id={cellIndex}
//           isTreasure={cellIndex === randomTreasurePosition}
//           isClicked={cells[cellIndex]}
//           handleClick={handleCellClick}
//         />
//       );
//     })}
//   </div>
// ));
//   };

//   return (
//     <div className="game">
//       <h1>Treasure Hunt Game</h1>
//       <p>{message}</p>
//       <div className="grid">{renderGrid()}</div>
//     </div>
//   );
// };

// export default App;

// import React, { useState } from 'react';
// import './App.css';

// const App = () => {
//   const gridSize = 5; // Grid size (5x5 grid)

//   // Randomly select a treasure location
//   const [treasureLocation, setTreasureLocation] = useState(
//     Math.floor(Math.random() * gridSize * gridSize)
//   );

//   const [guesses, setGuesses] = useState([]);
//   const [message, setMessage] = useState('');

//   const handleGuess = (index) => {
//     if (guesses.includes(index)) {
//       setMessage("You've already guessed this square!");
//       return;
//     }

//     setGuesses([...guesses, index]);

//     if (index === treasureLocation) {
//       setMessage("Congratulations! You've found the treasure!");
//     } else {
//       setMessage("Keep looking! No treasure here.");
//     }
//   };

//   const renderSquare = (index) => {
//     const isGuessed = guesses.includes(index);
//     return (
//       <div
//         key={index}
//         className={`square ${isGuessed ? 'guessed' : ''}`}
//         onClick={() => handleGuess(index)}
//       >
//         {isGuessed ? (index === treasureLocation ? "💎" : "❌") : ""}
//       </div>
//     );
//   };

//   const renderGrid = () => {
//     let squares = [];
//     for (let i = 0; i < gridSize * gridSize; i++) {
//       squares.push(renderSquare(i));
//     }
//     return squares;
//   };

//   return (
//     <div className="app">
//       <h1>Treasure Hunt</h1>
//       <div className="grid">
//         {renderGrid()}
//       </div>
//       <p>{message}</p>
//     </div>
//   );
// };

// export default App;
