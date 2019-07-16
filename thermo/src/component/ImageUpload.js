import React, { useState } from "react";
import getPixels from "get-pixels";
import CommandImageDropDown from "./CommandImageDropdown";

export default function ImageUpload(props) {
  const [fileLoaded, setFileLoaded] = useState("");
  const [rawImage, setRawImage] = useState({
    shape: null,
    dataUrl: null,
    pixels: null
  });
  const [cmbLine, setComdLine] = useState("");

  let reader = new FileReader();

  const s_setCommand = value => {
    setComdLine(value);
  };

  const s_clearAll = () => {
    setComdLine("");
    setRawImage({
      shape: null,
      dataUrl: null,
      pixels: null
    });
    setFileLoaded("");
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
      let encodedData = cmbLine + binaryArray.toString();
      props.setEncodedData(encodedData);
    }
  };

  const fn_binToHex = b => {
    return b.match(/.{4}/g).reduce(function(acc, i) {
      return acc + parseInt(i, 2).toString(16);
    }, "");
  };

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
              <CommandImageDropDown
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
