import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import Menubar from "./Menubar/Menubar";
import Output from "./Output/Output";
import DebugOutput from "./Debug/DebugOutput";

function App() {
  // gb18030 encoder
  const encoder = new TextEncoder("gb18030", {
    NONSTANDARD_allowLegacyEncoding: true
  });

  //convert character to gb18030
  const fn_toGb18030Hex = character => {
    let cHex = "";
    let c = encoder.encode(character);
    if (c.length > 1) {
      cHex = "0x" + c[0].toString(16) + ",0x" + c[1].toString(16) + ",";
    } else {
      if (c[0] < 16) {
        cHex = "0x0" + c[0].toString(16) + ",";
      } else {
        cHex = "0x0" + c[0].toString(16) + ",";
      }
    }

    return cHex;
  };
  return (
    <div>
      <CssBaseline />
      <Container>
        <Typography variant="h5">Thermal Printer 0.3.0</Typography>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Paper>
              <Menubar />
              <DebugOutput />
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper>
              <Output />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default App;
