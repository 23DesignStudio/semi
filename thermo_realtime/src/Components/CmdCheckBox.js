import React, { useState } from "react";

//material ui
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

const CmdCheckBox = props => {
  const { propKey, name, code, setValue } = props;
  const [check, setCheck] = useState(false);

  const hl_onChange = e => {
    let _check = e.target.checked;
    setCheck(_check);
    setValue(propKey, _check);
  };

  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={check}
          onChange={hl_onChange}
          value={check}
          color="primary"
        />
      }
      label={name}
      labelPlacement="start"
    />
  );
};

export default CmdCheckBox;
