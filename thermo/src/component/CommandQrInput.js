import React, { useState } from "react";

const CommandQrInput = props => {
  const { string, cmdCode, unit, min, max, setCommand } = props;
  const [inputNum, setInputNum] = useState(1);
  const [isSent, seIsSent] = useState(false);

  const hl_onChange_input = e => {
    let tempNum = e.target.value;
    if (tempNum > max) {
      tempNum = max;
    } else if (tempNum < min) {
      tempNum = min;
    }
    setInputNum(tempNum);
    seIsSent(false);
  };

  const hl_onClick_sendValue = () => {
    let tempInput = "0x0" + parseInt(inputNum).toString(16) + "\n";
    setCommand(cmdCode + tempInput);
    seIsSent(true);
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
      {isSent && <code>...已送出</code>}
    </div>
  );
};

export default CommandQrInput;
