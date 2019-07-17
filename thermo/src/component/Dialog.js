import React, { useState } from "react";

const Dialog = props => {
  const { setEncodedData, convertToGb18030 } = props;
  const [rawText, setRawText] = useState("");
  const [resData, setResData] = useState({ success: "", resText: "" });

  const hl_onChange_rawText = e => {
    setRawText(e.target.value);
    setResData({ success: "", resText: "" });
  };

  const hl_onClick_clearAll = () => {
    setRawText("");
    setResData({ success: "", resText: "" });
  };

  const fn_stringToGb18030String = text => {
    let strGb18030 = "";
    for (let c of text) {
      strGb18030 += convertToGb18030(c);
    }
    return strGb18030;
  };

  const hl_httpRequest = text => {
    let url = "http://localhost:9000/test?data=";
    let data = fn_stringToGb18030String(text);
    fetch(url + data)
      .then(res => res.text())
      .then(result => {
        if (result === "sent") {
          setResData({ success: "已送出", resText: result.toString() });
        } else {
          setResData({ success: "錯誤", resText: result.toString() });
        }
      });

    setEncodedData(data);
  };

  return (
    <div>
      <h4>及時列印</h4>
      <h5>UTF-8轉GB18030</h5>
      <input
        type="text"
        name="data"
        value={rawText}
        onChange={hl_onChange_rawText}
      />
      &nbsp;
      <input
        type="submit"
        value="送出"
        onClick={() => hl_httpRequest(rawText)}
      />
      <button onClick={hl_onClick_clearAll}>清除</button>
      <br />
      <code>{resData.success}</code>
    </div>
  );
};

export default Dialog;
