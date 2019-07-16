import React, { useState } from "react";
import CommandDropDown from "./CommandDropDown";
import CommandButton from "./CommandButton";
import CommandInput from "./CommandInput";
import CommandDoubleInput from "./CommandDoubleInput";

export default function InputTextBox(props) {
  const { row, col, setEncodedData, convertToGb18030 } = props;
  const [text, setText] = useState("<初始化>");
  const [cmdObjects, setCmdObjects] = useState({
    init: {
      string: "初始化",
      unicode: "¿",
      cmdCode: "0x1b,0x40,",
      cmdString: "<初始化>",
      value: ""
    },
    newline: {
      string: "換行",
      unicode: "\n",
      cmdCode: "0x0d,0x0a,",
      cmdString: "<換行>",
      value: ""
    },
    align: {
      string: "對齊",
      unicode: "À",
      cmdCode: "0x1b,0x61,",
      cmdString: "",
      value: ""
    },
    rotate: {
      string: "旋轉",
      unicode: "Ñ",
      cmdCode: "0x1b,0x56,",
      cmdString: "",
      value: ""
    },
    scale: {
      string: "字符寬高",
      unicode: "Æ",
      cmdCode: "0x1d,0x21,",
      cmdString: "",
      value: ""
    },
    indent: {
      string: "左間距",
      unicode: "Ç",
      cmdCode: "0x1b,0x42,",
      cmdString: "",
      value: ""
    },
    lineheight: {
      string: "行間距",
      unicode: "Ê",
      cmdCode: "0x1b,0x33,",
      cmdString: "",
      value: ""
    },
    pitch: {
      string: "字符間距",
      unicode: "Î",
      cmdCode: "0x1b,0x20,",
      cmdString: "",
      value: ""
    }
  });

  // event handler
  const hl_onChange_inputBox = event => {
    setText(event.target.value);
  };
  const hl_onClick_clearInput = () => {
    setText("<初始化>");
  };

  // pass to childern
  const s_addCmdToText = value => {
    let temp = text;
    temp += value;
    setText(temp);
  };

  const s_updateCmdObjects = (key, value, cmdString) => {
    let temp = cmdObjects;
    temp[key].value = value;
    temp[key].cmdString = cmdString;
    setCmdObjects(temp);
  };

  // function
  const fn_convertTextToCode = text => {
    let tempCmdObj = cmdObjects;
    let tempUnicodeArray = Object.keys(tempCmdObj).map(it => {
      return tempCmdObj[it].unicode;
    });
    let tempCmdCodeArray = Object.keys(tempCmdObj).map(it => {
      return tempCmdObj[it].cmdCode;
    });
    // console.log(tempUnicodeArray);
    let tempCode = text;
    Object.keys(tempCmdObj).forEach(it => {
      let targetString = tempCmdObj[it].cmdString;
      if (targetString !== "") {
        let reg = new RegExp(targetString, "g");
        tempCode = tempCode.replace(
          reg,
          tempCmdObj[it].unicode + tempCmdObj[it].value
        );
      }
    });
    let encodedData = "";
    for (let i = 0; i < tempCode.length; i++) {
      if (tempUnicodeArray.includes(tempCode.charAt(i))) {
        let index = tempUnicodeArray.indexOf(tempCode.charAt(i));
        encodedData += tempCmdCodeArray[index];
      } else {
        encodedData +=
          "0x" +
          convertToGb18030(tempCode.charAt(i)) +
          (i === tempCode.length - 1 ? "" : ",");
      }
    }
    setEncodedData(encodedData);
  };

  return (
    <div>
      <div>
        <h4>指令列</h4>
        <CommandDropDown
          propkey={"align"}
          string={cmdObjects.align.string}
          items={{ 請選擇: null, 左: "0x0030", 中: "0x0031", 右: "0x0032" }}
          addCmdToText={s_addCmdToText}
          updateCmdObjects={s_updateCmdObjects}
        />
        <CommandDropDown
          propkey={"rotate"}
          string={cmdObjects.rotate.string}
          items={{ 請選擇: null, "0度": "0x0030", "90度": "0x0031" }}
          addCmdToText={s_addCmdToText}
          updateCmdObjects={s_updateCmdObjects}
        />
        <CommandInput
          propkey={"indent"}
          string={cmdObjects.indent.string}
          unit={"字符"}
          min={1}
          max={30}
          addCmdToText={s_addCmdToText}
          updateCmdObjects={s_updateCmdObjects}
        />
        <CommandInput
          propkey={"lineheight"}
          string={cmdObjects.lineheight.string}
          unit={"x 0.125mm"}
          min={1}
          max={255}
          addCmdToText={s_addCmdToText}
          updateCmdObjects={s_updateCmdObjects}
        />
        <CommandInput
          propkey={"pitch"}
          string={cmdObjects.pitch.string}
          unit={"x 0.125mm"}
          min={1}
          max={255}
          addCmdToText={s_addCmdToText}
          updateCmdObjects={s_updateCmdObjects}
        />
        <CommandDoubleInput
          propkey={"scale"}
          string={cmdObjects.scale.string}
          unit={"寬x高(倍數)"}
          min={1}
          max={8}
          addCmdToText={s_addCmdToText}
          updateCmdObjects={s_updateCmdObjects}
        />
        <CommandButton
          string={cmdObjects.init.string}
          addCmdToText={s_addCmdToText}
        />
        <br />
        <br />
        <h4>文字資料</h4>
        <textarea
          rows={row}
          cols={col}
          value={text}
          onChange={hl_onChange_inputBox}
        />
        <div>
          <button
            onClick={() => {
              fn_convertTextToCode(text);
            }}
          >
            轉換
          </button>
          <button onClick={hl_onClick_clearInput}>清除</button>
        </div>
      </div>
    </div>
  );
}
