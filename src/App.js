import React, { useState, useEffect } from "react";
import "./App.css";
import Cell from "./component/Cell";

export default function App() {
  const gridSize = 10;

  // State to manage the game message, selected cell, and treasure position
  const [mess, setMess] = useState("START");
  const [cell, setCell] = useState(Array(gridSize).fill(null));
  const [iswon, setiswon] = useState("");
  const [color, setcolor] = useState("black");
  const [isdisabled, setisdisabled] = useState(false);
  const [currcell, setcurrcell] = useState("");
  const [arrayofcell, setarrayofcell] = useState([]);
  const [position, setposition] = useState(7);
  const [treasurePosition, setTreasurePosition] = useState(position * position);
  const [time, settime] = useState(0);

  useEffect(() => {
    setposition(1);
    console.log(position);
    console.log(treasurePosition);
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
    const selectedcell = [...arrayofcell, index];
    setarrayofcell(selectedcell);
    const newcell = [...cell];
    newcell[index] = "clicked";
    setCell(newcell);

    setcurrcell(index);
    console.log(newcell);
    console.log(newcell.length);
    console.log(selectedcell);

    if (cell) {
      setMess("know");
    }
    if (newcell) {
      setMess("know");
    }

    // Change treasure position after each click
    if (index === treasurePosition) {
      setMess("🎉You Won!!!");
      setcolor("yellow");
      setiswon(true);
      return;
    } else {
      setMess("🔄Try Again!!!");
      setcolor("brown");
      setiswon(false);
    }

    if (cell[index]) {
      setMess("you already choose this");
      setcolor("red");
      return;
    }

    console.log("index", index);
    console.log("position", position);
    console.log("treasurePosition", treasurePosition);
    setposition((prevposition) => prevposition + 1);
    setTreasurePosition(position * position);
    console.log(selectedcell.length);

    if (selectedcell.length == 10) {
      setMess("gave over");
      setisdisabled(true);
    }
  };

  // Main code of the game
  return (
    <div className="box">
      <div className="blockone">
        <h1 style={{ color: color }}>{mess}</h1>
        <div className="instruction"></div>
        <div className="boxes">
          <div className="clicked">chance played: {arrayofcell.length}</div>
          <div className="clicked">Time: {time}</div>
        </div>{" "}
      </div>

      <div className="grid">
        {Array.from({ length: gridSize }).map((_, rowindex) => (
          <div key={rowindex} className="row">
            {Array.from({ length: gridSize }).map((_, colindex) => {
              const cellindex = rowindex * gridSize + colindex;
              return (
                <Cell
                  key={cellindex}
                  id={cellindex}
                  handleclick={handleCellClick}
                  isselected={currcell === cellindex}
                  iswon={iswon}
                  disabled={isdisabled}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
