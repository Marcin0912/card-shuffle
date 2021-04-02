import React from 'react';
import { useTrail, animated } from "react-spring";


const AnimateCards = ({
                        animate,
                        shouldRunAnimation,
                        children
}) => {

  const trail = useTrail(children.length, {
    config: { mass: 5, tension: 5000, friction: 200 },
    from: { y: -200, height: 0 },
    to: {y: 0},
    reset: true,
  });

  if(shouldRunAnimation === false) {
    return children
  } else if(animate) {
    return trail.map((item, index) => {
      return (
        <React.Fragment key={index}>
          <animated.div style={item}>{children[index]} &nbsp;</animated.div>
        </React.Fragment>
      );
    });
  } else {
    return children
  }
};

export default AnimateCards;