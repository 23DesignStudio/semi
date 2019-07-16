import React, { useState } from "react";

const CommandQrDropdown = props => {
  const { string, cmdCode, items, setCommand } = props;
  const [selected, setSelected] = useState("");
  const [isSent, seIsSent] = useState(false);
  const optionGroup = Object.keys(items).map(key => (
    <option value={key} key={key}>
      {key}
    </option>
  ));

  const hl_onChange_selected = e => {
    let value = items[e.target.value];
    if (value !== null) {
      setSelected(cmdCode + value + "\n");
    } else {
      setSelected("");
    }
    seIsSent(false);
  };

  const hl_onClick_sendValue = () => {
    if (selected !== "") {
      setCommand(selected);
      seIsSent(true);
    }
  };
  return (
    <div>
      {string}
      <select onChange={hl_onChange_selected}>{optionGroup}</select>
      <button onClick={hl_onClick_sendValue}>送出</button>
      {isSent && <code>...已送出</code>}
    </div>
  );
};

export default CommandQrDropdown;
