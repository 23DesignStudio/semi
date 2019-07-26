import React, { useState } from "react";
import WordInput from "./WordInput";
import WordOptions from "./WordOptions";

const Word = () => {
  const cmdObj = {
    init: {
      name: "初始化",
      code: "0x1b,0x40,",
      items: ["是", "否"],
      value: ""
    },
    newLine: { name: "換行", code: "0x0d,0x0a," },
    align: {
      name: "對齊",
      code: "0x1b,0x61,",
      items: ["左", "中", "右"],
      value: ""
    },
    size: { name: "縮放", code: "0x1d,0x21,", value: "" },
    lineHeight: { name: "行高", code: "0x1b,0x33", range: [1, 255], value: "" }
  };
  const [cmdText, setCmdText] = useState(cmdObj);
  const [debugText, setDebugText] = useState("");

  const s_setCmdText = (prop, value) => {
    let _cmdText = cmdText;
    _cmdText[prop].value = value;
    setCmdText(_cmdText);
    // console.log(cmdText);
  };
  return (
    <div>
      <WordOptions commandObject={cmdObj} setCommandObject={s_setCmdText} />
      <WordInput />
    </div>
  );
};

export default Word;
