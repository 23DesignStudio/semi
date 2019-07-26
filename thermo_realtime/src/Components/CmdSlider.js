import React from "react";

//material ui
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
const CmdSlider = props => {
  const { name, code, range } = props;
  return (
    <div>
      <Typography gutterBottom>{name}</Typography>
      <Slider
        defaultValue={range[0]}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={16}
        marks
        min={range[0]}
        max={range[1]}
      />
    </div>
  );
};

export default CmdSlider;
