import React, { useState } from "react";

const CommandInput = props => {
  const { code, name, unit, min, max, getValue } = props;
  const [inputNum, setInputNum] = useState(1);
  const hl_onChange = e => {
    let tempNum = e.target.value;
    setInputNum(tempNum);
  };

  return (
    <div>
      {name}
      <input type="number" min={min} max={max} onChange={hl_onChange} />
      {unit}
      <button onClick={e => getValue(code, inputNum)}>送出</button>
    </div>
  );
};

export default CommandInput;
