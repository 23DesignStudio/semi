const Sketch = p => {
  let rotation = 0;
  let parentWidth = 480;
  let parentHeight = 480;

  p.setup = function() {
    p.createCanvas(parentWidth, parentHeight, p.WEBGL);
  };

  p.myCustomRedrawAccordingToNewPropsHandler = function(props) {
    if (props.rotation) {
      rotation = (props.rotation * Math.PI) / 180;
    }
  };

  p.draw = function() {
    // parentWidth = document.getElementById("skecth-canvas").offsetWidth;
    // parentHeight = document.getElementById("skecth-canvas").offsetHeight;

    p.background(100);
    p.normalMaterial();
    p.noStroke();

    p.push();
    p.translate(-150, 100);
    p.rotateY(rotation);
    p.rotateX(-0.9);
    p.box(100);
    p.pop();

    p.noFill();
    p.stroke(255);
    p.push();
    p.translate(500, p.height * 0.35, -200);
    p.sphere(300);
    p.pop();
  };

  p.windowResized = function() {
    p.resizeCanvas(parentWidth, parentHeight);
  };
};

export default Sketch;
