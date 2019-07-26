import React from "react";

//material ui
import Button from "@material-ui/core/Button";
const CmdButton = props => {
  const { name, code, fn_setCmdText } = props;
  const hl_onClick = () => {
    fn_setCmdText(code);
  };
  return (
    <div>
      <Button variant="outlined" size={"small"} color={"default"}>
        {name}
      </Button>
    </div>
  );
};

export default CmdButton;
