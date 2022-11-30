import React from "react";

const Tooltip = (props) => {
  const [active, setActive] = React.useState(false);
  const showTip = () => {
    setActive(true);
  };
  const hideTip = () => {
    setActive(false);
  };
  return (
    <div
      className={`${props.className} tooltip-wrapper`}
      onMouseEnter={showTip}
      onMouseLeave={hideTip}
    >
      {props.children}
      {active && (
        <div className={`tooltip ${props.direction || "bottom"}`}>
          {props.content}
        </div>
      )}
    </div>
  );
};
export default Tooltip;
