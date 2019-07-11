import React, { useState } from "react";
import CommandButton from "./CommandButton";
import CommandDropDown from "./CommandDropDown";
import CommandInput from "./CommandInput";

export default function InputTextBox(props) {
  const { row, col, getData, getGb18030 } = props;
  const [text, setText] = useState("");
  const commandLine = {
    init: "!",
    newline: "\n"
  };
  //functions
  const hl_change = event => {
    setText(event.target.value);
  };
  const hl_onClick = () => {
    let data = getGb18030(text);
    getData(data);
  };
  const hl_cmdButton = key => {
    let oldText = text;
    let tempString = commandLine[key];
    if (tempString !== undefined) {
      setText(oldText + tempString);
    }
  };

  const hl_cmdDropDown = (code, value) => {
    if (value !== "") {
      let oldText = text;
      let tempString = code + value;
      setText(oldText + tempString);
    }
  };

  const s_cmdInput = (code, value) => {
    if (value !== "") {
      let oldText = text;
      let tempString = code + value;
      setText(oldText + tempString);
    }
  };
  const s_clearInput = () => {
    setText("");
  };

  return (
    <div>
      <div>
        <h4>文字資料</h4>
        <CommandButton name="init" value="初始化" typeIn={hl_cmdButton} />
        <CommandButton name="newline" value="換行" typeIn={hl_cmdButton} />
        <br />
        <br />
        {/* <CommandInput
          code="$"
          name="字符寬度 "
          unit="倍"
          min={1}
          max={8}
          getValue={s_cmdInput}
        />
        <br />
        <CommandInput
          code=""
          name="字符高度 "
          unit="倍"
          min={1}
          max={8}
          getValue={s_cmdInput}
        />
        <br />
        <CommandInput
          code="%"
          name="左間距 "
          unit=""
          min={1}
          max={30}
          getValue={s_cmdInput}
        />
        <br />
        <CommandInput
          code="("
          name="行間距 "
          unit=""
          min={1}
          max={255}
          getValue={s_cmdInput}
        />
        <br />
        <CommandInput
          code=")"
          name="字符間距 "
          unit=""
          min={1}
          max={255}
          getValue={s_cmdInput}
        />
        <br /> */}
        <CommandDropDown
          code="#"
          items={{ 對齊方式: "", 左: "0", 中: "1", 右: "2" }}
          getSelect={hl_cmdDropDown}
        />
        <CommandDropDown
          code="*"
          items={{ 字符旋轉: "", "0度": "0", "90度": "1" }}
          getSelect={hl_cmdDropDown}
        />
        <br />
        <br />
        <textarea rows={row} cols={col} value={text} onChange={hl_change} />
        <div>
          <button onClick={hl_onClick}>轉換</button>
          <button onClick={s_clearInput}>清除</button>
        </div>
      </div>
    </div>
  );
}
