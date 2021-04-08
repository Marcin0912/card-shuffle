import React from "react";

const Button = ({ onClick, ...otherProps }) => {
  return (
    <button
      className="focus:outline-none text-gray-800  py-5 px-5 rounded-md border bg-white font-bold uppercase relative"
      onClick={onClick}
      {...otherProps}
    />
  );
};

export default Button;
