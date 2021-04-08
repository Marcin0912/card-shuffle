import React from "react";
import Tilt from "react-parallax-tilt";

const Card = React.forwardRef(
  ({ player, rotate, currentCard, index, children }, ref) => {
    const top = currentCard() ? 0 : rotate();
    const cardStyles = {
      background: player.color,
      color: player.textColor,
      height: "17rem",
      width: "30rem",
      transformOrigin: "center",
      transform: `rotate(${top}deg)`,
    };

    if (currentCard()) {
      return (
        <div ref={ref} className=" relative Card">
          <Tilt scale={1.02} perspective={1000}>
            <div
              style={cardStyles}
              className={`rounded-lg w-full m-auto flex relative px-12 ${
                currentCard() ? "shadow-laura" : ""
              }`}
            >
              <span className="m-auto font-thin text-5xl">{player.name}</span>
              {children}
            </div>
          </Tilt>
        </div>
      );
    }

    return (
      <div ref={ref} className="color absolute Card">
        <div
          style={cardStyles}
          className="rounded-lg w-full m-auto flex relative px-12"
        >
          <span className="m-auto font-thin text-5xl">{player.name}</span>
          {children}
        </div>
      </div>
    );
  }
);

export default Card;
