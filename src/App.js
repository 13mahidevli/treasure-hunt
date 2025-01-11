import React, { useState, useEffect } from "react";
import "./App.css";
import Cell from "./component/Cell";

export default function App() {
  const gridSize = 10;

  // State to manage the game message
  const [mess, setMess] = useState("choose a bubble");
  //make a array of grid size so that we can check if cell is null or is clicked so that we can fill it with cross or trophy
  const [cell, setCell] = useState(Array(gridSize).fill(null));
  //to check when we won
  const [iswon, setiswon] = useState("");
  //to change the color of messages
  const [color, setcolor] = useState("black");
  //to disable the cells
  const [isdisabled, setisdisabled] = useState(false);
  //to check the current cell we have clicked
  const [currcell, setcurrcell] = useState("");
  //to make an array of all the index we have clicked so far
  const [arrayofcell, setarrayofcell] = useState([]);
  //to set position and treasurePosition
  const [position, setposition] = useState(7);
  const [treasurePosition, setTreasurePosition] = useState(position * position);
  //to collect time
  const [time, settime] = useState(0);
  //to save the treasurePosition history where all keys had been
  const [positionhistory, setpositionhistory] = useState([]);
  //to save the Position history where all keys had been
  const [treasurepositionhistory, settreasurepositionhistory] = useState([]);
  const [display, setdisplay] = useState("none");
  const [boxblur, setboxblur] = useState("0");
  useEffect(() => {
    setposition(1);
    console.log(treasurepositionhistory);
    console.log("position", position);
    console.log("treasureposition", treasurePosition);
    const timeinterval = setInterval(() => {
      settime((prevtime) => prevtime + 1);
    }, 1000);
    return () => clearInterval(timeinterval);
  }, []);

  // useEffect(() => {
  //   if (time == 10) {
  //     setMess("timedone");
  //   }
  // }, [time]);

  // To manage the click event on each cell
  const handleCellClick = (index) => {
    //making array of selected index
    const selectedcell = [...arrayofcell, index];
    setarrayofcell(selectedcell);
    console.log(selectedcell);

    //making of all cell to check if they are filled
    const newcells = [...cell];
    newcells[index] = "clicked";
    setCell(newcells);
    console.log(newcells);

    //setting current cell
    setcurrcell(index);

    // Change treasure position after each click
    if (index === treasurePosition) {
      setMess("You Got the Key 🗝️!!!");
      setcolor("yellow");
      setiswon(true);
      return;
    } else {
      setMess("Try Again!!!");
      setcolor("brown");
      setiswon(false);
    }

    //if cell is clicked not null then show this
    if (cell[index]) {
      setMess("you already choose this");
      setcolor("red");
      return;
    }

    console.log("index", index);
    //changing position
    setposition((prevposition) => prevposition + 1);
    //creating a set so that we use new value of treasureposition
    let set = position * position;
    setTreasurePosition(position * position);
    console.log("position", position);
    console.log("treasurePosition", treasurePosition);
    //creating array to store values of history of positions
    settreasurepositionhistory((prevhistory) => [
      ...prevhistory,
      treasurePosition,
    ]);
    setpositionhistory((phistory) => [...phistory, position]);
    console.log(positionhistory);
    console.log(treasurepositionhistory);

    //stopping the game
    if (selectedcell.length == 11) {
      setMess("gave over");
      setisdisabled(true);
    }
  };

  function showhint() {
    setdisplay("block");
    setboxblur(4);
  }

  function remove() {
    setdisplay("none");
    setboxblur(0);
  }

  // Main code of the game
  return (
    <div className="box">
      <div style={{ filter: `blur(${boxblur}px)` }} className="blockone">
        <h1 style={{ color: color }}>{mess}</h1>
        <div className="instruction">
          <button onClick={showhint} className="hintbox">
            𝐡𝐢𝐧𝐭!!
          </button>
          <h1 className="my-3">Instructions</h1>
          𝐓𝐡𝐞𝐫𝐞 𝐚𝐫𝐞 𝟭𝟬𝟬 𝐛𝐮𝐛𝐛𝐥𝐞𝐬 𝐨𝐧 𝐭𝐡𝐞 𝐬𝐜𝐫𝐞𝐞𝐧... <br></br> 𝐈𝐟 𝐲𝐨𝐮 𝐜𝐥𝐢𝐜𝐤 𝐭𝐡𝐞
          𝐫𝐢𝐠𝐡𝐭 𝐛𝐮𝐛𝐛𝐥𝐞 𝐲𝐨𝐮 𝐮𝐧𝐥𝐨𝐜𝐤 𝐚 𝐬𝐩𝐞𝐜𝐢𝐚𝐥 𝐤𝐞𝐲(🗝️) 𝐭𝐨 𝐭𝐡𝐞 𝐧𝐞𝐱𝐭 𝐩𝐮𝐳𝐳𝐥𝐞.{" "}
          <br></br> (𝐁𝐮𝐭 𝐭𝐡𝐞𝐫𝐞 𝐢𝐬 𝐚 𝐜𝐚𝐭𝐜𝐡)<br></br> ***𝐘𝐨𝐮 𝐡𝐚𝐯𝐞 𝟏𝟏 𝐜𝐡𝐚𝐧𝐜𝐞𝐬***
          <br></br>
          𝐄𝐚𝐜𝐡 𝐭𝐢𝐦𝐞 𝐲𝐨𝐮 𝐜𝐥𝐢𝐜𝐤 𝐭𝐡𝐞 𝐰𝐫𝐨𝐧𝐠 𝐛𝐮𝐛𝐛𝐥𝐞 𝐭𝐡𝐞 𝐤𝐞𝐲 𝐭𝐞𝐥𝐞𝐩𝐨𝐫𝐭𝐬 𝐭𝐨 𝐭𝐡𝐞 𝐚𝐧𝐨𝐭𝐡𝐞𝐫
          𝐛𝐮𝐛𝐛𝐥𝐞 𝐚𝐧𝐝 𝐭𝐡𝐞 𝐛𝐮𝐛𝐛𝐥𝐞 𝐰𝐡𝐞𝐫𝐞 𝐭𝐡𝐞 𝐤𝐞𝐲 𝐰𝐚𝐬 𝐭𝐮𝐫𝐧𝐬 𝐛𝐥𝐚𝐜𝐤🚩.<br></br> 𝐓𝐡𝐞
          𝐠𝐚𝐦𝐞 𝐬𝐡𝐨𝐰𝐬 "❌" 𝐟𝐨𝐫 𝐚𝐥𝐫𝐞𝐚𝐝𝐲 𝐜𝐥𝐢𝐜𝐤𝐞𝐝 𝐛𝐮𝐛𝐛𝐥𝐞𝐬.
          <br></br>𝐄𝐚𝐜𝐡 𝐭𝐢𝐦𝐞 𝐲𝐨𝐮 𝐜𝐥𝐢𝐜𝐤 𝐭𝐡𝐞 𝐰𝐫𝐨𝐧𝐠 𝐛𝐮𝐛𝐛𝐥𝐞 𝐭𝐡𝐞 𝐤𝐞𝐲 𝐭𝐞𝐥𝐞𝐩𝐨𝐫𝐭𝐬 𝐭𝐨 𝐭𝐡𝐞
          𝐚𝐧𝐨𝐭𝐡𝐞𝐫 𝐛𝐮𝐛𝐛𝐥𝐞 𝐚𝐧𝐝 𝐭𝐡𝐞 𝐛𝐮𝐛𝐛𝐥𝐞 𝐰𝐡𝐞𝐫𝐞 𝐭𝐡𝐞 𝐤𝐞𝐲 𝐰𝐚𝐬 𝐭𝐮𝐫𝐧𝐬 𝐛𝐥𝐚𝐜𝐤🚩
          <br></br>
        </div>
        <div className="boxes">
          <div className="clicked">chance played: {arrayofcell.length}</div>
          <div className="clicked">Time: {time}</div>
        </div>
      </div>

      <div style={{ filter: `blur(${boxblur}px)` }} className="grid">
        {Array.from({ length: gridSize }).map((_, colindex) => (
          <div key={colindex} className="row">
            {Array.from({ length: gridSize }).map((_, rowindex) => {
              const cellindex = rowindex * gridSize + colindex + 1;
              return (
                <Cell
                  key={cellindex}
                  id={cellindex}
                  handleclick={handleCellClick}
                  isselected={currcell === cellindex}
                  iswon={iswon}
                  disabled={isdisabled}
                  selectedcell={arrayofcell}
                  treasureposition={treasurepositionhistory}
                />
              );
            })}
          </div>
        ))}
      </div>
      <div style={{ display: display }} className="hint-given">
        <div
          style={{ display: display }}
          onClick={remove}
          className="remove-hintbox"
        >
          ❌
        </div>
        ***HINT***
      </div>
    </div>
  );
}

