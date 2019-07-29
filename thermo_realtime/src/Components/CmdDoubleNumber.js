import React, { useState } from "react";

//material ui
import TextField from "@material-ui/core/TextField";

const CmdDoubleNumber = props => {
  const { propKey, name, code, range, units, helper, setValue } = props;
  const [numberA, setNumberA] = useState(1);
  const [numberB, setNumberB] = useState(1);

  const hl_onChange_a = e => {
    let _number = e.target.value;
    if (_number < range[0]) {
      _number = range[0];
    } else if (_number > range[1]) {
      _number = range[1];
    }
    setNumberA(_number);
    // setValue(propKey, _numbers);
  };
  const hl_onChange_b = e => {
    let _number = e.target.value;
    if (_number < range[0]) {
      _number = range[0];
    } else if (_number > range[1]) {
      _number = range[1];
    }
    setNumberB(_number);
    // setValue(propKey, _numbers);
  };
  return (
    <div>
      <TextField
        label={units[0]}
        type="number"
        value={numberA}
        onChange={hl_onChange_a}
        margin="dense"
        variant="outlined"
        helperText={name + helper[0]}
      />
      <TextField
        label={units[1]}
        type="number"
        value={numberB}
        onChange={hl_onChange_b}
        margin="dense"
        variant="outlined"
        helperText={name + helper[1]}
      />
    </div>
  );
};

export default CmdDoubleNumber;
