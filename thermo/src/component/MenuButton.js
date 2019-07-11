import React from "react";
const cssSelected = {
  backgroundColor: "#cccccc"
};

const cssDefault = {
  backgroundColor: "#e6e6e6"
};

const MenuButton = props => {
  const { color, name, value, getItem } = props;
  const btnColor = color === true ? cssSelected : cssDefault;
  return (
    <button
      type="button"
      style={btnColor}
      name={name}
      onClick={e => {
        getItem(e.target.name);
      }}
    >
      {value}
    </button>
  );
};

export default MenuButton;
