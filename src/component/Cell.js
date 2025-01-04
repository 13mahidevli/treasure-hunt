import React from "react";
import "./cell.css";

export default function Cell({disabled,iswon,isselected,handleclick,id}) {
  let classname=`cell ${isselected && (iswon?'won':'selected')}`
  if (disabled) {
    classname='disabled'
  }
  return (
    <div>
      <button disabled={disabled} onClick={()=>{handleclick(id)}} className={classname}> {isselected && (iswon? '🏆':'❌')}</button>
    </div>
  )
}

