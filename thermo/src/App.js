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
  const [selectedItem, setSelectedItem] = useState("qrcode");
  // encoded data for output
  const [data, setData] = useState("");
  // check if encoded data is copied to clipboard
  const [copySuccess, setCopySuccess] = useState(false);

  // gb18030 encoder
  const encoder = new TextEncoder("gb18030", {
    NONSTANDARD_allowLegacyEncoding: true
  });
  ////pass to childern

  // handle click event to select item from menu
  const s_MenuBar = it => {
    setSelectedItem(it);
    setData("");
    setCopySuccess(false);
  };

  //convert character to gb18030
  const fn_gb18030 = character => {
    let c = encoder.encode(character)[0];
    let cHex = "";
    if (c < 16) {
      cHex = "0" + c.toString(16);
    } else {
      cHex = c.toString(16);
    }

    return cHex;
  };
  // get encoded data from childern for output
  const s_setData = encodeData => {
    setData(encodeData);
    setCopySuccess(false);
  };

  // handle output click event, check
  const s_copySuccess = success => {
    setCopySuccess(success);
  };
  // handle output click event, check if encoded data is copied to clipboard
  const s_clearOutput = () => {
    setData("");
  };

  let inputBox = null;
  if (selectedItem === "word") {
    inputBox = (
      <InputTextBox
        row={8}
        col={50}
        setEncodedData={s_setData}
        convertToGb18030={fn_gb18030}
      />
    );
  } else if (selectedItem === "image") {
    inputBox = <ImageUpload setEncodedData={s_setData} />;
  } else if (selectedItem === "qrcode") {
    inputBox = (
      <QRcode setEncodedData={s_setData} convertToGb18030={fn_gb18030} />
    );
  } else if (selectedItem === "dialog") {
    inputBox = (
      <Dialog setEncodedData={s_setData} convertToGb18030={fn_gb18030} />
    );
  }

  return (
    <div>
      <CssBaseline />
      <Container>
        <Grid container>
          <Grid item xs={6}>
            <h2>23設計: 熱列印程式</h2>
            <MenuBar selectItem={s_MenuBar} />
            {inputBox}
            <code>v0.1.4</code>
          </Grid>
          <Grid item xs={6}>
            <OutputCodeBox
              row={20}
              col={60}
              value={data}
              isCopyed={copySuccess ? "已複製" : ""}
              setSuccess={s_copySuccess}
              clearData={s_clearOutput}
            />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default App;
