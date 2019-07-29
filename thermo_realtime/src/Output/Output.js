import React, { useState, useEffect } from "react";
import P5Wrapper from "react-p5-wrapper";
import Sketch from "../Sketch/Sketch";

const Output = () => {
  //const [renderStatus, changeRenderStatus] = useState(false);
  const [canvasSize, setCanvasSize] = useState({ width: 300, height: 540 });

  // No condition
  useEffect(() => {
    const hl_resize = event => {
      let tempWidth = Math.floor((event.target.innerWidth * 0.94) / 3);
      let tempHeight = Math.floor(event.target.innerHeight * 0.95);

      setCanvasSize({ width: tempWidth, height: tempHeight });
    };

    window.addEventListener("resize", hl_resize);

    // clean up
    return () => window.currentremoveEventListener("resize", hl_resize);
  }, []); // empty array => run only once

  return (
    <div>
      <P5Wrapper sketch={Sketch} canvasSize={canvasSize} />
    </div>
  );
};

export default Output;