// import React, { useState, useEffect } from "react";
// import "./App.css";
// import Cell from "./component/Cell";

// export default function App() {
//   const gridSize = 10;

//   // State to manage the game message
//   const [mess, setMess] = useState("choose a bubble");
//   //to check when we won
//   const [iswon, setiswon] = useState("");
//   //to change the color of messages
//   const [color, setcolor] = useState("black");
//   //to disable the cells
//   const [isdisabled, setisdisabled] = useState(false);
//   //to check the current cell we have clicked
//   const [currcell, setcurrcell] = useState("");
//   //to make an array of all the index we have clicked so far
//   const [arrayofcell, setarrayofcell] = useState([]);
//   //to set position and treasurePosition
//   const [position, setposition] = useState(7);
//   const [treasurePosition, setTreasurePosition] = useState(position * position);
//   //to collect time
//   const [time, settime] = useState(0);
//   //to save the treasurePosition history where all keys had been
//   const [positionhistory, setpositionhistory] = useState([]);
//   //to save the Position history where all keys had been
//   const [treasurepositionhistory, settreasurepositionhistory] = useState([]);
//   const [display, setdisplay] = useState("none");
//   const [boxblur, setboxblur] = useState("0");

//   useEffect(() => {
//     setposition(1);
//     const timeinterval = setInterval(() => {
//       settime((prevtime) => prevtime + 1);
//     }, 1000);
//     return () => clearInterval(timeinterval);
//   }, []);

