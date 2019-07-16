import React from "react";

const CommandButton = props => {
  const { string, addCmdToText } = props;

  const hl_onClick = () => {
    let temp = "<" + string + ">";
    addCmdToText(temp);
  };
  return <button onClick={hl_onClick}>{string}</button>;
};

export default CommandButton;
