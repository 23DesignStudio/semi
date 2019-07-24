import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Menubar from "./Menubar/Menubar";
import Output from "./Output/Output";

function App() {
  return (
    <div>
      <CssBaseline />
      <Container>
        <Typography variant="h5">Thermal Printer 0.3.0</Typography>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Menubar />
          </Grid>
          <Grid item xs={6}>
            <Output />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default App;
