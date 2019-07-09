import React, { useState } from "react";
import MenuBar from "./component/MenuBar";
import OutputCodeBox from "./component/OutputCodeBox";
import ImageUpload from "./component/ImageUpload";
import InputTextBox from "./component/InputTextBox";
import QRcode from "./component/QRcode";
import Dialog from "./component//Dialog";

function App() {
  // menu state
  const [selectedItem, setSelectedItem] = useState("image");
  // get encoded data
  const [data, setData] = useState("");
  // check if encoded data is copied to clipboard
  const [copySuccess, setCopySuccess] = useState(false);

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

  const hl_gb18030 = data => {
    let convertToHex = "";
    const converToGB18030 = encoder.encode(data);
    converToGB18030.forEach(element => {
      if (element !== null) {
        convertToHex += "0x" + element.toString(16) + ",";
      }
    });
    return convertToHex;
  };

  let inputBox = null;
  if (selectedItem === "word") {
    inputBox = (
      <InputTextBox
        row={5}
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
      <h3>熱列印程式</h3>
      <MenuBar selectItem={hl_MenuBar} />
      {inputBox}
      <OutputCodeBox
        row={10}
        col={50}
        value={data}
        isCopyed={copySuccess ? "已複製" : ""}
        setSuccess={hl_copySuccess}
      />
    </div>
  );
}

export default App;
