import React, { useState } from "react";
import QRCode from "qrcode.react";

export default function QRcode(props) {
  const [url, setUrl] = useState("");
  const [qrGraph, setQrGraph] = useState(false);

  const hl_change = event => {
    setUrl(event.target.value);
  };
  const hl_onClick = () => {
    props.getData(props.getGb18030(url));
    setQrGraph(true);
  };
  return (
    <div>
      <h4>網址資料</h4>
      <div>
        <input type="text" value={url} onChange={hl_change} />
        <br />
        <br />
        <button onClick={hl_onClick}>轉換</button>
        <br />
        <br />
      </div>
      {qrGraph && <QRCode value={url} />}
    </div>
  );
}
