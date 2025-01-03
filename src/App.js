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

import React, { useState, useEffect } from "react";
import "./App.css";
import Cell from "./component/Cell";

export default function App() {
  const gridSize = 5;

  // State to manage the game message, selected cell, and treasure position
  const [mess, setMess] = useState("START");
  const [cell, setCell] = useState("NULL");
  const [iswon, setiswon] = useState("");
  const [treasurePosition, setTreasurePosition] = useState(
    Math.floor(Math.random() * gridSize)
  );

  useEffect(() => {
    console.log(treasurePosition);
  }, []);

  // To manage the click event on each cell
  const handleCellClick = (index) => {
    setCell(index);
    // Change treasure position after each click
    if (index === treasurePosition) {
      setMess("You Won!");
      setiswon(true);
    } else {
      setMess("Try Again!");
      setiswon(false);
    }
    console.log("index", index);
    console.log("treasurePosition", treasurePosition);
    setTreasurePosition(Math.floor(Math.random() * gridSize));
  };

  // Restart the game with a new treasure position
  function startNewGame() {
    setTreasurePosition(Math.floor(Math.random() * gridSize));
    setMess("START");
    setCell("NULL");
  }

  // Main code of the game
  return (
    <div>
      <h1>{mess}</h1>
      <h6 className="my-1">(select any cell)</h6>

      <div className="grid">
        {Array.from({ length: gridSize }).map((_, index) => (
          <Cell
            key={index}
            id={index}
            treasurePosition={treasurePosition}
            handleclick={handleCellClick}
            isselected={cell === index}
            iswon={iswon}
          />
        ))}
      </div>

      {/* Restart button */}
      <button className="my-5" onClick={startNewGame}>
        Restart New Game
      </button>
    </div>
  );
}
