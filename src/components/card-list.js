import Card from "./card";
import React from "react";
import Button from "./button";
import {random} from "../utils";
import AnimateCards from './animate-cards';


const rotate = () => {
  return random(-10, 10);
}

const CardList = ({
                    animate,
                    shouldRunAnimation,
                    players,
                    showRemove,
                    handleContinue,
                    handleRemovePlayer
}) => {

  const calculateCurrentPlayer = (player) => {
    const playersCopy  = [...players];
    const current = playersCopy.pop();
    return current.id === player.id;
  }

  const cardsList = players.map((player, i) => {
    return (
      <Card
        ref={React.createRef()}
        key={player.id}
        player={player}
        rotate={rotate}
        index={i}
        currentCard={() => calculateCurrentPlayer(player) }>

        {!showRemove &&  calculateCurrentPlayer(player) &&
        <div className="absolute w-full left-0 grid grid-cols-3 gap-0.2">
          <Button onClick={handleContinue} className="CardButton relative rounded bg-white absolute right-0 uppercase font-bold text-gray-900">Keep</Button>
          <Button style={{backgroundColor: `${player.color}`}} className="CardButton text-white rounded relative strong">OR</Button>
          <Button onClick={() => handleRemovePlayer(player.id)} className="CardButton relative rounded-lg z-10 bg-black text-white uppercase font-bold">Remove</Button>
        </div>
        }
      </Card>
    )
  });

  return (
    <AnimateCards
      animate={animate}
      shouldRunAnimation={shouldRunAnimation}>
    {cardsList}
    </AnimateCards>
  );
};

export default CardList;