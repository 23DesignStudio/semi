import React, { useState } from "react";

//material ui
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

const CmdSelect = props => {
  const { propKey, name, code, items, setValue } = props;
  const [select, setSelect] = useState("");
  const hl_onChange = e => {
    let _select = e.target.value;
    setSelect(_select);
    setValue(propKey, _select);
  };
  return (
    <TextField
      select
      value={select}
      label={name}
      onChange={hl_onChange}
      margin="normal"
      variant="outlined"
      helperText="選擇對齊位置"
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
