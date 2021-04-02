import React from "react";
import Button from "./button.js";
const Player = ({name, id, onRemove}) => {
  return (
    <div className="grid grid-cols-2 gap-1">
      <div className="py-2 px-2 text-left text-white pl-7">
        {name}
      </div>
      <Button onClick={() => onRemove(id)}  style={{backgroundColor: "#0b0a0c"}} className="text-xs my-1.5 ml-auto mr-6 w-min py-2 px-5 rounded text-white font-bold font shadow-laura">Remove</Button>
    </div>
  )
};

export default Player;