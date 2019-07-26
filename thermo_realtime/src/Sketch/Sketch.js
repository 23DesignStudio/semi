const Sketch = p => {
  let canvasSize = { width: 0, height: 0 };

  p.setup = function() {
    p.createCanvas(canvasSize.width, canvasSize.height);
  };

  p.myCustomRedrawAccordingToNewPropsHandler = function(props) {
    if (props.canvasSize) {
      canvasSize = props.canvasSize;
    }
  };

  p.draw = function() {
    p.background(250);
    p.rect(20, 20, 220, 480);
  };

  p.windowResized = function() {
    p.resizeCanvas(canvasSize.width, canvasSize.height);
  };
};

export default Sketch;
