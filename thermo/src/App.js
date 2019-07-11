import React, { useState } from "react";

// Material Ui
// import { makeStyles } from "@material-ui/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

// Custom
import MenuBar from "./component/MenuBar";
import OutputCodeBox from "./component/OutputCodeBox";
import ImageUpload from "./component/ImageUpload";
import InputTextBox from "./component/InputTextBox";
import QRcode from "./component/QRcode";
import Dialog from "./component//Dialog";

// const useStyle = makeStyles({
//   root: {}
// });

function App() {
  // menu state
  const [selectedItem, setSelectedItem] = useState("word");
  // get encoded data
  const [data, setData] = useState("");
  // check if encoded data is copied to clipboard
  const [copySuccess, setCopySuccess] = useState(false);
  const cmdArray = {
    33: "0x1b,0x40,",
    10: "0x0d,0x0a,",
    35: "0x1b,0x61,",
    36: "0x1d,0x21,",
    37: "0x1b,0x42,",
    40: "0x1b,0x33,",
    41: "0x1b,0x20,",
    42: "0x1b,0x56,"
  };

  const hl_MenuBar = it => {
    setSelectedItem(it);
    setData("");
    setCopySuccess(false);
  };

  // gb18030 encoder
  const encoder = new TextEncoder("gb18030", {
    NONSTANDARD_allowLegacyEncoding: true
  });

  const hl_getData = data => {
    setData(data);
    setCopySuccess(false);
  };

  const hl_copySuccess = success => {
    setCopySuccess(success);
  };

  const s_clearOutput = () => {
    setData("");
  };

  const hl_gb18030 = data => {
    let convertToHex = "";
    const converToGB18030 = encoder.encode(data);
    converToGB18030.forEach(element => {
      if (element !== null) {
        if (cmdArray.hasOwnProperty(element)) {
          convertToHex += cmdArray[element];
        } else {
          convertToHex += "0x" + element.toString(16) + ",";
        }
      }
    });
    return convertToHex;
  };

  let inputBox = null;
  if (selectedItem === "word") {
    inputBox = (
      <InputTextBox
        row={8}
        col={50}
        getData={hl_getData}
        getGb18030={hl_gb18030}
      />
    );
  } else if (selectedItem === "image") {
    inputBox = <ImageUpload getData={hl_getData} />;
  } else if (selectedItem === "qrcode") {
    inputBox = <QRcode getData={hl_getData} getGb18030={hl_gb18030} />;
  } else if (selectedItem === "dialog") {
    inputBox = <Dialog getData={hl_getData} getGb18030={hl_gb18030} />;
  }

  return (
    <div>
      <CssBaseline />
      <Container>
        <Grid container>
          <Grid item xs={6}>
            <h2>23設計: 熱列印程式</h2>
            <MenuBar selectItem={hl_MenuBar} />
            {inputBox}
          </Grid>
          <Grid item xs={6}>
            <OutputCodeBox
              row={20}
              col={60}
              value={data}
              isCopyed={copySuccess ? "已複製" : ""}
              setSuccess={hl_copySuccess}
              clearData={s_clearOutput}
            />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default App;
