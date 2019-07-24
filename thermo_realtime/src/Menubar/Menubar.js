import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Tabpanel from "./Tabpanel";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: "theme.palette.background.paper"
  }
}));

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`
  };
}

const Menubar = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  return (
    <div className={classes.root}>
      <AppBar position="static" color={"default"}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="Functional tabs"
        >
          <Tab label="文字" {...a11yProps(0)} />
          <Tab label="圖片" {...a11yProps(1)} />
          <Tab label="QR Code" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <Tabpanel value={value} index={0}>
        Item One
      </Tabpanel>
      <Tabpanel value={value} index={1}>
        Item Two
      </Tabpanel>
      <Tabpanel value={value} index={2}>
        Item Three
      </Tabpanel>
    </div>
  );
};

export default Menubar;