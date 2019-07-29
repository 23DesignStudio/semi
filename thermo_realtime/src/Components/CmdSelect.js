import React, { useState } from "react";

//material ui
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

const CmdSelect = props => {
  const { propKey, name, code, valuePair, items, helper, setValue } = props;
  const [select, setSelect] = useState(items[0]);
  const hl_onChange = e => {
    let _select = e.target.value;
    setSelect(_select);
    let _index = items.indexOf(_select);
    let _codeString = code + valuePair[_index];
    setValue(propKey, _codeString);
  };
  return (
    <TextField
      select
      value={select}
      label={name}
      onChange={hl_onChange}
      margin="dense"
      variant="outlined"
      helperText={helper}
    >
      {items.map((value, index) => (
        <MenuItem key={index} value={value}>
          {value}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default CmdSelect;
