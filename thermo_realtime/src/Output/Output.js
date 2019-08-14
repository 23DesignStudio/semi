import React from "react";
import P5Wrapper from "react-p5-wrapper";
import Sketch from "../Sketch/Sketch";

const Output = props => {
  return (
    <div>
      <P5Wrapper sketch={Sketch} canvasSize={props.canvasSize} />
    </div>
  );
};

export default Output;
