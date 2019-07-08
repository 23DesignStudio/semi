import React, { useState } from "react";
import MenuBar from "./component/MenuBar";
import OutputCodeBox from "./component/OutputCodeBox";
import ImageUpload from "./component/ImageUpload";
import InputTextBox from "./component/InputTextBox";
import QRcode from "./component/QRcode";

function App() {
  // menu state
  const [selectedItem, setSelectedItem] = useState("word");
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

  const hl_wordData = text => {
    let convertToHex = "";
    const converToGB18030 = encoder.encode(text);
    converToGB18030.forEach(element => {
      if (element !== null) {
        convertToHex += "0x" + element.toString(16) + ",";
      }
    });
    setData(convertToHex);
  };

  const hl_copySuccess = success => {
    setCopySuccess(success);
  };

  const hl_imageData = image => {
    setData(image);
  };

  const hl_qrCodeData = qrcode => {
    setData(qrcode);
  };

  let inputBox = null;
  if (selectedItem === "word") {
    inputBox = <InputTextBox row={5} col={50} getData={hl_wordData} />;
  } else if (selectedItem === "image") {
    inputBox = <ImageUpload getData={hl_imageData} />;
  } else if (selectedItem === "qrcode") {
    inputBox = <QRcode getData={hl_qrCodeData} />;
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
