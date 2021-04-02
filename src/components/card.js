import React from "react";
import Tilt from 'react-parallax-tilt';

const Card = React.forwardRef(({player, rotate, currentCard, index, children}, ref) => {
  const rotateCard = rotate();
  const top = currentCard() ? 0: rotateCard;
  if(currentCard()) {
    return (
        <div ref={ref} className=" relative Card">
          <Tilt
            scale={1.02}
            perspective={1000}
          >
          <div style={{ background: player.color , color: player.textColor, height:"17rem", width: "30rem", transformOrigin: "center", transform: `rotate(${top}deg)`}}
               className={`rounded-lg w-full m-auto flex relative px-12 ${currentCard() ? 'shadow-laura': ''}`}>
              <span className="m-auto font-thin text-5xl">
               {player.name}
             </span>
            {children}
          </div>
          </Tilt>
        </div>
    )
  } else {
    return (
      <div ref={ref} className="color absolute Card">
        <div style={{
          background: player.color,
          color: player.textColor,
          height: "17rem",
          width: "30rem",
          transformOrigin: "center",
          transform: `rotate(${top}deg)`
        }} className="rounded-lg w-full m-auto flex relative px-12">
        <span className="m-auto font-thin text-5xl">
         {player.name}
       </span>
          {children}
        </div>
      </div>
    )
  }
});


export default Card;