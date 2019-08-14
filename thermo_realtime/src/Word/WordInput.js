import React, { useState } from "react";

//material ui
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const WordInput = props => {
  const [inputText, setInputText] = useState("");
  const setText = props.setText;

  const hl_onChange_inputText = e => {
    let _inputText = e.target.value;
    setInputText(_inputText);
  };

  const hl_onClick_setText = () => {
    setText(inputText);
  };

  const hl_onClick_clearAll = text => {
    setInputText("");
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
        onChange={hl_onChange_inputText}
      />
      <Button
        size="small"
        variant="outlined"
        color="primary"
        onClick={hl_onClick_setText}
      >
        確定
      </Button>
      <Button
        size="small"
        variant="outlined"
        color="secondary"
        onClick={hl_onClick_clearAll}
      >
        清除
      </Button>
    </div>
  );
};

export default WordInput;
