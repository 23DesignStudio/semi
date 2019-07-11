import React from "react";

const CommandButton = props => {
  const { name, value, typeIn } = props;

  const hl_onClick = e => {
    let name = e.target.name;
    typeIn(name);
  };
  return (
    <button name={name} onClick={hl_onClick}>
      {value}
    </button>
  );
};

export default CommandButton;
