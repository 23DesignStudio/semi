import React, { useState } from "react";

export default function InputTextBox(props) {
  const { row, col, getData } = props;
  const [text, setText] = useState("");

  //functions
  const hl_change = event => {
    setText(event.target.value);
  };
  const hl_text = () => {
    getData(text);
  };

  return (
    <div>
      <div>
        <h4>文字資料</h4>
        <textarea rows={row} cols={col} value={text} onChange={hl_change} />
        <div>
          <button onClick={hl_text}>轉換</button>
        </div>
      </div>
    </div>
  );
}
