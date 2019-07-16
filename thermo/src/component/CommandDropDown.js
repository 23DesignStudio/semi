import React, { useState } from "react";

const CommandDropDown = props => {
  const { propkey, string, items, addCmdToText, updateCmdObjects } = props;
  const [selected, setSelected] = useState("請選擇");

  const hl_onClick_sendValue = () => {
    if (items[selected] !== null) {
      let tempValue = items[selected];
      let tempCmdString = "<" + string + ":" + selected + ">";
      addCmdToText(tempCmdString);
      updateCmdObjects(propkey, String.fromCharCode(tempValue), tempCmdString);
      console.log(tempCmdString);
    }
  };

  const optionGroup = Object.keys(items).map(key => (
    <option value={key} key={key}>
      {key}
    </option>
  ));

  return (
    <div>
      {string}
      <select
        onChange={e => {
          setSelected(e.target.value);
        }}
      >
        {optionGroup}
      </select>
      <button onClick={hl_onClick_sendValue}>送出</button>
    </div>
  );
};

export default CommandDropDown;
