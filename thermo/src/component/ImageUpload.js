import React, { useState } from "react";
import getPixels from "get-pixels";

export default function ImageUpload(props) {
  const [rawImage, setRawImage] = useState({
    shape: null,
    dataUrl: null,
    pixels: null
  });

  const hl_loadImgAsPixel = e => {
    e.preventDefault();
    let reader = new FileReader();
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
  };

  const hl_PixelsToData = dataURL => {
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
        binaryArray.push("0x" + binToHex(binaryString));
      }
    }
    props.getData(binaryArray.toString());
  };

  const binToHex = b => {
    return b.match(/.{4}/g).reduce(function(acc, i) {
      return acc + parseInt(i, 2).toString(16);
    }, "");
  };

  return (
    <div>
      <div>
        <h4>圖片資料</h4>
        <div>
          <input type="file" onChange={hl_loadImgAsPixel} />
          <br />

          {rawImage.dataUrl !== null && (
            <div>
              <br />
              <img src={rawImage.dataUrl} alt="data is loaded" />
              <br />
              <code>
                Width:{rawImage.shape.width} / Height:{rawImage.shape.height} /
                Channel:
                {rawImage.shape.channel}
              </code>
            </div>
          )}
          <br />
          <button onClick={() => hl_PixelsToData(rawImage.pixels)}>轉換</button>
        </div>
      </div>
    </div>
  );
}
