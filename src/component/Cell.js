import React from "react";
import "./cell.css";

export default function Cell({iswon,isselected,handleclick,id}) {
  let classname=`cell ${isselected && (iswon?'won':'selected')}`
  return (
    <div>
      <button onClick={()=>{handleclick(id)}} className={classname}> {isselected && (iswon? '🏆':'❌')}</button>
    </div>
  )
}
