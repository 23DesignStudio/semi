import React, { useState } from "react";
import getPixels from "get-pixels";

export default function ImageUpload(props) {
  const [rawImage, setrawImage] = useState({ file: null, dataURL: null });

  const hl_loadImgAsDataURL = e => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onload = () => {
      setrawImage({
        file: file,
        dataURL: reader.result
      });
    };
    reader.readAsDataURL(file);
  };

  const hl_base64ToPixels = dataURL => {
    getPixels(dataURL, function(err, pixels) {
      if (err) {
        console.log("Bad image path");
      } else {
        let [width, height, channels] = pixels.shape.slice();
        let monoData = [];
        let index = 0;

        pixels.data.forEach(it => {
          if (index % channels === 0) {
            monoData.push(it);
          }
          index++;
        });
        let bigArray = [];
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
            bigArray.push("0x" + binToHex(binaryString));
          }
        }

        // console.log("width: ", width);
        // console.log("height: ", height);
        props.getData(bigArray.toString());
      }
    });
  };

  const binToHex = b => {
    return b.match(/.{4}/g).reduce(function(acc, i) {
      return acc + parseInt(i, 2).toString(16);
    }, "");
  };

  const fn = () => {
    hl_base64ToPixels(rawImage.dataURL);
  };
  return (
    <div>
      <div>
        <h4>圖片資料</h4>
        <div>
          <input type="file" onChange={hl_loadImgAsDataURL} />
          <br />

          {rawImage.dataURL !== null && (
            <div>
              <img src={rawImage.dataURL} alt="data is loaded" />
            </div>
          )}
          <br />
          <button onClick={fn}>轉換</button>
        </div>
      </div>
    </div>
  );
}
