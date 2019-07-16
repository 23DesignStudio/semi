import React, { useState } from "react";

const CommandDoubleInput = props => {
  const {
    propkey,
    string,
    min,
    max,
    unit,
    addCmdToText,
    updateCmdObjects
  } = props;
  const [inputNumA, setInputNumA] = useState(1);
  const [inputNumB, setInputNumB] = useState(1);

  const hl_onChange_inputA = e => {
    let tempNum = parseInt(e.target.value);
    if (tempNum > max) {
      tempNum = max;
    } else if (tempNum < min) {
      tempNum = min;
    }
    setInputNumA(tempNum);
  };
  const hl_onChange_inputB = e => {
    let tempNum = parseInt(e.target.value);
    if (tempNum > max) {
      tempNum = max;
    } else if (tempNum < min) {
      tempNum = min;
    }
    setInputNumB(tempNum);
  };
  const hl_onClick_sendValue = () => {
    let tempValueA = inputNumA - 1;
    let tempValueB = inputNumB - 1;
    let tempValue = tempValueA.toString() + tempValueB.toString();

    if (tempValue < 16) {
      tempValue = "0x000" + tempValue.toString(16);
    } else {
      tempValue = "0x00" + tempValue.toString(16);
    }

    let tempCmdString =
      "<" +
      string +
      ":" +
      inputNumA.toString() +
      "x" +
      inputNumB.toString() +
      ">";
    addCmdToText(tempCmdString);
    updateCmdObjects(propkey, String.fromCharCode(tempValue), tempCmdString);
  };
  return (
    <div>
      {string}
      <input
        value={inputNumA}
        type="number"
        min={min}
        max={max}
        onChange={hl_onChange_inputA}
      />
      <input
        value={inputNumB}
        type="number"
        min={min}
        max={max}
        onChange={hl_onChange_inputB}
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

export default CommandDoubleInput;
