import React, { useState } from "react";
import MenuButton from "./MenuButton";

export default function MenuBar(props) {
  const [colors, setColors] = useState({
    word: true,
    image: false,
    qrdoce: false,
    dialog: false
  });

  ////pass to childern
  const s_select = it => {
    let tempColors = {
      word: false,
      image: false,
      qrcode: false,
      dialog: false
    };
    Object.assign(tempColors, { [it]: true });
    setColors(tempColors);
    props.selectItem(it);
  };
  return (
    <div>
      <MenuButton
        color={colors.word}
        name="word"
        value="文字"
        getItem={s_select}
      />
      <MenuButton
        color={colors.image}
        name="image"
        value="圖片"
        getItem={s_select}
      />
      <MenuButton
        color={colors.qrcode}
        name="qrcode"
        value="QR碼"
        getItem={s_select}
      />
      <MenuButton
        color={colors.dialog}
        name="dialog"
        value="及時"
        getItem={s_select}
      />
    </div>
  );
}