//   const handleCellClick = (index) => {
//     //making array of selected index
//     const selectedcell = [...arrayofcell, index];
//     setarrayofcell(selectedcell);

//     //setting current cell
//     setcurrcell(index);

//     // Change treasure position after each click
//     if (index === treasurePosition) {
//       setMess("You Got the Key 🗝️!!!");
//       setcolor("yellow");
//       setiswon(true);
//       return;
//     } else {
//       setMess("Try Again!!!");
//       setcolor("brown");
//       setiswon(false);
//     }

//     //changing position
//     setposition((prevposition) => prevposition + 1);
//     //creating a set so that we use new value of treasureposition
//     let set = position * position;
//     setTreasurePosition(position * position);
//     //creating array to store values of history of positions
//     settreasurepositionhistory((prevhistory) => [
//       ...prevhistory,
//       treasurePosition,
//     ]);
//     setpositionhistory((phistory) => [...phistory, position]);

//     //stopping the game
//     if (selectedcell.length == 11) {
//       setMess("gave over");
//       setisdisabled(true);
//     }
//   };

//   function showhint() {
//     setdisplay("block");
//     setboxblur(4);
//   }

//   function remove() {
//     setdisplay("none");
//     setboxblur(0);
//   }

//   // Main code of the game
//   return (
//     <div className="box">
//       <div style={{ filter: `blur(${boxblur}px)` }} className="blockone">
//         <h1 style={{ color: color }}>{mess}</h1>
//         <div className="instruction">
//           <button onClick={showhint} className="hintbox">
//             𝐡𝐢𝐧𝐭!!
//           </button>
//           <h1 className="my-3">Instructions</h1>
//           𝐓𝐡𝐞𝐫𝐞 𝐚𝐫𝐞 𝟭𝟬𝟬 𝐛𝐮𝐛𝐛𝐥𝐞𝐬 𝐨𝐧 𝐭𝐡𝐞 𝐬𝐜𝐫𝐞𝐞𝐧... <br></br> 𝐈𝐟 𝐲𝐨𝐮 𝐜𝐥𝐢𝐜𝐤 𝐭𝐡𝐞
//           𝐫𝐢𝐠𝐡𝐭 𝐛𝐮𝐛𝐛𝐥𝐞 𝐲𝐨𝐮 𝐮𝐧𝐥𝐨𝐜𝐤 𝐚 𝐬𝐩𝐞𝐜𝐢𝐚𝐥 𝐤𝐞𝐲(🗝️) 𝐭𝐨 𝐭𝐡𝐞 𝐧𝐞𝐱𝐭 𝐩𝐮𝐳𝐳𝐥𝐞.{" "}
//           <br></br> (𝐁𝐮𝐭 𝐭𝐡𝐞𝐫𝐞 𝐢𝐬 𝐚 𝐜𝐚𝐭𝐜𝐡)<br></br> ***𝐘𝐨𝐮 𝐡𝐚𝐯𝐞 𝟏𝟏 𝐜𝐡𝐚𝐧𝐜𝐞𝐬***
//           <br></br>
//           𝐄𝐚𝐜𝐡 𝐭𝐢𝐦𝐞 𝐲𝐨𝐮 𝐜𝐥𝐢𝐜𝐤 𝐭𝐡𝐞 𝐰𝐫𝐨𝐧𝐠 𝐛𝐮𝐛𝐛𝐥𝐞 𝐭𝐡𝐞 𝐤𝐞𝐲 𝐭𝐞𝐥𝐞𝐩𝐨𝐫𝐭𝐬 𝐭𝐨 𝐭𝐡𝐞 𝐚𝐧𝐨𝐭𝐡𝐞𝐫
//           𝐛𝐮𝐛𝐛𝐥𝐞 𝐚𝐧𝐝 𝐭𝐡𝐞 𝐛𝐮𝐛𝐛𝐥𝐞 𝐰𝐡𝐞𝐫𝐞 𝐭𝐡𝐞 𝐤𝐞𝐲 𝐰𝐚𝐬 𝐭𝐮𝐫𝐧𝐬 𝐛𝐥𝐚𝐜𝐤🚩.<br></br> 𝐓𝐡𝐞
//           𝐠𝐚𝐦𝐞 𝐬𝐡𝐨𝐰𝐬 "❌" 𝐟𝐨𝐫 𝐚𝐥𝐫𝐞𝐚𝐝𝐲 𝐜𝐥𝐢𝐜𝐤𝐞𝐝 𝐛𝐮𝐛𝐛𝐥𝐞𝐬.
//           <br></br>𝐄𝐚𝐜𝐡 𝐭𝐢𝐦𝐞 𝐲𝐨𝐮 𝐜𝐥𝐢𝐜𝐤 𝐭𝐡𝐞 𝐰𝐫𝐨𝐧𝐠 𝐛𝐮𝐛𝐛𝐥𝐞 𝐭𝐡𝐞 𝐤𝐞𝐲 𝐭𝐞𝐥𝐞𝐩𝐨𝐫𝐭𝐬 𝐭𝐨 𝐭𝐡𝐞
//           𝐚𝐧𝐨𝐭𝐡𝐞𝐫 𝐛𝐮𝐛𝐛𝐥𝐞 𝐚𝐧𝐝 𝐭𝐡𝐞 𝐛𝐮𝐛𝐛𝐥𝐞 𝐰𝐡𝐞𝐫𝐞 𝐭𝐡𝐞 𝐤𝐞𝐲 𝐰𝐚𝐬 𝐭𝐮𝐫𝐧𝐬 𝐛𝐥𝐚𝐜𝐤🚩
//           <br></br>
//         </div>
//         <div className="boxes">
//           <div className="clicked">chance played: {arrayofcell.length}</div>
//           <div className="clicked">Time: {time}</div>
//         </div>
//       </div>

//       <div style={{ filter: `blur(${boxblur}px)` }} className="grid">
//         {Array.from({ length: gridSize }).map((_, colindex) => (
//           <div key={colindex} className="row">
//             {Array.from({ length: gridSize }).map((_, rowindex) => {
//               const cellindex = rowindex * gridSize + colindex + 1;
//               return (
//                 <Cell
//                   key={cellindex}
//                   id={cellindex}
//                   handleclick={handleCellClick}
//                   isselected={currcell === cellindex}
//                   iswon={iswon}
//                   disabled={isdisabled}
//                   selectedcell={arrayofcell}
//                   treasureposition={treasurepositionhistory}
//                 />
//               );
//             })}
//           </div>
//         ))}
//       </div>
//       <div style={{ display: display }} className="hint-given">
//         ***HINT***
//       </div>
//       <div
//         style={{ display: display }}
//         onClick={remove}
//         className="remove-hintbox"
//       >
//         ❌
//       </div>
//     </div>
//   );
// }
