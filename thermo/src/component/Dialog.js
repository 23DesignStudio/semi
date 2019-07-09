import React, { useState } from "react";

const Dialog = props => {
  const [text, setText] = useState("");
  const [resData, setResData] = useState({ success: "", resText: "" });

  const hl_onChangeText = e => {
    setText(e.target.value);
    setResData({ success: "", resText: "" });
  };

  const hl_httpRequest = data => {
    let url = "http://localhost:9000/test?data=";
    fetch(url + data)
      .then(res => res.text())
      .then(result => {
        setResData({ success: "已送出", resText: result.toString() });
        props.getData(props.getGb18030(data));
      });
  };

  return (
    <div>
      <h4>及時列印</h4>
      <input type="text" name="data" value={text} onChange={hl_onChangeText} />
      <input type="submit" value="送出" onClick={() => hl_httpRequest(text)} />
      <br />
      <code>{resData.success}</code>
    </div>
  );
};

export default Dialog;
