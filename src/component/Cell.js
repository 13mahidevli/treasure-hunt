import React from "react";
import "./cell.css";

export default function Cell({selectedcell,treasureposition,disabled,iswon,isselected,handleclick,id}) {
  let classname=`cell ${isselected && (iswon?'won':'selected')}`
  if (disabled) {
    classname='disabled'
  }
  if (treasureposition.includes(id)) {
    classname=`choosen`
  }
  return (
    <div>
      <button disabled={disabled} onClick={()=>{handleclick(id)}} className={classname}> {isselected && (iswon? ' 🗝️':'')}{treasureposition.includes(id)?'🚩':''}{!treasureposition.includes(id) && !iswon && selectedcell.includes(id)?'❌':''}</button>
    </div>
  )
}