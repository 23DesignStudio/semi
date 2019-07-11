import React from "react";

const CommandDropDown = props => {
  const { code, items, getSelect } = props;
  const optionGroup = Object.keys(items).map(key => (
    <option value={items[key]} key={items[key]}>
      {key}
    </option>
  ));

  return (
    <select onChange={e => getSelect(code, e.target.value)}>
      {optionGroup}
    </select>
  );
};

export default CommandDropDown;
