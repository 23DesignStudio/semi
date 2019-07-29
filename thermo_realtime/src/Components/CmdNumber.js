import React, { useState } from "react";
//material ui
import TextField from "@material-ui/core/TextField";

const CmdNumber = props => {
  const { propKey, name, code, range, helper, setValue } = props;
  const [number, setNumber] = useState(1);
  const hl_onChange = e => {
    let _number = e.target.value;
    if (_number < range[0]) {
      _number = range[0];
    } else if (_number > range[1]) {
      _number = range[1];
    }
    setNumber(_number);
    setValue(propKey, _number);
  };
  return (
    <TextField
      label={name}
      type="number"
      value={number}
      onChange={hl_onChange}
      margin="dense"
      variant="outlined"
      helperText={helper}
    />
  );
};

export default CmdNumber;
