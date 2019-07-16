import React, { useState } from "react";

const Dialog = props => {
  const { setEncodedData, convertToGb18030 } = props;
  const [text, setText] = useState("");
  const [resData, setResData] = useState({ success: "", resText: "" });

  const hl_onChangeText = e => {
    setText(e.target.value);
    setResData({ success: "", resText: "" });
  };

  const hl_onClick_clearAll = () => {
    setText("");
    setResData({ success: "", resText: "" });
  };

  const hl_httpRequest = data => {
    let url = "http://localhost:9000/test?data=";
    fetch(url + data)
      .then(res => res.text())
      .then(result => {
        if (result === "sent") {
          setResData({ success: "已送出", resText: result.toString() });
        } else {
          setResData({ success: "錯誤", resText: result.toString() });
        }
        if (text !== "") {
          let encodedData = "";
          for (let c of text) {
            let cHex = convertToGb18030(c);
            encodedData += "0x" + cHex + ",";
          }

          setEncodedData(encodedData);
        }
      });
  };

  return (
    <div>
      <h4>及時列印</h4>
      <input type="text" name="data" value={text} onChange={hl_onChangeText} />
      &nbsp;
      <input type="submit" value="送出" onClick={() => hl_httpRequest(text)} />
      <button onClick={hl_onClick_clearAll}>清除</button>
      <br />
      <code>{resData.success}</code>
    </div>
  );
};

export default Dialog;
