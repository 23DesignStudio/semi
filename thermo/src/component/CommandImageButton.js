import React from "react";

const CommandImageButton = props => {
  const { string, cmd, cmdCode, setCommand } = props;

  const hl_onClick_setCommand = () => {
    setCommand(cmd, cmdCode);
  };

  return (
    <div>
      <button onClick={hl_onClick_setCommand}>{string}</button>
    </div>
  );
};

export default CommandImageButton;
