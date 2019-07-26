import React, { useState } from "react";

//material ui
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const WordInput = () => {
  const [inputText, setInputText] = useState("");

  const s_onChange_inputText = e => {
    let _inputText = e.target.value;
    setInputText(_inputText);
  };

  return (
    <div>
      <TextField
        fullWidth
        multiline
        rows={8}
        label="文字訊息"
        placeholder="<請輸入文字>"
        margin="normal"
        variant="outlined"
        value={inputText}
        onChange={s_onChange_inputText}
      />
      <Button variant="outlined" color="secondary">
        送出
      </Button>
    </div>
  );
};

export default WordInput;
