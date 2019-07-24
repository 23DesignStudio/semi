import React, { useState } from "react";

const CommandImageInput = props => {
  const { string, cmd, cmdCode, min, max, setCommand } = props;
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
      tempValue = "0x0" + tempValue.toString(16);
    } else {
      tempValue = "0x" + tempValue.toString(16);
    }
    let code = cmdCode + tempValue + ",\n";

    setCommand(cmd, code);
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
      <button onClick={hl_onClick_sendValue}>送出</button>
    </div>
  );
};

export default CommandImageInput;
