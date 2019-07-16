import React, { useState } from "react";

const CommandInput = props => {
  const {
    propkey,
    string,
    unit,
    min,
    max,
    addCmdToText,
    updateCmdObjects
  } = props;
  const [inputNum, setInputNum] = useState(1);

  const hl_onChange_input = e => {
    let tempNum = e.target.value;
    if (tempNum > max) {
      tempNum = max;
    } else if (tempNum < min) {
      tempNum = min;
    }
    setInputNum(tempNum);
  };
  const hl_onClick_sendValue = () => {
    let tempValue = Number(inputNum);

    if (tempValue < 16) {
      tempValue = "0x000" + tempValue.toString(16);
    } else {
      tempValue = "0x00" + tempValue.toString(16);
    }

    let tempCmdString = "<" + string + ":" + inputNum + ">";
    addCmdToText(tempCmdString);
    updateCmdObjects(propkey, String.fromCharCode(tempValue), tempCmdString);
  };

  return (
    <div>
      {string}
      <input
        value={inputNum}
        type="number"
        min={min}
        max={max}
        onChange={hl_onChange_input}
      />
      {unit}
      <code>
        [範圍: {min} - {max}]
      </code>
      <button onClick={hl_onClick_sendValue}>送出</button>
      <br />
    </div>
  );
};

export default CommandInput;
