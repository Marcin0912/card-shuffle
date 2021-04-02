import React from "react";
import Button from "./button";

const PlayerInputForm = ({player, onAddPlayer}) => {
  return (
    <form onSubmit={onAddPlayer}>
      <label htmlFor="player" className="uppercase text-white  py-2 text-left font-bold block w-full">Enter A Name</label>
      <input id="player" style={{backgroundColor: "#616062"}} className="rounded py-5 px-10 pl-7
       mb-2 w-full text-white" value={player} placeholder="First & Last" name="player"/>
      <Button style={{backgroundColor: "#0b0a0c"}} className="uppercase font-bold  py-2.5 px-10 text-white rounded w-full shadow-laura" type="submit">SUBMIT (OR PRESS ENTER)</Button>
    </form>
  )
}

export default PlayerInputForm;