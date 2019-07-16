import React, { useState } from "react";
import QRCode from "qrcode.react";
import CommandQrDropdown from "./CommandQrDropdown";
import CommandQrInput from "./CommandQrInput";

export default function QRcode(props) {
  const [url, setUrl] = useState("");
  const [qrGraph, setQrGraph] = useState(false);
  const [cmbLine, setComdLine] = useState("");

  const hl_change = event => {
    setUrl(event.target.value);
  };

  const hl_onClick_generateQRcode = () => {
    if (url !== "") {
      setQrGraph(true);
    }
  };
  const hl_onClick_setData = () => {
    props.setEncodedData(cmbLine + fn_urlTogb18030(url));
  };
  const hl_onClick_clearAll = () => {
    setUrl("");
    setQrGraph(false);
    setComdLine("");
  };

  const fn_urlTogb18030 = url => {
    let encodedData = "";
    for (let c of url) {
      let cHex = props.convertToGb18030(c);
      encodedData += "0x" + cHex + ",";
    }
    return encodedData;
  };

  const s_setCommand = value => {
    let temp = cmbLine;
    temp += value;
    setComdLine(temp);
  };

  return (
    <div>
      <h4>網址資料</h4>
      <div>
        網址
        <input type="text" value={url} onChange={hl_change} />
        <button onClick={hl_onClick_generateQRcode}>生成QR碼</button>
        <br />
        <br />
        {qrGraph && (
          <div>
            <QRCode value={url} />
            <CommandQrDropdown
              string={"對齊"}
              cmdCode={"0x1b,0x61,"}
              items={{
                請選擇: null,
                左: "0x30",
                中: "0x31",
                右: "0x32"
              }}
              setCommand={s_setCommand}
            />
            <CommandQrInput
              string={"大小"}
              cmdCode={"0x1d,0x28,0x6b,0x03,0x00,0x31,0x43,"}
              unit={"倍"}
              min={1}
              max={15}
              setCommand={s_setCommand}
            />
          </div>
        )}
        <br />
        <button onClick={hl_onClick_setData}>轉換</button>
        <button onClick={hl_onClick_clearAll}>清除</button>
        <br />
        <br />
      </div>
    </div>
  );
}
