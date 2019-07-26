import React from "react";

//material ui
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Box from "@material-ui/core/Box";

const CmdRadio = props => {
  const { name, code, items } = props;

  const radios = items.map((value, index) => {
    return (
      <FormControlLabel
        key={index}
        value={value}
        control={<Radio />}
        label={value}
      />
    );
  });
  return (
    <Box>
      <FormControl variant="outlined">
        <FormLabel>{name}</FormLabel>
        <RadioGroup aria-label={name} name={name} value={""} row>
          {radios}
        </RadioGroup>
      </FormControl>
    </Box>
  );
};

export default CmdRadio;
