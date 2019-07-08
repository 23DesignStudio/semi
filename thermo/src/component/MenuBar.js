import React from "react";

export default function MenuBar(props) {
  const hl_click = e => {
    props.selectItem(e.target.name);
  };
  return (
    <div>
      <button type="button" name="word" onClick={hl_click}>
        文字
      </button>
      <button type="button" name="image" onClick={hl_click}>
        圖片
      </button>
      <button type="button" name="qrcode" onClick={hl_click}>
        QR碼
      </button>
    </div>
  );
}
