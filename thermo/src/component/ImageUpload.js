import React, { useState } from "react";
import getPixels from "get-pixels";
import CommandImageDropDown from "./CommandImageDropdown";
import CommandImageButton from "./CommandImageButton";
import CommandImageInput from "./CommandImageInput";

export default function ImageUpload(props) {
  const [fileLoaded, setFileLoaded] = useState("");
  const [rawImage, setRawImage] = useState({
    shape: null,
    dataUrl: null,
    pixels: null
  });
  const [cmdLine, setCmdLine] = useState({
    init: "",
    align: "",
    indent: "",
    mode: "",
    bitmap: ""
  });
  const [cmdText, setCmdText] = useState("");

  let reader = new FileReader();

  const s_setCommand = (key, value) => {
    let temp = cmdLine;
    temp[key] = value;
    setCmdLine(temp);

    let newText = fn_cmdObjToString(temp);
    setCmdText(newText);
  };

  const s_clearAll = () => {
    setCmdLine({
      init: "",
      align: "",
      indent: "",
      mode: "",
      bitmap: ""
    });
    setRawImage({
      shape: null,
      dataUrl: null,
      pixels: null
    });
    setFileLoaded("");
    setCmdText("");
    reader.abort();
  };

  const hl_onChange_loadImgAsPixel = e => {
    setFileLoaded(e.target.value);
    e.preventDefault();
    if (e.target.files[0] !== undefined) {
      let file = e.target.files[0];
      reader.onload = () => {
        getPixels(reader.result, (err, pixels) => {
          if (err) {
            console.log("Bad image path");
            return;
          }
          const [width, height, channel] = pixels.shape.slice();
          let mode_width = Math.floor(width / 8);
          if (mode_width < 16) {
            mode_width = "0x0" + mode_width.toString(16);
          } else {
            mode_width = "0x" + mode_width.toString(16);
          }
          let mode_height = Math.floor(height / 8);
          if (mode_height < 16) {
            mode_height = "0x0" + mode_height.toString(16);
          } else {
            mode_height = "0x" + mode_height.toString(16);
          }
          let mode_code = "0x1d,0x2a," + mode_width + "," + mode_height + ",\n";
          s_setCommand("mode", mode_code);

          setRawImage({
            shape: { width: width, height: height, channel: channel },
            dataUrl: reader.result,
            pixels: pixels.data
          });
        });
      };
      reader.readAsDataURL(file);
    } else {
      s_clearAll();
    }
  };

  const hl_PixelsToData = dataURL => {
    if (dataURL !== null) {
      let monoData = [];
      let index = 0;
      const { width, height, channel } = rawImage.shape;
      rawImage.pixels.forEach(it => {
        if (index % channel === 0) {
          monoData.push(it);
        }
        index++;
      });
      let binaryArray = [];
      for (let i = 0; i < width; i++) {
        for (let j = 0; j < Math.ceil(height / 8); j++) {
          let binaryString = "";
          for (let k = 8 * j; k < 8 * (j + 1); k++) {
            let _it;
            if (monoData[width * k + i] === undefined) {
              _it = 0;
            } else {
              _it = monoData[width * k + i] > 0 ? 0 : 1;
            }
            binaryString += _it;
          }
          binaryArray.push("0x" + fn_binToHex(binaryString));
        }
      }
      if (cmdLine["bitmap"] !== "") {
        let encodedData =
          cmdText +
          binaryArray.toString() +
          ",\n0x0d,0x0a,\n" +
          cmdLine["bitmap"];

        props.setEncodedData(encodedData);
      } else {
        alert("請選擇<列印位圖>模式");
      }
    }
  };

  const fn_binToHex = b => {
    return b.match(/.{4}/g).reduce(function(acc, i) {
      return acc + parseInt(i, 2).toString(16);
    }, "");
  };

  const fn_cmdObjToString = cmdObj => {
    let cmdString = "";
    Object.entries(cmdObj).forEach(([key, value]) => {
      if (key !== "bitmap") {
        cmdString += value;
      }
    });
    return cmdString;
  };

  let debugText = "";
  let dict = {
    init: "初始化",
    align: "對齊",
    indent: "左間距",
    mode: "定義位圖模式",
    bitmap: "列印位圖"
  };

  Object.entries(cmdLine).forEach(([key, value]) => {
    if (dict.hasOwnProperty(key)) {
      debugText += dict[key] + ": " + value + " | ";
    }
  });

  return (
    <div>
      <div>
        <h4>圖片資料</h4>
        <code>限定bmp格式圖檔</code>
        <div>
          <input
            type="file"
            value={fileLoaded}
            accept="image/bmp"
            onChange={hl_onChange_loadImgAsPixel}
          />
          <br />

          {rawImage.dataUrl !== null && (
            <div>
              <br />
              <img src={rawImage.dataUrl} alt="data is loaded" />
              <br />
              <code>
                Width:{rawImage.shape.width} / Height:{rawImage.shape.height}
              </code>
              <CommandImageButton
                string={"初始化"}
                cmd={"init"}
                cmdCode={"0x1b,0x40,\n"}
                setCommand={s_setCommand}
              />
              <br />
              <CommandImageDropDown
                string={"對齊 "}
                cmd={"align"}
                cmdCode={"0x1b,0x61,"}
                items={{
                  請選擇: null,
                  左: "0x30",
                  中: "0x31",
                  右: "0x32"
                }}
                setCommand={s_setCommand}
              />
              <br />
              <CommandImageInput
                string={"左間距 "}
                cmd={"indent"}
                cmdCode={"0x1b,0x42,"}
                min={1}
                max={30}
                setCommand={s_setCommand}
              />
              <br />
              <CommandImageDropDown
                string={"列印位圖 "}
                cmd={"bitmap"}
                cmdCode={"0x1d,0x2f,"}
                items={{
                  請選擇: null,
                  普通: "0x30",
                  倍寬: "0x31",
                  倍高: "0x32",
                  雙倍: "0x33"
                }}
                setCommand={s_setCommand}
              />
              <br />
              <p>{debugText}</p>
            </div>
          )}
          <br />
          <button onClick={() => hl_PixelsToData(rawImage.pixels)}>轉換</button>
          <button onClick={() => s_clearAll()}>清除</button>
        </div>
      </div>
    </div>
  );
}
