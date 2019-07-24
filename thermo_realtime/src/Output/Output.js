import React, { useState, useEffect } from "react";
import P5Wrapper from "react-p5-wrapper";
import Paper from "@material-ui/core/Paper";
import Sketch from "../Sketch/Sketch";

const Output = () => {
  //const [renderStatus, changeRenderStatus] = useState(false);
  const [canvasWidth, setCanvasWidth] = useState(false);

  // No condition
  useEffect(() => {
    const hl_resize = event => {
      //passe a function to state setter to get fresh state value
      console.log("e: ", event.target.innerWidth);
    };

    window.addEventListener("resize", hl_resize);

    // clean up
    return () => window.currentremoveEventListener("resize", hl_resize);
  }, []); // empty array => run only once

  // const handleResize = e => {
  //   console.log("yo");
  // };
  // useEffect(() => {
  //   // initiate the event handler
  //   targetEl.target.addEventListener("resize", handleResize, false);

  //   // this will clean up the event every time the component is re-rendered
  //   return function cleanup() {
  //     targetEl.target.removeEventListener("resize", handleResize);
  //   };
  // });
  // const [paperSize, setpaperSize]=useState({});
  // useEffect(()=>{
  //   const handleResize = () => {
  //     setWidth(window.innerWidth)
  //   }
  // })
  // const refCallback = element => {
  //   if (element) {
  //     let width = element.getBoundingClientRect();
  //     console.log(width);
  //   }
  // };
  return (
    <Paper square>
      <P5Wrapper sketch={Sketch} rotation={150} />
    </Paper>
  );
};

export default Output;
