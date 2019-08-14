import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2)
  }
}));

const DebugOutput = props => {
  const debugText = props.debugText;
  const classes = useStyles();

  return (
    <Paper square className={classes.root}>
      <Typography varint={"h5"}>Debug</Typography>
      <Typography varint={"body"}>{debugText}</Typography>
    </Paper>
  );
};

export default DebugOutput;
