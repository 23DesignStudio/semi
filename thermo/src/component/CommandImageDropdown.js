import React from "react";

const CommandImageDropDown = props => {
  const { string, cmd, cmdCode, items, setCommand } = props;
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
          let value = items[e.target.value];
          if (value !== null) {
            let code = cmdCode + value + ",\n";
            setCommand(cmd, code);
          } else {
            setCommand("");
          }
        }}
      >
        {optionGroup}
      </select>
    </div>
  );
};

export default CommandImageDropDown;
